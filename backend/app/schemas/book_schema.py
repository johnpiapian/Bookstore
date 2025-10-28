from pydantic import BaseModel

class BookSchema(BaseModel):
    id: str
    title: str
    description: str
    isbn: str

class BookCreate(BaseModel):
    title: str
    description: str
    isbn: str

class BookUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    isbn: str | None = None