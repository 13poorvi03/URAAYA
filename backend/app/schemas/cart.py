from typing import Optional
from pydantic import BaseModel, Field

class CartItemAdd(BaseModel):
    product_id: int = Field(..., description="ID of product to add to cart")
    quantity: int = Field(1, ge=1, description="Quantity to add")

class CartItemUpdate(BaseModel):
    quantity: int = Field(..., ge=1, description="New quantity for cart item")

class CartItemResponse(BaseModel):
    id: int
    product_id: int
    product_name: str
    price: float
    quantity: int
    subtotal: float
    image_url: Optional[str] = None
    stock_available: int

    class Config:
        from_attributes = True

class CartResponse(BaseModel):
    items: list[CartItemResponse]
    total_items: int
    total_amount: float

