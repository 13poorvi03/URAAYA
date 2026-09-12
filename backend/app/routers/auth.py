from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.models.user import User
from backend.app.models.token_blacklist import TokenBlacklist
from backend.app.schemas.user import (
    UserCreate,
    UserLogin,
    UserResponse,
    UserUpdate,
    TokenResponse
)
from backend.app.services.auth import (
    hash_password,
    verify_password,
    create_access_token
)
from backend.app.dependencies import get_current_user, oauth2_scheme

router = APIRouter(prefix="/auth", tags=["Authentication & Profile"])

@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED, summary="Register a new patron account")
def signup(user_in: UserCreate, db: Session = Depends(get_db)):
    """Create a new URAAYA member account with secure bcrypt password hashing."""
    # Check if email is already registered
    existing_user = db.query(User).filter(User.email == user_in.email.lower()).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An atelier account with this email address already exists."
        )

    # Hash password
    hashed_pwd = hash_password(user_in.password)

    # Create and persist user
    new_user = User(
        name=user_in.name,
        email=user_in.email.lower(),
        password_hash=hashed_pwd,
        role=user_in.role or "customer"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.post("/login", response_model=TokenResponse, summary="Authenticate and acquire JWT access token")
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """Authenticate patron credentials and return a signed JWT bearer token."""
    user = db.query(User).filter(User.email == credentials.email.lower()).first()
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email credentials or password.",
            headers={"WWW-Authenticate": "Bearer"}
        )

    # Generate JWT
    token_data = {
        "sub": str(user.id),
        "email": user.email,
        "role": user.role,
        "name": user.name
    }
    access_token = create_access_token(data=token_data)

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )


@router.post("/logout", summary="Invalidate current session token")
def logout(
    token: str = Depends(oauth2_scheme),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Server-side token invalidation by registering token into the revocation blacklist."""
    if token:
        # Check if already blacklisted
        existing = db.query(TokenBlacklist).filter(TokenBlacklist.token == token).first()
        if not existing:
            blacklist_entry = TokenBlacklist(token=token)
            db.add(blacklist_entry)
            db.commit()

    return {
        "status": "success",
        "message": "You have been securely signed out. The atelier access token has been revoked."
    }


@router.get("/profile", response_model=UserResponse, summary="Retrieve authenticated patron profile")
def get_profile(current_user: User = Depends(get_current_user)):
    """View details of the currently authenticated patron."""
    return current_user


@router.put("/profile", response_model=UserResponse, summary="Update patron profile details")
def update_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update profile information (name, email, or password)."""
    if user_update.name:
        current_user.name = user_update.name

    if user_update.email:
        # Check if another user has this email
        email_taken = db.query(User).filter(
            User.email == user_update.email.lower(),
            User.id != current_user.id
        ).first()
        if email_taken:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="This email address is already associated with another patron account."
            )
        current_user.email = user_update.email.lower()

    if user_update.password:
        current_user.password_hash = hash_password(user_update.password)

    db.commit()
    db.refresh(current_user)
    return current_user

