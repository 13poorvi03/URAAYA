from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.user import User
from backend.app.models.cart import CartItem
from backend.app.models.product import Product
from backend.app.models.order import Order, OrderItem
from backend.app.schemas.order import (
    CheckoutRequest,
    OrderResponse,
    OrderItemResponse,
    OrderStatusUpdate
)
from backend.app.dependencies import get_current_user

router = APIRouter(tags=["Orders & Checkout"])

def build_order_response(order: Order) -> OrderResponse:
    items_out = []
    for it in order.items:
        prod = it.product
        items_out.append(
            OrderItemResponse(
                id=it.id,
                product_id=it.product_id,
                product_name=prod.name if prod else f"Piece #{it.product_id}",
                quantity=it.quantity,
                price=it.price,
                subtotal=round(it.price * it.quantity, 2),
                image_url=prod.image_url if prod else None
            )
        )
    return OrderResponse(
        id=order.id,
        user_id=order.user_id,
        total_amount=order.total_amount,
        status=order.status,
        shipping_addr=order.shipping_addr,
        created_at=order.created_at,
        items=items_out
    )

@router.post("/checkout", response_model=OrderResponse, status_code=status.HTTP_201_CREATED, summary="Place order from user's shopping bag")
def checkout(
    checkout_data: CheckoutRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Checkout flow:
    1. Retrieve active items in user's cart.
    2. Validate inventory availability for each item.
    3. Decrement product stock levels.
    4. Create Order and OrderItem records.
    5. Empty user's shopping bag.
    """
    cart_items = db.query(CartItem).filter(CartItem.user_id == current_user.id).all()
    if not cart_items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Your shopping bag is empty. Please add atelier pieces before checking out."
        )

    # Validate stock and calculate total
    total_amount = 0.0
    for ci in cart_items:
        prod = ci.product
        if not prod:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Product ID {ci.product_id} no longer exists.")
        if prod.stock < ci.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Insufficient stock for '{prod.name}'. Only {prod.stock} left in inventory."
            )
        total_amount += round(prod.price * ci.quantity, 2)

    # Decrement stock and prepare order
    new_order = Order(
        user_id=current_user.id,
        total_amount=round(total_amount, 2),
        status="confirmed",
        shipping_addr=checkout_data.shipping_addr or "Primary Patron Residence"
    )
    db.add(new_order)
    db.flush()  # Generates new_order.id

    for ci in cart_items:
        # Decrement stock
        ci.product.stock -= ci.quantity
        
        # Create order item
        order_item = OrderItem(
            order_id=new_order.id,
            product_id=ci.product_id,
            quantity=ci.quantity,
            price=ci.product.price
        )
        db.add(order_item)
        
        # Delete from cart
        db.delete(ci)

    db.commit()
    db.refresh(new_order)

    return build_order_response(new_order)


@router.get("/orders", response_model=List[OrderResponse], summary="Retrieve order history")
def list_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve order history for the authenticated patron (or all orders if admin)."""
    if current_user.role == "admin":
        orders = db.query(Order).order_by(Order.created_at.desc()).all()
    else:
        orders = db.query(Order).filter(Order.user_id == current_user.id).order_by(Order.created_at.desc()).all()

    return [build_order_response(o) for o in orders]


@router.get("/orders/{id}", response_model=OrderResponse, summary="Track order details and status")
def get_order(
    id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Retrieve specific order details and live status tracking."""
    order = db.query(Order).filter(Order.id == id).first()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found.")

    # Authorization check: user can only view their own order unless admin
    if order.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied to this order.")

    return build_order_response(order)


@router.patch("/orders/{id}/status", response_model=OrderResponse, summary="Update order fulfillment status")
def update_order_status(
    id: int,
    status_update: OrderStatusUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update order status (e.g. confirmed, processing, dispatched, delivered, cancelled)."""
    order = db.query(Order).filter(Order.id == id).first()
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found.")

    valid_statuses = ["confirmed", "processing", "dispatched", "delivered", "cancelled"]
    st = status_update.status.lower().strip()
    if st not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status '{st}'. Must be one of: {', '.join(valid_statuses)}"
        )

    order.status = st
    db.commit()
    db.refresh(order)
    return build_order_response(order)

