from typing import List
from bson import ObjectId
from app.config.database import db
from app.schemas.book_schema import BookCreate, BookUpdate, BookDB

COLLECTION = 'books'

async def create_book(book: BookCreate) -> BookDB:
    book_dict = book.dict()
    result = await db[COLLECTION].insert_one(book_dict)
    return BookDB(**{**book_dict, '_id': result.inserted_id})

async def get_book(book_id: str) -> BookDB | None:
    data = await db[COLLECTION].find_one({'_id': ObjectId(book_id)})
    if data:
        return BookDB(**data)
    return None

async def list_books() -> List[BookDB]:
    books = []
    async for b in db[COLLECTION].find():
        books.append(BookDB(**b))
    return books

async def update_book(book_id: str, book: BookUpdate) -> BookDB | None:
    update_data = {k: v for k, v in book.dict().items() if v is not None}
    if not update_data:
        return await get_book(book_id)
    await db[COLLECTION].update_one({'_id': ObjectId(book_id)}, {'$set': update_data})
    return await get_book(book_id)

async def delete_book(book_id: str) -> bool:
    result = await db[COLLECTION].delete_one({'_id': ObjectId(book_id)})
    return result.deleted_count > 0
