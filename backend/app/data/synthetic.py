"""
Synthetic data generator for the Dynamic Pricing Engine.
Generates realistic e-commerce product, sales, and pricing data.
"""

import random
import math
from datetime import datetime, timedelta


CATEGORIES = [
    "Electronics", "Audio", "Computing", "Peripherals",
    "Furniture", "Wearables", "Gaming", "Home Office"
]

PRODUCT_CATALOG = [
    {"name": "Wireless Noise-Cancelling Headphones", "category": "Audio", "base_cost": 65, "base_price": 129.99},
    {"name": "Mechanical Keyboard Pro", "category": "Peripherals", "base_cost": 48, "base_price": 99.99},
    {"name": "Ergonomic Office Chair", "category": "Furniture", "base_cost": 180, "base_price": 349.99},
    {"name": "USB-C Hub Multiport Adapter", "category": "Computing", "base_cost": 12, "base_price": 39.99},
    {"name": "4K Ultrawide Monitor 34\"", "category": "Electronics", "base_cost": 280, "base_price": 599.99},
    {"name": "Smart Standing Desk", "category": "Furniture", "base_cost": 220, "base_price": 449.99},
    {"name": "Premium 1080p Webcam", "category": "Computing", "base_cost": 22, "base_price": 79.99},
    {"name": "Active Noise-Cancelling Earbuds", "category": "Audio", "base_cost": 35, "base_price": 89.99},
    {"name": "Gaming Mouse RGB 16000 DPI", "category": "Gaming", "base_cost": 18, "base_price": 59.99},
    {"name": "Fitness Tracker Band Pro", "category": "Wearables", "base_cost": 15, "base_price": 49.99},
    {"name": "Portable Bluetooth Speaker", "category": "Audio", "base_cost": 25, "base_price": 69.99},
    {"name": "Laptop Cooling Pad", "category": "Computing", "base_cost": 10, "base_price": 34.99},
]


def generate_product_catalog():
    """Return the full product catalog with generated SKU IDs."""
    products = []
    for i, p in enumerate(PRODUCT_CATALOG):
        products.append({
            "id": f"SKU-{100 + i * 11}",
            "name": p["name"],
            "category": p["category"],
            "base_cost": p["base_cost"],
            "base_price": p["base_price"],
            "current_price": round(p["base_price"] * random.uniform(0.85, 1.15), 2),
            "inventory": random.randint(20, 500),
            "avg_daily_sales": random.randint(5, 80),
        })
    return products


def generate_sales_history(product_id: str, days: int = 90):
    """Generate synthetic daily sales history for a product."""
    idx = hash(product_id) % len(PRODUCT_CATALOG)
    prod = PRODUCT_CATALOG[idx]
    base_demand = random.randint(20, 100)
    history = []
    today = datetime.now()

    for d in range(days, 0, -1):
        date = today - timedelta(days=d)
        # Simulate seasonality (weekly) + trend + noise
        weekday_effect = 1.0 + 0.15 * math.sin(2 * math.pi * date.weekday() / 7)
        trend = 1.0 + 0.001 * (days - d)  # Slight upward trend
        noise = random.uniform(0.8, 1.2)
        demand = int(base_demand * weekday_effect * trend * noise)

        # Price fluctuates slightly
        price = round(prod["base_price"] * random.uniform(0.9, 1.1), 2)
        revenue = round(demand * price, 2)
        cost = round(demand * prod["base_cost"], 2)

        history.append({
            "date": date.strftime("%Y-%m-%d"),
            "demand": max(1, demand),
            "price": price,
            "revenue": revenue,
            "cost": cost,
            "profit": round(revenue - cost, 2),
            "inventory_level": random.randint(50, 400),
        })
    return history


def generate_competitor_prices(product_id: str, num_competitors: int = 4):
    """Generate competitor pricing data for a product."""
    idx = hash(product_id) % len(PRODUCT_CATALOG)
    base = PRODUCT_CATALOG[idx]["base_price"]
    competitors = []
    names = ["CompetitorA", "CompetitorB", "CompetitorC", "CompetitorD", "CompetitorE"]
    for i in range(min(num_competitors, len(names))):
        comp_price = round(base * random.uniform(0.82, 1.18), 2)
        competitors.append({
            "competitor": names[i],
            "price": comp_price,
            "in_stock": random.random() > 0.15,
            "rating": round(random.uniform(3.5, 4.9), 1),
            "last_updated": (datetime.now() - timedelta(minutes=random.randint(5, 120))).isoformat(),
        })
    return competitors


def generate_elasticity_data(product_id: str):
    """Generate price-demand pairs for elasticity analysis."""
    idx = hash(product_id) % len(PRODUCT_CATALOG)
    base_price = PRODUCT_CATALOG[idx]["base_price"]
    base_demand = random.randint(300, 1200)
    # True elasticity coefficient (negative)
    true_elasticity = random.uniform(-2.5, -0.3)
    data_points = []

    for pct_change in range(-30, 35, 5):
        price = round(base_price * (1 + pct_change / 100), 2)
        # log-log model: ln(Q) = a + E * ln(P)
        demand_multiplier = math.exp(true_elasticity * math.log((1 + pct_change / 100)))
        demand = int(base_demand * demand_multiplier * random.uniform(0.9, 1.1))
        data_points.append({"price": price, "demand": max(10, demand)})

    return {
        "product_id": product_id,
        "true_elasticity": round(true_elasticity, 3),
        "data_points": data_points,
        "base_price": base_price,
        "base_demand": base_demand,
    }
