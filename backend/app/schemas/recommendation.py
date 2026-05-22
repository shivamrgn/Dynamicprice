"""Pydantic schemas for the recommendations module."""

from pydantic import BaseModel


class RecommendationResponse(BaseModel):
    product_id: str
    product_name: str
    current_price: float
    recommended_price: float
    price_change_pct: float
    confidence: float
    expected_revenue_uplift_pct: float
    expected_demand_change_pct: float
    reasoning: list[str]
    risk_level: str  # low, medium, high
    strategy: str


class BatchRecommendationRequest(BaseModel):
    product_ids: list[str] | None = None  # None = all products
    min_confidence: float = 0.7


class ApplyRecommendationRequest(BaseModel):
    product_id: str
    new_price: float
