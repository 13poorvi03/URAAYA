from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime
from backend.app.database import Base

class TokenBlacklist(Base):
    __tablename__ = "token_blacklist"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    token = Column(String(500), unique=True, index=True, nullable=False)
    blacklisted_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

