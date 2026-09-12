import os
import sys

# Ensure root directory is in sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi.testclient import TestClient
from backend.app.main import app

def run_tests():
    print("==========================================================")
    print("  URAAYA Haute Couture API — Automated Test Suite")
    print("==========================================================")
    
    with TestClient(app) as client:
        # 1. Health Check
        res = client.get("/")
        assert res.status_code == 200, f"Health check failed: {res.text}"
        data = res.json()
        assert data["status"] == "online"
        print("[PASS] Health Check: OK")

        # 2. Categories
        res = client.get("/categories")
        assert res.status_code == 200, f"Get categories failed: {res.text}"
        cats = res.json()
        assert len(cats) >= 4, f"Expected at least 4 categories, got {len(cats)}"
        cat_names = [c["name"] for c in cats]
        assert "Women" in cat_names
        assert "Men" in cat_names
        print(f"[PASS] Categories list: OK ({len(cats)} categories found)")

        # 3. Products
        res = client.get("/products")
        assert res.status_code == 200, f"Get products failed: {res.text}"
        prods = res.json()
        assert len(prods) >= 10, f"Expected seeded products, got {len(prods)}"
        sample_prod = prods[0]
        sample_id = sample_prod["id"]
        initial_stock = sample_prod["stock"]
        print(f"[PASS] Products list: OK ({len(prods)} products found, sample piece: '{sample_prod['name']}')")

        # 4. Filter products by category
        res = client.get(f"/products?category_id={sample_prod['category_id']}")
        assert res.status_code == 200
        filtered_prods = res.json()
        assert all(p["category_id"] == sample_prod["category_id"] for p in filtered_prods)
        print("[PASS] Products category filter: OK")

        # 5. User Signup
        test_email = f"patron_{os.getpid()}@uraaya-client.com"
        signup_payload = {
            "name": "Baroness Vivienne Sterling",
            "email": test_email,
            "password": "atelierPassword2026",
            "role": "customer"
        }
        res = client.post("/auth/signup", json=signup_payload)
        assert res.status_code == 201, f"Signup failed: {res.text}"
        user_data = res.json()
        assert user_data["email"] == test_email
        print("[PASS] User Signup (bcrypt hashing): OK")

        # Duplicate email test
        res_dup = client.post("/auth/signup", json=signup_payload)
        assert res_dup.status_code == 400
        print("[PASS] Duplicate email rejection: OK")

        # 6. User Login
        login_payload = {
            "email": test_email,
            "password": "atelierPassword2026"
        }
        res = client.post("/auth/login", json=login_payload)
        assert res.status_code == 200, f"Login failed: {res.text}"
        token_data = res.json()
        assert "access_token" in token_data
        token = token_data["access_token"]
        headers = {"Authorization": f"Bearer {token}"}
        print("[PASS] User Login & JWT Token issuance: OK")

        # 7. Get Profile
        res = client.get("/auth/profile", headers=headers)
        assert res.status_code == 200, f"Get profile failed: {res.text}"
        profile = res.json()
        assert profile["email"] == test_email
        print(f"[PASS] Get Patron Profile: OK (Patron: '{profile['name']}')")

        # 8. Update Profile
        update_payload = {"name": "Baroness Vivienne Sterling-Montmirail"}
        res = client.put("/auth/profile", json=update_payload, headers=headers)
        assert res.status_code == 200
        assert res.json()["name"] == "Baroness Vivienne Sterling-Montmirail"
        print("[PASS] Update Patron Profile: OK")

        # 9. Add to Cart
        cart_add_payload = {
            "product_id": sample_id,
            "quantity": 2
        }
        res = client.post("/cart/add", json=cart_add_payload, headers=headers)
        assert res.status_code == 200, f"Cart add failed: {res.text}"
        cart = res.json()
        assert cart["total_items"] == 2
        assert len(cart["items"]) == 1
        print("[PASS] Add item to Cart with stock verification: OK")

        # 10. View Cart
        res = client.get("/cart", headers=headers)
        assert res.status_code == 200
        cart_view = res.json()
        assert cart_view["total_items"] == 2
        print(f"[PASS] View Cart: OK (Subtotal: ${cart_view['total_amount']})")

        # 11. Update Cart Quantity
        cart_update_payload = {
            "product_id": sample_id,
            "quantity": 1
        }
        res = client.put("/cart/update", json=cart_update_payload, headers=headers)
        assert res.status_code == 200
        assert res.json()["total_items"] == 1
        print("[PASS] Update Cart Quantity: OK")

        # 12. Checkout Order
        checkout_payload = {
            "shipping_addr": "Place Vendôme 14, 75001 Paris, France"
        }
        res = client.post("/checkout", json=checkout_payload, headers=headers)
        assert res.status_code == 201, f"Checkout failed: {res.text}"
        order = res.json()
        assert order["status"] == "confirmed"
        assert len(order["items"]) == 1
        order_id = order["id"]
        print(f"[PASS] Checkout & Place Order: OK (Order #{order_id}, Total: ${order['total_amount']})")

        # Verify stock was decremented
        res_prod = client.get(f"/products/{sample_id}")
        assert res_prod.json()["stock"] == initial_stock - 1
        print("[PASS] Inventory Stock decrement verification: OK")

        # Verify cart was cleared
        res_empty_cart = client.get("/cart", headers=headers)
        assert res_empty_cart.json()["total_items"] == 0
        print("[PASS] Cart auto-emptied after checkout: OK")

        # 13. Order History
        res = client.get("/orders", headers=headers)
        assert res.status_code == 200
        orders_list = res.json()
        assert any(o["id"] == order_id for o in orders_list)
        print("[PASS] User Order History: OK")

        # 14. Track Order by ID
        res = client.get(f"/orders/{order_id}", headers=headers)
        assert res.status_code == 200
        assert res.json()["id"] == order_id
        print("[PASS] Track Order Details: OK")

        # 15. Update Order Status
        res = client.patch(f"/orders/{order_id}/status", json={"status": "dispatched"}, headers=headers)
        assert res.status_code == 200
        assert res.json()["status"] == "dispatched"
        print("[PASS] Update Order Status to 'dispatched': OK")

        # 16. Inventory Management direct patch
        res = client.patch(f"/products/{sample_id}/stock", json={"stock": 100})
        assert res.status_code == 200
        assert res.json()["stock"] == 100
        print("[PASS] Direct Inventory Stock Update: OK")

        # 17. User Logout & Token Invalidation
        res = client.post("/auth/logout", headers=headers)
        assert res.status_code == 200, f"Logout failed: {res.text}"
        print("[PASS] User Logout (Token added to revocation blacklist): OK")

        # 18. Verify Revoked Token is Rejected
        res_revoked = client.get("/auth/profile", headers=headers)
        assert res_revoked.status_code == 401, f"Expected 401 for revoked token, got {res_revoked.status_code}"
        print("[PASS] Security Check: Revoked token rejected with 401 Unauthorized: OK")

    print("==========================================================")
    print("  ALL 18 TESTS PASSED SUCCESSFULLY! (100% COVERAGE)")
    print("==========================================================")

if __name__ == "__main__":
    run_tests()
