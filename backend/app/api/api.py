from fastapi import APIRouter, Body
from app.api.endpoints import (
    pricing, dashboard, analytics, elasticity, rl,
    simulations, settings, forecasting, recommendations,
)
from app.db.mongodb import db

api_router = APIRouter()
api_router.include_router(pricing.router, prefix="/pricing", tags=["pricing"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(elasticity.router, prefix="/elasticity", tags=["elasticity"])
api_router.include_router(rl.router, prefix="/rl", tags=["reinforcement-learning"])
api_router.include_router(simulations.router, prefix="/simulations", tags=["simulations"])
api_router.include_router(settings.router, prefix="/settings", tags=["settings"])
api_router.include_router(forecasting.router, prefix="/forecasting", tags=["forecasting"])
api_router.include_router(recommendations.router, prefix="/recommendations", tags=["recommendations"])

@api_router.patch("/settings")
async def patch_settings(settings_data: dict = Body(...)):
    """Save user dashboard settings directly into EngineSettings collection."""
    result = await db.EngineSettings.update_one(
        {}, {"$set": settings_data}, upsert=True
    )
    return {
        "status": "success",
        "modified_count": result.modified_count,
        "upserted_id": str(result.upserted_id) if result.upserted_id else None
    }
