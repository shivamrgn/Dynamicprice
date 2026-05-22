import random
from fastapi import APIRouter

router = APIRouter()

@router.get("/metrics")
async def get_dashboard_metrics():
    return {
        "metrics": [
            {
                "title": "Active SKUs Monitored",
                "value": f"{random.randint(13000, 15000):,}",
                "change": f"+{round(random.uniform(8, 16), 1)}%",
                "positive": True,
            },
            {
                "title": "Revenue Uplift (24h)",
                "value": f"${random.randint(38000, 55000):,}",
                "change": f"+{round(random.uniform(5, 12), 1)}%",
                "positive": True,
            },
            {
                "title": "RL Model Confidence",
                "value": f"{round(random.uniform(91, 97), 1)}%",
                "change": f"-{round(random.uniform(0.1, 1.5), 1)}%",
                "positive": False,
            },
        ]
    }


@router.get("/pricing-chart")
async def get_pricing_chart():
    base = 120
    points = []
    for h in range(0, 25, 4):
        base += random.randint(-15, 20)
        base = max(90, min(180, base))
        points.append({"time": f"{h:02d}:00", "price": base})
    return {"data": points}


@router.get("/demand-chart")
async def get_demand_chart():
    base = 400
    points = []
    for h in range(0, 25, 4):
        base += random.randint(-80, 120)
        base = max(200, min(900, base))
        points.append({"time": f"{h:02d}:00", "demand": base})
    return {"data": points}
