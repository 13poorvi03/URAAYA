from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class CheckoutRequest(BaseModel):
    shipping_addr: Optional[str] = Field(None, description="Delivery residence address & notes")

class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    product_name: str
    quantity: int
    price: float
    subtotal: float
    image_url: Optional[str] = None

    class Config:
        from_attributes = True

class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: str
    shipping_addr: Optional[str] = None
    created_at: Optional[datetime] = None
    items: list[OrderItemResponse] = []

    class Config:
        from_attributes = True

class OrderStatusUpdate(BaseModel):
    status: str = Field(..., description="Status: confirmed, processing, dispatched, delivered, cancelled")

