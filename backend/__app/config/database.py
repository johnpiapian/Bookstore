from motor.motor_asyncio import AsyncIOMotorClient
from app.config.config import settings

client: AsyncIOMotorClient | None = None
db = None

async def connect_to_mongo():
    global client, db
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DATABASE_NAME]
    print('✅ Connected to MongoDB')


async def close_mongo_connection():
    global client
    if client:
        client.close()
        print('🛑 MongoDB connection closed')