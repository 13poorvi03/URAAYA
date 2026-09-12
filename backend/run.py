import uvicorn
import os
import sys

# Ensure project root is in sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

if __name__ == "__main__":
    print("✨ Starting URAAYA Haute Couture FastAPI Server on http://127.0.0.1:8000 ...")
    print("📖 Interactive Swagger Documentation: http://127.0.0.1:8000/docs")
    print("📖 Interactive ReDoc Documentation:   http://127.0.0.1:8000/redoc")
    uvicorn.run("backend.app.main:app", host="127.0.0.1", port=8000, reload=True)

