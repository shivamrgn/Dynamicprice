from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.core.config import settings
from app.api.api import api_router
from app.workers.data_ingestion import fetch_competitor_prices

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def startup_event():
    scheduler = AsyncIOScheduler()
    scheduler.add_job(fetch_competitor_prices, 'interval', hours=2)
    scheduler.start()
    print("APScheduler started: fetching competitor prices every 2 hours.")


@app.get("/health")
def health_check():
    return {"status": "ok", "environment": "enterprise"}
