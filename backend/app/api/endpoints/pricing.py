from fastapi import APIRouter, Depends
from app.schemas.pricing import OptimizationResponse
from app.services.pricing_service import pricing_service

router = APIRouter()

@router.get("/optimize/{product_id}", response_model=OptimizationResponse)
async def optimize_price(product_id: str):
    """
    Get the AI-recommended optimal price for a given product ID.
    """
    return await pricing_service.get_optimal_price(product_id)
