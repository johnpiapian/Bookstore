from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from app.config.config import settings

async def connect_to_mongo(app: FastAPI):
    app.state.mongo_client = AsyncIOMotorClient(settings.MONGODB_URI)
    app.state.mongo_db = app.state.mongo_client[settings.DATABASE_NAME]
    print('✅ Connected to MongoDB')

async def close_mongo_connection(app: FastAPI):
    app.state.mongo_client.close()
    print('🛑 MongoDB connection closed')