from pydantic import BaseModel

class OptimizationRequest(BaseModel):
    product_id: str

class OptimizationResponse(BaseModel):
    product_id: str
    recommended_price: float
    confidence_score: float
    reasoning: str
