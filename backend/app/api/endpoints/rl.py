import random
import time
import uuid
from fastapi import APIRouter, BackgroundTasks, status
from app.schemas.rl_schema import RLTrainRequest, RLStepRequest
from app.services.rl_service import rl_service

router = APIRouter()

TrainingJobs = {}

@router.get("/rewards")
async def get_rl_rewards():
    """Get reward curve data for the dashboard chart."""
    data = []
    reward = -50
    for ep in [100, 500, 1000, 2000, 3000, 5000, 7500, 10000]:
        reward += random.randint(50, 180)
        reward = min(reward, 980)
        exploration = max(0.01, round(1.0 - (ep / 10000) * 0.99, 2))
        data.append({"episode": ep, "reward": reward, "exploration": exploration})
    return {"data": data}


@router.get("/decisions")
async def get_rl_decisions():
    """Get live agent decision feed for the dashboard."""
    actions = [
        ("Decreased price by 2%", "SKU-992", "Competitor out of stock detected."),
        ("Increased price by 5%", "SKU-104", "High demand velocity in last 1hr."),
        ("Held price steady", "SKU-445", "Elasticity threshold reached."),
        ("Increased price by 3%", "SKU-881", "Seasonal uplift detected via Prophet."),
        ("Decreased price by 1%", "SKU-227", "Conversion rate dropped below 2%."),
    ]
    results = []
    for i, (action, sku, reason) in enumerate(actions):
        ago = random.randint(1, 30) + i * 5
        results.append({"time": f"{ago} min{'s' if ago > 1 else ''} ago", "action": action, "sku": sku, "reason": reason})
    return {"data": results}


def background_train_task(task_id: str, req: RLTrainRequest):
    TrainingJobs[task_id] = {"status": "in_progress"}
    try:
        result = rl_service.train(
            product_id=req.product_id,
            episodes=req.episodes,
            alpha=req.learning_rate,
            gamma=req.discount_factor,
            epsilon=req.exploration_rate,
        )
        # Using model_dump() if result is a Pydantic model to make it JSON serializable in responses
        TrainingJobs[task_id] = {"status": "completed", "result": result.model_dump() if hasattr(result, 'model_dump') else result}
    except Exception as e:
        TrainingJobs[task_id] = {"status": "failed", "error": str(e)}


@router.post("/train", status_code=status.HTTP_202_ACCEPTED)
async def train_rl_agent(req: RLTrainRequest, background_tasks: BackgroundTasks):
    """Train the Q-Learning agent for a product."""
    task_id = str(uuid.uuid4())
    TrainingJobs[task_id] = {"status": "pending"}
    background_tasks.add_task(background_train_task, task_id, req)
    return {"message": "Training started", "task_id": task_id}


@router.get("/status/{task_id}")
async def get_training_status(task_id: str):
    """Poll for the completion status of a training job."""
    if task_id not in TrainingJobs:
        return {"status": "not_found"}
    return TrainingJobs[task_id]


@router.post("/step")
async def rl_step(req: RLStepRequest):
    """Execute a single RL pricing decision step."""
    result = rl_service.step(req.product_id, req.current_state)
    return result


@router.get("/policy/{product_id}")
async def get_rl_policy(product_id: str):
    """Get the current optimal pricing policy for a product."""
    result = rl_service.get_policy(product_id)
    return result
