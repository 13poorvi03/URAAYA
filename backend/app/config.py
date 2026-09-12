import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "URAAYA Haute Couture & Luxury Fashion API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Database configuration
    # Supports PostgreSQL (e.g. postgresql+psycopg2://postgres:postgres@localhost:5432/uraaya_db)
    # Defaults to local SQLite for seamless zero-setup testing
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./uraaya.db"
    )
    
    # JWT security settings
    SECRET_KEY: str = os.getenv(
        "SECRET_KEY",
        "uraaya-haute-couture-secret-key-atelier-2026-luxury-jwt-signature-token-vault"
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440  # 24 hours
    
    # CORS origins
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
        "http://localhost:3000",
        "*"
    ]

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()

