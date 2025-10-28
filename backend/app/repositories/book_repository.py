from typing import List
from app.config.database import db
from app.schemas.book_schema import BookCreate, BookUpdate, BookSchema

COLLECTION = 'books'

async def list_books() -> List[BookSchema]:
    return []

async def get_book(book_id: str) -> BookSchema | None:
    return None

async def create_book(book: BookCreate) -> BookSchema:
    print("Creating book:", book)
    print(db)
    print(COLLECTION)
    result = await db[COLLECTION].insert_one(book)
    return BookSchema(**book.dict(), id='mocked_id')

# async def create_book(book: BookCreate) -> BookSchema:
#     book_dict = book.dict()
#     result = await db[COLLECTION].insert_one(book_dict)
#     return BookSchema(**{**book_dict, '_id': result.inserted_id})

# async def get_book(book_id: str) -> BookSchema | None:
#     data = await db[COLLECTION].find_one({'_id': ObjectId(book_id)})
#     if data:
#         return BookSchema(**data)
#     return None

# async def list_books() -> List[BookSchema]:
#     books = []
#     async for b in db[COLLECTION].find():
#         books.append(BookSchema(**b))
#     return books

# async def update_book(book_id: str, book: BookUpdate) -> BookSchema | None:
#     update_data = {k: v for k, v in book.dict().items() if v is not None}
#     if not update_data:
#         return await get_book(book_id)
#     await db[COLLECTION].update_one({'_id': ObjectId(book_id)}, {'$set': update_data})
#     return await get_book(book_id)

# async def delete_book(book_id: str) -> bool:
#     result = await db[COLLECTION].delete_one({'_id': ObjectId(book_id)})
#     return result.deleted_count > 0
