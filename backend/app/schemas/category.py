from typing import Optional
from pydantic import BaseModel, Field

class CategoryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Category name (e.g. Women, Men, Kids, Bags & Accessories)")

class CategoryUpdate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)

class CategoryResponse(BaseModel):
    id: int
    name: str
    product_count: Optional[int] = 0

    class Config:
        from_attributes = True

