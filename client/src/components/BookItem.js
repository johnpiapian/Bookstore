import React from 'react';
import { useHistory } from 'react-router-dom';

const BookItem = (props) => {
    const {book, handleView} = props;
    const history = useHistory();

    const clickHandler = (_id) => {
        handleView(_id)
        history.push(`/manage/${_id}`);
    }

    return (
        <article onClick={() => {clickHandler(book._id)}} className="bookListItem">
            <h1 className="title" >{book.title}</h1>
            <p className="description" >{book.description}</p>
            <p className="isbn" >ISBN: {book.isbn}</p>
        </article>
    );
}

export default BookItem;