from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.config.config import settings
from app.config.database import connect_to_mongo, close_mongo_connection
from app.routes import book_route

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo(app)
    yield
    await close_mongo_connection(app)

app = FastAPI(title=settings.APP_NAME, lifespan=lifespan)
app.include_router(book_route.router)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Book API!"}