# Dynamic Pricing Engine

An AI-powered Dynamic Pricing Engine for E-commerce.

## Architecture

*   **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion
*   **Backend**: FastAPI (Python)
*   **ML Engine**: Python, scikit-learn, XGBoost, Prophet, PyTorch
*   **Database**: PostgreSQL

## Getting Started

### Prerequisites

*   Docker and Docker Compose
*   Node.js (for local frontend development)
*   Python 3.10+ (for local backend/ML development)

### Running with Docker

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- ML API: http://localhost:8001

### Folder Structure

- `/frontend`: Next.js Web App
- `/backend`: FastAPI Core Application
- `/ml_engine`: Machine Learning Microservice
- `/data`: Datasets and ML models storage

## Features

- Premium animated landing page and enterprise dashboard
- Product management & Competitor pricing monitoring
- Demand forecasting, Price elasticity analysis, RL pricing optimization
- AI recommendations & Simulation engine
