import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

const NewBook = (props) => {
    const {reloadBooks} = props;
    const form = useRef(null);
    const [successMsg, setSuccessMsg] = useState(false);
    const history = useHistory();

    const submitHandler = (e) => {

        let data = form.current;

        let newBook = {};
            newBook.title = data.title.value;
            newBook.isbn = data.isbn.value;
            newBook.description = data.description.value;

        // No validation as of right now 

        // Post to database
        fetch('http://localhost:5000/api/books/', {
            method: 'POST',
            body: JSON.stringify(newBook),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        .then(response => {
            // if successfully submitted
            if(response.ok){
                // Show success message and redirect (for testing)
                /*
                setSuccessMsg(true);
                setTimeout(() => {
                    setSuccessMsg(false);
                }, 2000);
                */

                // clear form
                data.title.value = '';
                data.isbn.value = '';
                data.description.value = '';

                reloadBooks();
                window.alert("Successfully added!");
                history.push('/');
            }else{
                window.alert("Unexpected error!");
            }
        });
    }

    return (
        <div>
            {/* Success messsage -> just for testing purposes */}
            {successMsg ? <div className="alert success">Successfully added a new book.</div> : '' }
            <div className="newbook">
                <h2>Create New Book</h2>
                <form ref={form} className="newbook-form">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" id="title"/>

                    <label htmlFor="isbn">ISBN: </label>
                    <input type="text" name="isbn" id="isbn"/>

                    <label htmlFor="description">Description: </label>
                    <textarea name="description" id="description">

                    </textarea>
                    <button type="button" onClick={submitHandler} className="create button-1">Create</button>
                </form>
            </div>
        </div>
    );
}

export default NewBook;