import { apiClient, mlClient } from './api';

export interface PricingOptimizationResponse {
  product_id: string;
  recommended_price: number;
  confidence_score: number;
  reasoning: string;
}

export const pricingService = {
  getOptimization: async (productId: string): Promise<PricingOptimizationResponse> => {
    const { data } = await apiClient.get(`/api/v1/pricing/optimize/${productId}`);
    return data;
  },
  
  getElasticity: async (payload: any) => {
    const { data } = await mlClient.post('/predict-elasticity', payload);
    return data;
  }
};
