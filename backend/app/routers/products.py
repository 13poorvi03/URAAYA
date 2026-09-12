from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_

from backend.app.database import get_db
from backend.app.models.product import Product
from backend.app.models.category import Category
from backend.app.schemas.product import (
    ProductCreate,
    ProductResponse,
    ProductUpdate,
    StockUpdate
)

router = APIRouter(prefix="/products", tags=["Products & Inventory"])

def build_product_response(product: Product) -> ProductResponse:
    return ProductResponse(
        id=product.id,
        name=product.name,
        description=product.description,
        price=product.price,
        stock=product.stock,
        category_id=product.category_id,
        image_url=product.image_url,
        category_name=product.category.name if product.category else None
    )

@router.get("", response_model=List[ProductResponse], summary="List and filter catalog pieces")
def list_products(
    category_id: Optional[int] = Query(None, description="Filter by Category ID"),
    search: Optional[str] = Query(None, description="Search term across name and description"),
    min_price: Optional[float] = Query(None, ge=0, description="Minimum price"),
    max_price: Optional[float] = Query(None, ge=0, description="Maximum price"),
    in_stock_only: bool = Query(False, description="Filter to only items with stock > 0"),
    skip: int = Query(0, ge=0, description="Pagination skip offset"),
    limit: int = Query(50, ge=1, le=100, description="Number of pieces to return"),
    db: Session = Depends(get_db)
):
    """Retrieve catalog products with comprehensive filtering, search, and pagination."""
    query = db.query(Product)

    if category_id is not None:
        query = query.filter(Product.category_id == category_id)

    if search:
        s = f"%{search.strip()}%"
        query = query.filter(or_(Product.name.ilike(s), Product.description.ilike(s)))

    if min_price is not None:
        query = query.filter(Product.price >= min_price)

    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    if in_stock_only:
        query = query.filter(Product.stock > 0)

    products = query.offset(skip).limit(limit).all()
    return [build_product_response(p) for p in products]


@router.get("/{id}", response_model=ProductResponse, summary="Retrieve a single product by ID")
def get_product(id: int, db: Session = Depends(get_db)):
    """Fetch complete product information including category association."""
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product piece not found in atelier catalog."
        )
    return build_product_response(product)


@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED, summary="Create a new catalog piece")
def create_product(
    product_in: ProductCreate,
    db: Session = Depends(get_db)
):
    """Add a new garment or accessory to the catalog."""
    # Verify category exists
    category = db.query(Category).filter(Category.id == product_in.category_id).first()
    if not category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Category with ID {product_in.category_id} does not exist."
        )

    new_product = Product(
        name=product_in.name,
        description=product_in.description,
        price=product_in.price,
        stock=product_in.stock,
        category_id=product_in.category_id,
        image_url=product_in.image_url
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return build_product_response(new_product)


@router.put("/{id}", response_model=ProductResponse, summary="Update product details")
def update_product(
    id: int,
    product_in: ProductUpdate,
    db: Session = Depends(get_db)
):
    """Update attributes of an existing product."""
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")

    if product_in.category_id is not None:
        cat = db.query(Category).filter(Category.id == product_in.category_id).first()
        if not cat:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Category not found.")
        product.category_id = product_in.category_id

    if product_in.name is not None:
        product.name = product_in.name
    if product_in.description is not None:
        product.description = product_in.description
    if product_in.price is not None:
        product.price = product_in.price
    if product_in.stock is not None:
        product.stock = product_in.stock
    if product_in.image_url is not None:
        product.image_url = product_in.image_url

    db.commit()
    db.refresh(product)
    return build_product_response(product)


@router.delete("/{id}", summary="Delete product from catalog")
def delete_product(id: int, db: Session = Depends(get_db)):
    """Delete a product from the database."""
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")

    db.delete(product)
    db.commit()
    return {"status": "success", "message": f"Product '{product.name}' (ID {id}) has been removed."}


@router.patch("/{id}/stock", response_model=ProductResponse, summary="Direct inventory management")
def update_inventory_stock(
    id: int,
    stock_in: StockUpdate,
    db: Session = Depends(get_db)
):
    """Directly adjust the inventory stock level for a product."""
    product = db.query(Product).filter(Product.id == id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found.")

    product.stock = stock_in.stock
    db.commit()
    db.refresh(product)
    return build_product_response(product)

