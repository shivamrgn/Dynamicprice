import httpx
from datetime import datetime
from app.db.mongodb import db

async def fetch_competitor_prices():
    """
    Background worker that fetches competitor prices from a mock API
    and updates/inserts them into the MongoDB PriceLogs collection.
    """
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get("https://dummyjson.com/products")
            if response.status_code == 200:
                data = response.json()
                products = data.get("products", [])
                
                for p in products[:10]:
                    product_id = f"SKU-{p['id'] * 100}"
                    new_price = float(p.get("price", 0.0))
                    
                    await db.PriceLogs.insert_one({
                        "product_id": product_id,
                        "old_price": round(new_price * 1.05, 2),
                        "new_price": new_price,
                        "reason": "Automated competitor price sync",
                        "timestamp": datetime.utcnow()
                    })
                    
                print(f"[{datetime.utcnow()}] Successfully fetched and synced {len(products[:10])} competitor prices.")
        except Exception as e:
            print(f"[{datetime.utcnow()}] Error fetching competitor prices: {e}")
