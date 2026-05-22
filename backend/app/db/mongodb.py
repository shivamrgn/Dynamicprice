import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017/mypc/pricing")
client = AsyncIOMotorClient(MONGO_URL)
db = client.dynamic_pricing

async def get_db():
    return db
