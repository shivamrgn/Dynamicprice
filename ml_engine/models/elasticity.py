import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

class PriceElasticityModel:
    def __init__(self):
        self.model = LinearRegression()
        self.elasticity_coefficient = None

    def fit(self, prices: np.ndarray, demand: np.ndarray):
        """
        Fits a log-log regression model to estimate price elasticity.
        log(Demand) = alpha + beta * log(Price)
        where beta is the price elasticity of demand.
        """
        log_prices = np.log(prices).reshape(-1, 1)
        log_demand = np.log(demand)
        
        self.model.fit(log_prices, log_demand)
        self.elasticity_coefficient = self.model.coef_[0]
        
        return self.elasticity_coefficient

    def predict_demand(self, base_price, base_demand, new_price):
        """
        Predicts demand for a new price based on calculated elasticity.
        """
        if self.elasticity_coefficient is None:
            raise ValueError("Model must be trained before predicting.")
            
        # (Q2 - Q1) / Q1 = E * (P2 - P1) / P1
        # Q2 = Q1 * (1 + E * (P2 - P1) / P1)
        price_change_pct = (new_price - base_price) / base_price
        expected_demand_change_pct = self.elasticity_coefficient * price_change_pct
        new_demand = base_demand * (1 + expected_demand_change_pct)
        return max(0, new_demand) # Demand cannot be negative

    def get_elasticity_category(self):
        if self.elasticity_coefficient is None:
            return "Unknown"
        if self.elasticity_coefficient < -1:
            return "Elastic (Sensitive to price changes)"
        elif -1 <= self.elasticity_coefficient < 0:
            return "Inelastic (Insensitive to price changes)"
        else:
            return "Giffen/Veblen (Anomalous)"
