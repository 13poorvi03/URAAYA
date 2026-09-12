from sqlalchemy.orm import Session
from backend.app.models.category import Category
from backend.app.models.product import Product
from backend.app.models.user import User
from backend.app.services.auth import hash_password

INITIAL_CATEGORIES = [
    {"name": "Women"},
    {"name": "Men"},
    {"name": "Kids"},
    {"name": "Bags & Accessories"}
]

INITIAL_PRODUCTS = [
    # WOMEN
    {
        "name": "Atelier Double-Breasted Cashmere Coat",
        "category_name": "Women",
        "price": 890.00,
        "stock": 25,
        "description": "Crafted from double-faced Grade-A Mongolian cashmere with hand-finished horn buttons. Features an architectural relaxed silhouette and peaked lapels.",
        "image_url": "https://images.unsplash.com/photo-1539533018447-63fcce667823?auto=format&fit=crop&w=1200&q=85"
    },
    {
        "name": "Sculptural Bias-Cut Silk Evening Gown",
        "category_name": "Women",
        "price": 720.00,
        "stock": 18,
        "description": "An ethereal evening gown cut on the bias in heavy Mulberry silk charmeuse with a low back and cowl neckline.",
        "image_url": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85"
    },
    {
        "name": "Oversized Sculpted Wool Blazer",
        "category_name": "Women",
        "price": 540.00,
        "stock": 30,
        "description": "Strong shoulders meet fluid feminine tailoring. Cut from dry-handle virgin wool with mother-of-pearl buttons.",
        "image_url": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85"
    },
    {
        "name": "Ribbed Cashmere Turtleneck Sweater",
        "category_name": "Women",
        "price": 380.00,
        "stock": 40,
        "description": "Sumptuously soft 7-gauge knit engineered with clean fisherman ribbing and folded funnel collar.",
        "image_url": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=85"
    },
    # MEN
    {
        "name": "Bespoke Double-Breasted Flannel Suit",
        "category_name": "Men",
        "price": 1250.00,
        "stock": 15,
        "description": "Neapolitan soft canvassing with peaked lapels, tailored from English Super 150s wool flannel.",
        "image_url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85"
    },
    {
        "name": "Cashmere & Wool Raglan Overcoat",
        "category_name": "Men",
        "price": 980.00,
        "stock": 20,
        "description": "An expansive raglan sleeve overcoat cut from double-face wool and cashmere with concealed horn button placket.",
        "image_url": "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1200&q=85"
    },
    {
        "name": "Fine Gauge Sea Island Cotton Polo",
        "category_name": "Men",
        "price": 260.00,
        "stock": 50,
        "description": "Spun from legendary West Indian Sea Island cotton with silk-like luster and Australian mother-of-pearl buttons.",
        "image_url": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85"
    },
    # KIDS
    {
        "name": "Petit Double-Breasted Wool Peacoat",
        "category_name": "Kids",
        "price": 280.00,
        "stock": 35,
        "description": "Miniature tailoring crafted from non-scratch hypoallergenic virgin wool with soft brushed organic cotton lining.",
        "image_url": "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=85"
    },
    {
        "name": "Cable-Knit Cashmere Cardigan",
        "category_name": "Kids",
        "price": 195.00,
        "stock": 40,
        "description": "Traditional cable patterns spun in cloud-soft cashmere with natural olive wood button closures.",
        "image_url": "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&w=1200&q=85"
    },
    # ACCESSORIES
    {
        "name": "The Monolith Sculptural Leather Tote",
        "category_name": "Bags & Accessories",
        "price": 920.00,
        "stock": 22,
        "description": "Architectural statement molded from Tuscan vegetable-tanned calfskin with 24k brushed gold-plated hardware.",
        "image_url": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85"
    },
    {
        "name": "Molten Gold Sculpted Choker & Earrings Set",
        "category_name": "Bags & Accessories",
        "price": 450.00,
        "stock": 30,
        "description": "Molten organic forms plated in thick 2.5-micron 24k gold vermeil over recycled 925 sterling silver.",
        "image_url": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85"
    },
    {
        "name": "Handcrafted Italian Leather Chelsea Boots",
        "category_name": "Bags & Accessories",
        "price": 680.00,
        "stock": 28,
        "description": "Blake-stitched construction in supple French calf leather with calfskin lining and stacked leather heel.",
        "image_url": "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1200&q=85"
    }
]

def seed_database(db: Session):
    """Seed default categories, products, and default accounts if database is empty."""
    # 1. Seed Categories
    category_map = {}
    for c_data in INITIAL_CATEGORIES:
        cat = db.query(Category).filter(Category.name == c_data["name"]).first()
        if not cat:
            cat = Category(name=c_data["name"])
            db.add(cat)
            db.flush()
        category_map[cat.name] = cat.id

    # 2. Seed Products
    if db.query(Product).count() == 0:
        for p_data in INITIAL_PRODUCTS:
            cat_id = category_map.get(p_data["category_name"])
            if cat_id:
                product = Product(
                    name=p_data["name"],
                    description=p_data["description"],
                    price=p_data["price"],
                    stock=p_data["stock"],
                    category_id=cat_id,
                    image_url=p_data["image_url"]
                )
                db.add(product)

    # 3. Seed Default Patron & Admin
    if db.query(User).count() == 0:
        # VIP Patron
        patron = User(
            name="Elena de Montmirail",
            email="elena@haute-uraaya.com",
            password_hash=hash_password("password123"),
            role="customer"
        )
        db.add(patron)

        # Admin
        admin = User(
            name="URAAYA Atelier Master",
            email="admin@uraaya.com",
            password_hash=hash_password("admin123"),
            role="admin"
        )
        db.add(admin)

    db.commit()

