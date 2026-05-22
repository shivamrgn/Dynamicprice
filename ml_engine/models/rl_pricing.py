import numpy as np
import random

class QLearningPricingEngine:
    def __init__(self, states, actions, alpha=0.1, gamma=0.9, epsilon=0.1):
        """
        Q-Learning approach for pricing optimization.
        states: Discrete levels of inventory or demand.
        actions: Possible price adjustments (e.g., -10%, 0%, +10%).
        """
        self.states = states
        self.actions = actions
        self.alpha = alpha # Learning rate
        self.gamma = gamma # Discount factor
        self.epsilon = epsilon # Exploration rate
        self.q_table = np.zeros((len(states), len(actions)))

    def choose_action(self, state_idx):
        if random.uniform(0, 1) < self.epsilon:
            return random.choice(range(len(self.actions))) # Explore
        else:
            return np.argmax(self.q_table[state_idx]) # Exploit

    def update_q_value(self, state_idx, action_idx, reward, next_state_idx):
        best_next_action = np.argmax(self.q_table[next_state_idx])
        td_target = reward + self.gamma * self.q_table[next_state_idx][best_next_action]
        td_error = td_target - self.q_table[state_idx][action_idx]
        self.q_table[state_idx][action_idx] += self.alpha * td_error

    def get_optimal_policy(self):
        policy = {}
        for i, state in enumerate(self.states):
            best_action_idx = np.argmax(self.q_table[i])
            policy[state] = self.actions[best_action_idx]
        return policy
