from typing import List
from app.schemas.book_schema import BookCreate, BookUpdate, BookSchema
from app.repositories import book_repository


async def list_books() -> List[BookSchema]:
    return await book_repository.list_books()

async def get_book(book_id: str) -> BookSchema | None:
    return await book_repository.get_book(book_id)

async def create_book(book: BookCreate) -> BookSchema:
    return await book_repository.create_book(book)


# async def create_book_service(book: BookCreate) -> BookDB:
#     return await book_repository.create_book(book)

# async def get_book_service(book_id: str) -> BookDB | None:
#     return await book_repository.get_book(book_id)

# async def list_books_service() -> List[BookDB]:
#     return await book_repository.list_books()

# async def update_book_service(book_id: str, book: BookUpdate) -> BookDB | None:
#     return await book_repository.update_book(book_id, book)

# async def delete_book_service(book_id: str) -> bool:
#     return await book_repository.delete_book(book_id)
