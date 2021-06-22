import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const ManageBook = (props) => {
    const {book, reloadBooks} = props;
    const history = useHistory();
    const [editable, setEditable] = useState(false);
    const [updateBook, setUpdateBook] = useState({
        _id: book._id,
        title: book.title,
        isbn: book.isbn,
        description: book.description
    });
    
    const deleteHandler = (_id) => {
        if(window.confirm("Are you sure you want to delete it?")){
            fetch(`http://localhost:5000/api/books/${_id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if(response.ok){
                    window.alert("Successfully deleted!");
                    history.push('/');
                    reloadBooks();
                }else{
                    window.alert("Unexpected error!");
                }
            });
        }
    }
    
    const updateHandler = () => {
        fetch('http://localhost:5000/api/books/', {
            method: 'PUT',
            body: JSON.stringify(updateBook),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(response => {
            if(response.ok){
                window.alert('Successfully updated!');
                setEditable(false);
                reloadBooks();
            }else{
                window.alert("Unexpected error!");
            }
        });
    }

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setUpdateBook({
            ...updateBook,
            [name]: value
        });
    }

    return (
        <>
        {book ? 
        <section className="bookList">
            {editable ? 
            <article className="bookListItem noselect">
                <form className="update-form">
                    <label htmlFor="title">Title: </label>
                    <input onChange={changeHandler} type="text" name="title" id="title" value={updateBook.title}/>

                    <label htmlFor="isbn">ISBN: </label>
                    <input onChange={changeHandler} type="text" name="isbn" id="isbn" value={updateBook.isbn}/>

                    <label htmlFor="description">Description: </label>
                    <textarea onChange={changeHandler} name="description" id="description" value={updateBook.description}></textarea>
                </form>
                <div className="controllers">
                    <button onClick={updateHandler} type="button" className="button-1 update">Update</button>
                    <button onClick={() => {setEditable(false)}} type="button" className="button-1 cancel">Cancel</button>
                    {/* <button onClick={() => {setEditable(false)}} type="button" className="button-1 done">Done</button> */}
                </div> 
            </article>
            :
            <article className="bookListItem noselect">
                <h1 className="title">{book.title}</h1>
                <p className="description">{book.description}</p>
                <p className="isbn">ISBN: {book.isbn}</p>
                <div className="controllers">
                    <button onClick={() => {setEditable(true)}} type="button" className="button-1 edit">Edit</button>
                    <button onClick={() => {deleteHandler(book._id)}} type="button" className="button-1 delete">Delete</button>
                </div> 
            </article>}
        </section>
        : false}
        </>
    );
}

export default ManageBook;