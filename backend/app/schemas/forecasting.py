"""Pydantic schemas for the forecasting module."""

from pydantic import BaseModel


class ForecastRequest(BaseModel):
    product_id: str
    periods: int = 30


class ForecastPoint(BaseModel):
    date: str
    predicted_demand: float
    lower_bound: float
    upper_bound: float


class ForecastResponse(BaseModel):
    product_id: str
    model_used: str
    rmse: float | None = None
    forecast: list[ForecastPoint]


class ForecastModelStatus(BaseModel):
    model_name: str
    is_trained: bool
    last_trained_at: str | None
    training_samples: int
    rmse: float | None
