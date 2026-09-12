# URAAYA
URAAYA – Luxury Fashion Store is a full‑stack project featuring user accounts, product catalog, cart, checkout, and order tracking. Built while vibe coding, it reflects creativity, smooth database handling, and a complete modern e‑commerce website

---

# URAAYA – Luxury Fashion Store  

##  Overview  
URAAYA is a full‑stack luxury fashion e‑commerce project built while vibe coding. It provides a modern online shopping experience with secure user accounts, product catalog, cart, checkout, and order tracking. The backend connects seamlessly with a database for smooth data handling, while the frontend consumes APIs for a dynamic interface.  

##  Features  
-  User Authentication (signup, login, logout, profile)  
-  Product Catalog (CRUD for products & categories)  
-  Shopping Cart (add/remove/view items)  
-  Checkout & Order Management (place orders, track status, view history)  
-  Database Connectivity (users, products, categories, orders, order items)  
-  Auto‑generated API Docs for easy testing  

##  Project Structure  
```
/frontend   → React + Tailwind UI  
/backend    → FastAPI server, routers, models, database  
README.md   → Project documentation  
```

##  Setup Instructions  
### Backend  
1. Clone the repo:  
   ```bash
   git clone https://github.com/13poorvi03/uraaya-ecommerce.git
   cd uraaya-ecommerce/backend
   ```
2. Create virtual environment & install dependencies:  
   ```bash
   python -m venv venv
   source venv/bin/activate   # Mac/Linux
   venv\Scripts\activate      # Windows
   pip install -r requirements.txt
   ```
3. Run the server:  
   ```bash
   uvicorn main:app --reload
   ```
4. Open API docs: `http://localhost:8000/docs` [(localhost in Bing)](https://www.bing.com/search?q="http%3A%2F%2Flocalhost%3A8000%2Fdocs")  

### Frontend  
1. Navigate to frontend folder:  
   ```bash
   cd ../frontend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Run development server:  
   ```bash
   npm start
   ```

## Database Schema  
- **Users** → id, name, email, password_hash, role  
- **Products** → id, name, description, price, stock, category_id  
- **Categories** → id, name  
- **Orders** → id, user_id, total_amount, status, created_at  
- **OrderItems** → id, order_id, product_id, quantity, price  

##  Contribution  
This project was scaffolded with automation tools but customized with my own models, routers, and logic. Built while vibe coding, it reflects creativity, style, and a complete e‑commerce journey.  
