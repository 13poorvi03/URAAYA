from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from backend.app.database import get_db
from backend.app.models.category import Category
from backend.app.models.product import Product
from backend.app.schemas.category import (
    CategoryCreate,
    CategoryResponse,
    CategoryUpdate
)
from backend.app.dependencies import get_current_admin

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.get("", response_model=List[CategoryResponse], summary="List all atelier categories")
def list_categories(db: Session = Depends(get_db)):
    """Retrieve all categories along with their respective product counts."""
    categories = db.query(Category).all()
    results = []
    for cat in categories:
        count = db.query(func.count(Product.id)).filter(Product.category_id == cat.id).scalar()
        results.append(CategoryResponse(id=cat.id, name=cat.name, product_count=count or 0))
    return results


@router.get("/{id}", response_model=CategoryResponse, summary="Retrieve a specific category")
def get_category(id: int, db: Session = Depends(get_db)):
    """Get category details by ID."""
    category = db.query(Category).filter(Category.id == id).first()
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found.")
    count = db.query(func.count(Product.id)).filter(Product.category_id == category.id).scalar()
    return CategoryResponse(id=category.id, name=category.name, product_count=count or 0)


@router.post("", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED, summary="Create a new category")
def create_category(
    category_in: CategoryCreate,
    db: Session = Depends(get_db)
):
    """Create a new product category (e.g. Women, Men, Kids, Bags & Accessories)."""
    existing = db.query(Category).filter(Category.name.ilike(category_in.name.strip())).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Category '{category_in.name}' already exists."
        )
    new_cat = Category(name=category_in.name.strip())
    db.add(new_cat)
    db.commit()
    db.refresh(new_cat)
    return CategoryResponse(id=new_cat.id, name=new_cat.name, product_count=0)


@router.put("/{id}", response_model=CategoryResponse, summary="Update category name")
def update_category(
    id: int,
    category_in: CategoryUpdate,
    db: Session = Depends(get_db)
):
    """Update an existing category."""
    category = db.query(Category).filter(Category.id == id).first()
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found.")
    
    category.name = category_in.name.strip()
    db.commit()
    db.refresh(category)
    count = db.query(func.count(Product.id)).filter(Product.category_id == category.id).scalar()
    return CategoryResponse(id=category.id, name=category.name, product_count=count or 0)


@router.delete("/{id}", summary="Delete category")
def delete_category(
    id: int,
    db: Session = Depends(get_db)
):
    """Delete a category and cascade to associated items."""
    category = db.query(Category).filter(Category.id == id).first()
    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found.")
    
    db.delete(category)
    db.commit()
    return {"status": "success", "message": f"Category '{category.name}' has been deleted."}

