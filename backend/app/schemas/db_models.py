from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime

class Product(BaseModel):
    id: str = Field(..., alias="_id")
    name: str
    category: str
    base_cost: float
    base_price: float
    current_price: float
    inventory: int
    avg_daily_sales: int
    sales_history: List[dict] = []
    
    model_config = ConfigDict(populate_by_name=True)

class PriceLog(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    product_id: str
    old_price: float
    new_price: float
    reason: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    model_config = ConfigDict(populate_by_name=True)

class EngineSettings(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    min_margin: int = 15
    max_price_increase: int = 5
    retrain_cron: str = "0 0 * * *"
    
    model_config = ConfigDict(populate_by_name=True)
