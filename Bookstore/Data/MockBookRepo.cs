/*
using System.Collections.Generic;
using Bookstore.Models;

namespace Bookstore.Data
{
    public class MockBookRepo : IBookRepo
    {

        
        private static List<Book> books = new List<Book> {
            new Book { Id=0, Title="To Kill a Mockingbird", Description="The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.", ISBN="978-0446310789" },
            new Book { Id=1, Title="Test 2", Description="Your description here..", ISBN="0000000000"},
            new Book { Id=2, Title="Test 3", Description="Your description here..", ISBN="0000000010"},
            new Book { Id=3, Title="Test 4", Description="Your description here..", ISBN="0000000021"}
        };
        

        public int autoID(){
            int id = 0;

            if(books.Count > 0){
                var bookItem = books[books.Count - 1];
                id = bookItem.Id + 1;
            }

            return id;
        }

        public IEnumerable<Book> GetAllBooks()
        {
            return books; 
        }

        public Book GetBookById(int Id)
        {
            return books.Find(_book => _book.Id.Equals(Id));
        }

        public Book AddBook(Book newbook)
        {
            // if id is not provided or it already exists
            if(books.Contains(books.Find(item => item.Id.Equals(newbook.Id)))){
                newbook.Id = autoID();
            }
            
            books.Add(newbook);

            return newbook;
        }
        
        public Book Update(Book bookChanges)
        {
            Book book = GetBookById(bookChanges.Id);

            if(book != null){
                book.Title = bookChanges.Title != null ? bookChanges.Title: book.Title;
                book.Description = bookChanges.Description != null ? bookChanges.Description: book.Description;
                book.ISBN = bookChanges.ISBN != null ? bookChanges.ISBN: book.ISBN;
            }
            
            return book;
        }

        public Book DeleteById(int Id)
        {
            var book = books.Find(_book => _book.Id.Equals(Id));

            books.Remove(book);
            
            return book;
        }
    }
}
*/