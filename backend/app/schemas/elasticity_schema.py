"""Pydantic schemas for the elasticity module."""

from pydantic import BaseModel


class ElasticityAnalyzeRequest(BaseModel):
    product_id: str


class ElasticityCurvePoint(BaseModel):
    price: float
    demand: int


class ElasticityResult(BaseModel):
    product_id: str
    coefficient: float
    classification: str
    optimal_price: float
    max_revenue_price: float
    base_price: float
    base_demand: int
    curve: list[ElasticityCurvePoint]


class SensitivityRequest(BaseModel):
    product_id: str
    price_changes: list[float]  # e.g. [-20, -10, 0, 10, 20] as percentages


class SensitivityPoint(BaseModel):
    price_change_pct: float
    new_price: float
    predicted_demand: int
    predicted_revenue: float
    profit_impact_pct: float


class SensitivityResponse(BaseModel):
    product_id: str
    elasticity_coefficient: float
    points: list[SensitivityPoint]
