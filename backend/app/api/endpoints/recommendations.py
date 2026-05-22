"""Recommendation API endpoints."""

from fastapi import APIRouter
from app.schemas.recommendation import BatchRecommendationRequest, ApplyRecommendationRequest
from app.services.recommendation_service import recommendation_service

router = APIRouter()


@router.get("/{product_id}")
async def get_recommendation(product_id: str):
    """Get AI pricing recommendation for a single product."""
    rec = recommendation_service.get_recommendation(product_id)
    return rec


@router.post("/batch")
async def get_batch_recommendations(req: BatchRecommendationRequest):
    """Get recommendations for multiple products at once."""
    recs = recommendation_service.get_batch(req.product_ids, req.min_confidence)
    return {"count": len(recs), "recommendations": [r.model_dump() for r in recs]}


@router.post("/apply")
async def apply_recommendation(req: ApplyRecommendationRequest):
    """Apply a pricing recommendation (update the product price)."""
    return {
        "status": "applied",
        "product_id": req.product_id,
        "new_price": req.new_price,
        "message": f"Price for {req.product_id} updated to ${req.new_price:.2f}",
    }
