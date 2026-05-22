"""Forecasting API endpoints."""

from fastapi import APIRouter
from app.schemas.forecasting import ForecastRequest
from app.services.forecasting_service import forecasting_service

router = APIRouter()


@router.post("/train")
async def train_forecast_model(req: ForecastRequest):
    """Train forecasting model on historical data for a product."""
    result = await forecasting_service.train(req.product_id, days=90)
    return result


@router.get("/predict/{product_id}")
async def predict_demand(product_id: str, periods: int = 30):
    """Generate demand forecast for a product."""
    forecast = await forecasting_service.predict(product_id, periods)
    return forecast


@router.get("/history/{product_id}")
async def get_sales_history(product_id: str, days: int = 90):
    """Get historical sales data for a product."""
    history = await forecasting_service.get_history(product_id, days)
    return {"product_id": product_id, "days": days, "data": history}


@router.get("/status")
async def get_model_statuses():
    """Get the training status of all forecasting models."""
    statuses = forecasting_service.get_status()
    return {"models": [s.model_dump() for s in statuses]}
