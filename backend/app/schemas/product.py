from typing import Optional
from pydantic import BaseModel, Field

class ProductCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    description: Optional[str] = None
    price: float = Field(..., gt=0, description="Price in USD")
    stock: int = Field(0, ge=0, description="Available inventory quantity")
    category_id: int = Field(..., description="Foreign key to Category")
    image_url: Optional[str] = None

class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=255)
    description: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    stock: Optional[int] = Field(None, ge=0)
    category_id: Optional[int] = None
    image_url: Optional[str] = None

class StockUpdate(BaseModel):
    stock: int = Field(..., ge=0, description="New inventory stock count")

class ProductResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    stock: int
    category_id: int
    image_url: Optional[str] = None
    category_name: Optional[str] = None

    class Config:
        from_attributes = True

