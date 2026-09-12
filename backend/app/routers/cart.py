from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.user import User
from backend.app.models.cart import CartItem
from backend.app.models.product import Product
from backend.app.schemas.cart import (
    CartItemAdd,
    CartItemUpdate,
    CartItemResponse,
    CartResponse
)
from backend.app.dependencies import get_current_user

router = APIRouter(prefix="/cart", tags=["Shopping Cart"])

def build_cart_response(user_id: int, db: Session) -> CartResponse:
    cart_items = db.query(CartItem).filter(CartItem.user_id == user_id).all()
    items_out = []
    total_amount = 0.0
    total_items = 0

    for ci in cart_items:
        prod = ci.product
        subtotal = round(prod.price * ci.quantity, 2)
        total_amount += subtotal
        total_items += ci.quantity
        items_out.append(
            CartItemResponse(
                id=ci.id,
                product_id=ci.product_id,
                product_name=prod.name,
                price=prod.price,
                quantity=ci.quantity,
                subtotal=subtotal,
                image_url=prod.image_url,
                stock_available=prod.stock
            )
        )

    return CartResponse(
        items=items_out,
        total_items=total_items,
        total_amount=round(total_amount, 2)
    )

@router.get("", response_model=CartResponse, summary="View user shopping bag")
def view_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve the current user's bag contents, quantities, and calculated subtotal."""
    return build_cart_response(current_user.id, db)


@router.post("/add", response_model=CartResponse, summary="Add item to shopping bag")
def add_to_cart(
    item_in: CartItemAdd,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Add a product to the cart or increment quantity if already present. Validates available inventory."""
    product = db.query(Product).filter(Product.id == item_in.product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product piece not found."
        )

    if product.stock < item_in.quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Only {product.stock} pieces of '{product.name}' currently available in atelier inventory."
        )

    # Check if item is already in user's cart
    existing_item = db.query(CartItem).filter(
        CartItem.user_id == current_user.id,
        CartItem.product_id == item_in.product_id
    ).first()

    if existing_item:
        new_qty = existing_item.quantity + item_in.quantity
        if new_qty > product.stock:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Cannot add {item_in.quantity} more. Maximum available stock is {product.stock}."
            )
        existing_item.quantity = new_qty
    else:
        new_cart_item = CartItem(
            user_id=current_user.id,
            product_id=item_in.product_id,
            quantity=item_in.quantity
        )
        db.add(new_cart_item)

    db.commit()
    return build_cart_response(current_user.id, db)


@router.put("/update", response_model=CartResponse, summary="Update quantity of item in bag")
def update_cart_quantity(
    item_in: CartItemAdd,  # uses product_id and new quantity
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update the exact quantity of a product in the cart."""
    product = db.query(Product).filter(Product.id == item_in.product_id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")

    cart_item = db.query(CartItem).filter(
        CartItem.user_id == current_user.id,
        CartItem.product_id == item_in.product_id
    ).first()

    if not cart_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not in your cart.")

    if item_in.quantity <= 0:
        db.delete(cart_item)
    else:
        if item_in.quantity > product.stock:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Requested quantity ({item_in.quantity}) exceeds available stock ({product.stock})."
            )
        cart_item.quantity = item_in.quantity

    db.commit()
    return build_cart_response(current_user.id, db)


@router.post("/remove", response_model=CartResponse, summary="Remove item from bag via POST")
@router.delete("/remove/{product_id}", response_model=CartResponse, summary="Remove item from bag via DELETE")
def remove_from_cart(
    product_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Remove a product completely from the user's shopping bag."""
    cart_item = db.query(CartItem).filter(
        CartItem.user_id == current_user.id,
        CartItem.product_id == product_id
    ).first()

    if cart_item:
        db.delete(cart_item)
        db.commit()

    return build_cart_response(current_user.id, db)

