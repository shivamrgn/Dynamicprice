"""
RL Pricing Service — simulates a Q-Learning agent for pricing optimization.
Manages training, policy extraction, and step-by-step environment interaction.
"""

import random
import numpy as np
from app.schemas.rl_schema import (
    RLTrainResponse, RLStepResponse, RLPolicyResponse,
)


STATES = ["low_demand", "medium_demand", "high_demand", "low_inventory", "high_inventory", "competitor_oos"]
ACTIONS = ["decrease_5pct", "decrease_2pct", "hold", "increase_2pct", "increase_5pct", "increase_10pct"]

ACTION_LABELS = {
    "decrease_5pct": "Decrease price by 5%",
    "decrease_2pct": "Decrease price by 2%",
    "hold": "Hold price steady",
    "increase_2pct": "Increase price by 2%",
    "increase_5pct": "Increase price by 5%",
    "increase_10pct": "Increase price by 10%",
}


class RLPricingService:
    """Service layer for the Reinforcement Learning pricing engine."""

    def __init__(self):
        self._q_tables: dict[str, np.ndarray] = {}
        self._training_history: dict[str, list[dict]] = {}
        self._episodes_trained: dict[str, int] = {}

    def _get_reward(self, state: str, action: str) -> float:
        """Compute reward for a state-action pair (simulated environment)."""
        reward_map = {
            ("high_demand", "increase_5pct"): 8.0,
            ("high_demand", "increase_10pct"): 6.0,
            ("high_demand", "increase_2pct"): 5.0,
            ("high_demand", "hold"): 3.0,
            ("low_demand", "decrease_5pct"): 6.0,
            ("low_demand", "decrease_2pct"): 4.0,
            ("low_demand", "hold"): -1.0,
            ("low_demand", "increase_5pct"): -5.0,
            ("low_inventory", "increase_10pct"): 9.0,
            ("low_inventory", "increase_5pct"): 7.0,
            ("low_inventory", "hold"): 2.0,
            ("high_inventory", "decrease_5pct"): 5.0,
            ("high_inventory", "decrease_2pct"): 3.0,
            ("competitor_oos", "increase_5pct"): 8.0,
            ("competitor_oos", "increase_10pct"): 10.0,
            ("competitor_oos", "hold"): 4.0,
        }
        base = reward_map.get((state, action), random.uniform(-2, 2))
        return base + random.uniform(-1, 1)

    def _get_next_state(self, current: str) -> str:
        """Simulate environment transition."""
        transitions = {
            "low_demand": ["medium_demand", "low_demand", "low_inventory"],
            "medium_demand": ["high_demand", "low_demand", "medium_demand"],
            "high_demand": ["medium_demand", "high_demand", "low_inventory"],
            "low_inventory": ["low_demand", "medium_demand", "high_inventory"],
            "high_inventory": ["medium_demand", "high_inventory", "high_demand"],
            "competitor_oos": ["high_demand", "medium_demand", "competitor_oos"],
        }
        return random.choice(transitions.get(current, STATES))

    def train(self, product_id: str, episodes: int = 5000,
              alpha: float = 0.1, gamma: float = 0.9, epsilon: float = 0.1) -> RLTrainResponse:
        """Train the Q-Learning agent for a product."""
        n_states = len(STATES)
        n_actions = len(ACTIONS)
        q_table = np.zeros((n_states, n_actions))
        training_curve = []
        convergence_ep = episodes

        for ep in range(1, episodes + 1):
            state_idx = random.randint(0, n_states - 1)
            total_reward = 0

            for _ in range(20):  # 20 steps per episode
                # Epsilon-greedy action selection
                if random.random() < epsilon:
                    action_idx = random.randint(0, n_actions - 1)
                else:
                    action_idx = int(np.argmax(q_table[state_idx]))

                state_name = STATES[state_idx]
                action_name = ACTIONS[action_idx]
                reward = self._get_reward(state_name, action_name)
                next_state_name = self._get_next_state(state_name)
                next_state_idx = STATES.index(next_state_name)

                # Q-update
                best_next = np.max(q_table[next_state_idx])
                td_target = reward + gamma * best_next
                q_table[state_idx][action_idx] += alpha * (td_target - q_table[state_idx][action_idx])

                total_reward += reward
                state_idx = next_state_idx

            # Decay epsilon
            epsilon = max(0.01, epsilon * 0.9995)

            if ep % max(1, episodes // 20) == 0:
                training_curve.append({"episode": ep, "reward": round(total_reward, 2), "epsilon": round(epsilon, 4)})

            # Check convergence (reward stabilized)
            if ep > 100 and total_reward > 100 and convergence_ep == episodes:
                convergence_ep = ep

        # Store the trained Q-table
        self._q_tables[product_id] = q_table
        self._training_history[product_id] = training_curve
        self._episodes_trained[product_id] = episodes

        # Extract optimal policy
        policy = {}
        for i, state in enumerate(STATES):
            best_action_idx = int(np.argmax(q_table[i]))
            policy[state] = ACTION_LABELS[ACTIONS[best_action_idx]]

        final_reward = round(float(training_curve[-1]["reward"]) if training_curve else 0, 2)

        return RLTrainResponse(
            product_id=product_id,
            episodes_completed=episodes,
            final_reward=final_reward,
            convergence_episode=convergence_ep,
            optimal_policy=policy,
            training_curve=training_curve,
        )

    def step(self, product_id: str, current_state: str) -> RLStepResponse:
        """Execute a single RL decision step."""
        if product_id not in self._q_tables:
            self.train(product_id, episodes=1000)

        q_table = self._q_tables[product_id]
        state_idx = STATES.index(current_state) if current_state in STATES else 0
        epsilon = 0.05

        # Epsilon-greedy
        explored = random.random() < epsilon
        if explored:
            action_idx = random.randint(0, len(ACTIONS) - 1)
        else:
            action_idx = int(np.argmax(q_table[state_idx]))

        action = ACTIONS[action_idx]
        reward = self._get_reward(current_state, action)
        new_state = self._get_next_state(current_state)
        q_value = float(q_table[state_idx][action_idx])

        return RLStepResponse(
            product_id=product_id,
            current_state=current_state,
            action_taken=ACTION_LABELS[action],
            reward=round(reward, 2),
            new_state=new_state,
            q_value=round(q_value, 2),
            exploration=explored,
        )

    def get_policy(self, product_id: str) -> RLPolicyResponse:
        """Get the current optimal policy for a product."""
        if product_id not in self._q_tables:
            self.train(product_id, episodes=2000)

        q_table = self._q_tables[product_id]
        policy = {}
        q_summary = []
        for i, state in enumerate(STATES):
            best_idx = int(np.argmax(q_table[i]))
            policy[state] = ACTION_LABELS[ACTIONS[best_idx]]
            q_summary.append({
                "state": state,
                "best_action": ACTION_LABELS[ACTIONS[best_idx]],
                "q_value": round(float(q_table[i][best_idx]), 2),
            })

        total_eps = self._episodes_trained.get(product_id, 0)
        curve = self._training_history.get(product_id, [])
        avg_reward = round(sum(c["reward"] for c in curve) / len(curve), 2) if curve else 0

        return RLPolicyResponse(
            product_id=product_id,
            states=STATES,
            policy=policy,
            q_table_summary=q_summary,
            total_episodes_trained=total_eps,
            avg_reward=avg_reward,
        )


# Singleton
rl_service = RLPricingService()
