using System.Collections.Generic;
using Bookstore.Data;
using Bookstore.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Controllers
{
    // ControllerBase -> no Views, Controller -> includes Views;
    [Route("api/books")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepo _repository;
        
        public BooksController(IBookRepo repository){
            _repository = repository; 
        }

        //GET api/books
        [HttpGet]
        public ActionResult <IEnumerable<Book>> GetAllBooks(){
            var bookItems = _repository.GetAllBooks();

            return Ok(bookItems);
        }

        //GET api/books/{id}
        [HttpGet("{id:length(24)}")]
        public ActionResult <Book> GetBookById(string id){
            var bookItem = _repository.GetBookById(id);

            if(bookItem != null){
                return Ok(bookItem);
            } 

            return NotFound();
        }

        //POST api/books
        [HttpPost]
        public IActionResult AddBook(Book newbook){
            return Ok(_repository.AddBook(newbook));
        }

        //DELETE api/book/{id}
        [HttpDelete("{id:length(24)}")]
        public IActionResult DeleteById(string id){
            var bookItem = _repository.DeleteById(id);

            if(bookItem != null){
                return Ok(bookItem);
            } 

            return NotFound();
        }

        //PUT api/book/
        [HttpPut]
        public IActionResult Update(Book newBook){
            var bookItem = _repository.Update(newBook);

            if(bookItem != null){
                return Ok(bookItem);
            } 

            return NotFound();
        }
    }
}