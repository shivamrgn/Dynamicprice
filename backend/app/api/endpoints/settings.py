from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# In-memory settings store (would be DB-backed in production)
_settings = {
    "min_margin": 15,
    "max_price_increase": 5,
    "retrain_cron": "0 0 * * *",
}

class SettingsPayload(BaseModel):
    min_margin: int | None = None
    max_price_increase: int | None = None
    retrain_cron: str | None = None

@router.get("")
async def get_settings():
    return _settings

@router.put("")
async def update_settings(payload: SettingsPayload):
    if payload.min_margin is not None:
        _settings["min_margin"] = payload.min_margin
    if payload.max_price_increase is not None:
        _settings["max_price_increase"] = payload.max_price_increase
    if payload.retrain_cron is not None:
        _settings["retrain_cron"] = payload.retrain_cron
    return {"status": "updated", "settings": _settings}
