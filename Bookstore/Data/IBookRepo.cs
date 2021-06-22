using System.Collections.Generic;
using Bookstore.Models;

namespace Bookstore.Data
{
    public interface IBookRepo
    {
        IEnumerable<Book> GetAllBooks();
        Book GetBookById(string id);
        Book AddBook(Book book);
        Book Update(Book bookChanges);
        Book DeleteById(string id);
    }
}