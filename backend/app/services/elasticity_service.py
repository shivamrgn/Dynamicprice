"""
Elasticity Service — computes price elasticity coefficients,
optimal price points, and sensitivity simulations.
"""

import math
import random
from app.data.synthetic import generate_elasticity_data, PRODUCT_CATALOG
from app.schemas.elasticity_schema import (
    ElasticityResult, ElasticityCurvePoint,
    SensitivityPoint, SensitivityResponse,
)


class ElasticityService:
    """Service layer for price elasticity analysis."""

    def analyze(self, product_id: str) -> ElasticityResult:
        """Run elasticity analysis and return coefficient + curves."""
        data = generate_elasticity_data(product_id)
        coefficient = data["true_elasticity"]
        base_price = data["base_price"]
        base_demand = data["base_demand"]
        points = data["data_points"]

        # Classification
        if coefficient > 0:
            classification = "Veblen/Giffen (Anomalous)"
        elif abs(coefficient) < 1:
            classification = "Inelastic"
        elif abs(coefficient) < 2:
            classification = "Elastic"
        else:
            classification = "Highly Elastic"

        # Optimal price: maximize revenue = P * Q(P)
        # For log-log model: optimal P = base_P / (1 + 1/E)  when E < -1
        if coefficient < -1:
            optimal_price = round(base_price / (1 + 1 / coefficient), 2)
        else:
            optimal_price = round(base_price * 1.05, 2)  # Slight increase for inelastic

        # Max revenue price search
        best_rev = 0
        max_rev_price = base_price
        for pt in points:
            rev = pt["price"] * pt["demand"]
            if rev > best_rev:
                best_rev = rev
                max_rev_price = pt["price"]

        curve = [ElasticityCurvePoint(price=pt["price"], demand=pt["demand"]) for pt in points]

        return ElasticityResult(
            product_id=product_id,
            coefficient=round(coefficient, 3),
            classification=classification,
            optimal_price=optimal_price,
            max_revenue_price=round(max_rev_price, 2),
            base_price=base_price,
            base_demand=base_demand,
            curve=curve,
        )

    def sensitivity(self, product_id: str, price_changes: list[float]) -> SensitivityResponse:
        """Simulate demand response for given price changes."""
        data = generate_elasticity_data(product_id)
        coefficient = data["true_elasticity"]
        base_price = data["base_price"]
        base_demand = data["base_demand"]
        base_revenue = base_price * base_demand

        points = []
        for pct in price_changes:
            new_price = round(base_price * (1 + pct / 100), 2)
            demand_mult = math.exp(coefficient * math.log(1 + pct / 100)) if (1 + pct / 100) > 0 else 0
            predicted_demand = max(1, int(base_demand * demand_mult * random.uniform(0.95, 1.05)))
            predicted_revenue = round(new_price * predicted_demand, 2)
            profit_impact = round(((predicted_revenue - base_revenue) / base_revenue) * 100, 1)

            points.append(SensitivityPoint(
                price_change_pct=pct,
                new_price=new_price,
                predicted_demand=predicted_demand,
                predicted_revenue=predicted_revenue,
                profit_impact_pct=profit_impact,
            ))

        return SensitivityResponse(
            product_id=product_id,
            elasticity_coefficient=round(coefficient, 3),
            points=points,
        )


# Singleton
elasticity_service = ElasticityService()
