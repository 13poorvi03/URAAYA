from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.config import settings
from backend.app.database import engine, Base, SessionLocal
from backend.app.services.seed import seed_database

# Import routers
from backend.app.routers.auth import router as auth_router
from backend.app.routers.categories import router as categories_router
from backend.app.routers.products import router as products_router
from backend.app.routers.cart import router as cart_router
from backend.app.routers.orders import router as orders_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Initialize database schema
    Base.metadata.create_all(bind=engine)
    
    # 2. Seed initial luxury products and categories
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    
    yield

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="""
# URAAYA Haute Couture & Luxury Fashion API
RESTful Backend API powering the URAAYA Luxury Fashion E-Commerce Platform.

## Features
- **JWT Authentication & Security**: Signup with bcrypt password hashing, login with signed JWT, token revocation on logout, and profile management.
- **Product & Category Management**: Full CRUD operations with category filtering, inventory management, and stock updates.
- **Shopping Bag Operations**: Add, update, and remove items with real-time stock verification and subtotal calculation.
- **Checkout & Orders**: Place orders with atomic stock decrements, order tracking, and patron order history.
- **Database Connectivity**: SQLAlchemy ORM with PostgreSQL support and local SQLite fallback.
    """,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(auth_router)
app.include_router(categories_router)
app.include_router(products_router)
app.include_router(cart_router)
app.include_router(orders_router)

@app.get("/", tags=["Health & Status"], summary="Atelier API Health Check")
def health_check():
    """Verify backend API health and retrieve documentation entrypoints."""
    return {
        "status": "online",
        "brand": "URAAYA Atelier",
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "redoc": "/redoc"
    }

