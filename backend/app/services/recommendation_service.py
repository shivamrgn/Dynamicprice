"""
Recommendation Service — generates AI pricing recommendations
by combining elasticity, competitor intel, and inventory data.
"""

import random
from app.data.synthetic import generate_product_catalog, generate_competitor_prices
from app.schemas.recommendation import RecommendationResponse


STRATEGIES = [
    "Aggressive Growth — undercut competitors to grab market share",
    "Premium Hold — maintain margin on high-demand items",
    "Clearance Push — reduce price to move aging inventory",
    "Competitive Match — align with nearest competitor price",
    "Profit Maximizer — optimize for maximum per-unit margin",
]


class RecommendationService:
    """Service layer for AI pricing recommendations."""

    def __init__(self):
        self._catalog = generate_product_catalog()

    def get_recommendation(self, product_id: str) -> RecommendationResponse:
        """Generate a single product recommendation."""
        product = next((p for p in self._catalog if p["id"] == product_id), None)
        if not product:
            # Fall back to a generated product
            product = self._catalog[hash(product_id) % len(self._catalog)]
            product["id"] = product_id

        competitors = generate_competitor_prices(product_id)
        avg_competitor = sum(c["price"] for c in competitors) / len(competitors) if competitors else product["current_price"]
        cheapest = min(c["price"] for c in competitors) if competitors else product["current_price"]
        any_oos = any(not c["in_stock"] for c in competitors)

        # Recommendation logic
        reasoning = []
        adjustment = 0.0

        # Competitor analysis
        if any_oos:
            adjustment += random.uniform(3, 8)
            reasoning.append("One or more competitors are out of stock — opportunity to capture demand.")
        if product["current_price"] > avg_competitor * 1.1:
            adjustment -= random.uniform(2, 5)
            reasoning.append(f"Current price ${product['current_price']} is above competitor average ${avg_competitor:.2f}.")
        elif product["current_price"] < cheapest * 0.95:
            adjustment += random.uniform(2, 6)
            reasoning.append(f"Currently cheapest in market — room to increase margin.")

        # Inventory signal
        days_of_stock = product["inventory"] / max(product["avg_daily_sales"], 1)
        if days_of_stock < 7:
            adjustment += random.uniform(5, 12)
            reasoning.append(f"Low inventory ({product['inventory']} units, {days_of_stock:.0f} days). Increase price to manage scarcity.")
        elif days_of_stock > 60:
            adjustment -= random.uniform(3, 8)
            reasoning.append(f"High inventory ({product['inventory']} units, {days_of_stock:.0f} days). Consider markdown.")

        if not reasoning:
            reasoning.append("Market conditions are stable. Minor optimization recommended.")

        # Calculate recommendation
        recommended_price = round(product["current_price"] * (1 + adjustment / 100), 2)
        price_change_pct = round(((recommended_price - product["current_price"]) / product["current_price"]) * 100, 1)
        confidence = round(random.uniform(0.72, 0.97), 2)

        # Revenue uplift estimate
        uplift = round(price_change_pct * random.uniform(0.3, 0.8), 1)
        demand_change = round(-price_change_pct * random.uniform(0.2, 0.5), 1)

        # Risk
        if abs(price_change_pct) > 10:
            risk = "high"
        elif abs(price_change_pct) > 5:
            risk = "medium"
        else:
            risk = "low"

        strategy = random.choice(STRATEGIES)

        return RecommendationResponse(
            product_id=product["id"],
            product_name=product["name"],
            current_price=product["current_price"],
            recommended_price=recommended_price,
            price_change_pct=price_change_pct,
            confidence=confidence,
            expected_revenue_uplift_pct=uplift,
            expected_demand_change_pct=demand_change,
            reasoning=reasoning,
            risk_level=risk,
            strategy=strategy,
        )

    def get_batch(self, product_ids: list[str] | None = None, min_confidence: float = 0.7) -> list[RecommendationResponse]:
        """Generate recommendations for multiple products."""
        ids = product_ids or [p["id"] for p in self._catalog]
        recs = [self.get_recommendation(pid) for pid in ids]
        return [r for r in recs if r.confidence >= min_confidence]


# Singleton
recommendation_service = RecommendationService()
