using System.Collections.Generic;
using Bookstore.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Bookstore.Data
{
    public class BookContext : IBookRepo
    {
        private readonly IConfiguration Configuration;
        private IMongoCollection<Book> _books;

        public BookContext(IConfiguration configuration){
            Configuration = configuration;

            var client = new MongoClient(configuration["ApplicationSettings:dbConnection"]);
            var db = client.GetDatabase("api");

            _books = db.GetCollection<Book>("book");
        }

        public IEnumerable<Book> GetAllBooks()
        {
            return _books.Find(book => true).ToList();
        }

        public Book GetBookById(string id)
        {
            return _books.Find<Book>(book => book._id == id).FirstOrDefault();
        }        

        public Book AddBook(Book book)
        {
            book._id = null;
            _books.InsertOne(book);

            return book;
        }

        public Book Update(Book bookChanges)
        {
            _books.ReplaceOne(book => book._id == bookChanges._id, bookChanges);
            
            return bookChanges;
        }

        public Book DeleteById(string id)
        {
            var book = GetBookById(id);
            _books.DeleteOne(_book => _book._id == book._id);

            return book;
        }
    }
}