from fastapi import APIRouter, HTTPException, Request
from typing import List
from app.schemas.book_schema import BookCreate, BookUpdate, BookSchema
from app.services import book_service

router = APIRouter(prefix='/books', tags=['Books'])

# @router.get('/', response_model=List[BookSchema])
# async def list_books(request: Request):
#     return await book_service.list_books()

# @router.get('/{book_id}', response_model=BookSchema)
# async def get_book(book_id: str):
#     book = await book_service.get_book(book_id)
#     if not book:
#         raise HTTPException(status_code=404, detail='Book not found')
#     return book

@router.post('/', response_model=BookSchema)
async def create_book(request: Request, book: BookCreate):
    # return await book_service.create_book(book)
    print('@@@@')
    print(request.app.state.db)
    return None

# @router.post('/', response_model=BookSchema)
# async def create_book(book: BookCreate):
#     return await book_service.create_book_service(book)

# @router.get('/', response_model=List[BookDB])
# async def list_books():
#     return await book_service.list_books_service()

# @router.get('/{book_id}', response_model=BookDB)
# async def get_book(book_id: str):
#     book = await book_service.get_book_service(book_id)
#     if not book:
#         raise HTTPException(status_code=404, detail='Book not found')
#     return book

# @router.put('/{book_id}', response_model=BookDB)
# async def update_book(book_id: str, book: BookUpdate):
#     updated = await book_service.update_book_service(book_id, book)
#     if not updated:
#         raise HTTPException(status_code=404, detail='Book not found')
#     return updated

# @router.delete('/{book_id}')
# async def delete_book(book_id: str):
#     deleted = await book_service.delete_book_service(book_id)
#     if not deleted:
#         raise HTTPException(status_code=404, detail='Book not found')
#     return {'message': 'Book deleted successfully'}
