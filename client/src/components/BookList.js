import React from 'react';
import BookItem from './BookItem';

const BookList = (props) => {
    const {books, handleView} = props;

    return (
        <section className="bookList">
            {books.map(book => (
                <BookItem handleView={handleView} key={book._id} book={book}/>
            ))}
        </section>
    );
}

export default BookList;