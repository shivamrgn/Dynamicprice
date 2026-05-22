import random
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class SimulationRequest(BaseModel):
    demand_multiplier: float = 1.2
    competitor_action: str = "Price Drop 10%"

@router.post("/run")
async def run_simulation(req: SimulationRequest):
    data = []
    for i in range(1, 13):
        baseline = 10000 + random.random() * 5000
        simulated = baseline * req.demand_multiplier
        # Apply competitor action modifier
        if req.competitor_action == "Price Drop 10%":
            simulated *= random.uniform(0.88, 0.95)
        elif req.competitor_action == "Stock Out":
            simulated *= random.uniform(1.05, 1.25)
        data.append({
            "month": f"M{i}",
            "baseline": round(baseline, 2),
            "simulated": round(simulated, 2),
        })
    return {"data": data}
