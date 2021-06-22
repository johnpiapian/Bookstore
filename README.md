# Bookstore
The project is intended to be a website that displays a list of books that are extracted from users.

## Feature list
### API endpoints:

**Add** - <br/>
Handle an incoming request to add a new book. 

POST /api/books

**Get** - <br/>
Handle a request to display all the books.

GET /api/books <br/>
GET /api/books/:id

**Update** - <br/>
Handle a request to update book information.

PUT /api/books 

**Delete** - <br/>
Handle a request to remove a book.

DEL /api/books/:id

### Database implementation:
- Provider: Atlas Mongodb  
- Database: MongoDB

### Front-end implementation:
- Technology/Language: Nodejs/Javascript
- Framework/Library: React  