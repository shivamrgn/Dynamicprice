"""Enhanced Elasticity API endpoints."""

import random
import math
from fastapi import APIRouter
from app.schemas.elasticity_schema import ElasticityAnalyzeRequest, SensitivityRequest
from app.services.elasticity_service import elasticity_service

router = APIRouter()


@router.get("/curve")
async def get_elasticity_curve():
    """Get generic elasticity curve data (dashboard widget)."""
    base_demand = 1300
    data = []
    for price in range(49, 110, 10):
        demand = int(base_demand * math.exp(-0.018 * (price - 49)))
        demand += random.randint(-40, 40)
        if demand < 50:
            demand = random.randint(50, 120)
        cat = "Inelastic" if demand > 800 else ("Elastic" if demand > 300 else "Highly Elastic")
        data.append({"price": price, "demand": demand, "category": cat})
    return {"data": data}


@router.get("/classifications")
async def get_sku_classifications():
    """Get elasticity classifications for dashboard display."""
    configs = [
        (-0.45, "Inelastic", "Increase Price"),
        (-1.20, "Elastic", "Promotional Discounts"),
        (-2.80, "Highly Elastic", "Maintain/Lower Price"),
        (0.10, "Veblen Good", "Premium Pricing"),
        (-0.92, "Inelastic", "Bundle Pricing"),
    ]
    skus = []
    for i, (coeff, cls, strat) in enumerate(configs):
        coeff_jitter = coeff + random.uniform(-0.1, 0.1)
        skus.append({
            "id": f"SKU-{(i+1)*100}",
            "coeff": f"{coeff_jitter:+.2f}",
            "class": cls,
            "strategy": strat,
        })
    return {"data": skus}


@router.post("/analyze")
async def analyze_elasticity(req: ElasticityAnalyzeRequest):
    """Run full elasticity analysis for a specific product."""
    result = elasticity_service.analyze(req.product_id)
    return result


@router.get("/analyze/{product_id}")
async def analyze_elasticity_get(product_id: str):
    """GET version — run elasticity analysis for a product."""
    result = elasticity_service.analyze(product_id)
    return result


@router.post("/sensitivity")
async def sensitivity_simulation(req: SensitivityRequest):
    """Simulate demand response for given price change scenarios."""
    result = elasticity_service.sensitivity(req.product_id, req.price_changes)
    return result
