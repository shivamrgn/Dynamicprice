import random
from fastapi import APIRouter

router = APIRouter()

PRODUCT_NAMES = [
    "Wireless Noise-Cancelling Headphones",
    "Mechanical Keyboard Pro",
    "Ergonomic Office Chair",
    "USB-C Hub Multiport",
    "4K Ultrawide Monitor",
    "Smart Standing Desk",
    "Premium Webcam 1080p",
    "Active Noise-Cancelling Earbuds",
]

@router.get("/revenue")
async def get_revenue_data():
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    data = []
    for day in days:
        rev = random.randint(10000, 25000)
        data.append({
            "day": day,
            "revenue": rev,
            "profit": int(rev * random.uniform(0.25, 0.42)),
        })
    return {"data": data}


@router.get("/top-products")
async def get_top_products():
    products = []
    for i, name in enumerate(PRODUCT_NAMES[:5]):
        rev_k = random.randint(8, 32)
        margin = random.randint(12, 48)
        uplift = round(random.uniform(-5, 25), 1)
        products.append({
            "id": f"SKU-{random.randint(100, 999)}",
            "name": name,
            "rev": f"${rev_k}k",
            "margin": f"{margin}%",
            "uplift": f"{'+' if uplift >= 0 else ''}{uplift}%",
            "trend": "up" if uplift >= 0 else "down",
        })
    return {"data": products}
