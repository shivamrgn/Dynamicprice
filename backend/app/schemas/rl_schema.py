"""Pydantic schemas for the RL engine module."""

from pydantic import BaseModel


class RLTrainRequest(BaseModel):
    product_id: str
    episodes: int = 5000
    learning_rate: float = 0.1
    discount_factor: float = 0.9
    exploration_rate: float = 0.1


class RLTrainResponse(BaseModel):
    product_id: str
    episodes_completed: int
    final_reward: float
    convergence_episode: int
    optimal_policy: dict[str, str]
    training_curve: list[dict]


class RLStepRequest(BaseModel):
    product_id: str
    current_state: str  # e.g. "high_demand", "low_inventory"


class RLStepResponse(BaseModel):
    product_id: str
    current_state: str
    action_taken: str
    reward: float
    new_state: str
    q_value: float
    exploration: bool


class RLPolicyResponse(BaseModel):
    product_id: str
    states: list[str]
    policy: dict[str, str]
    q_table_summary: list[dict]
    total_episodes_trained: int
    avg_reward: float
