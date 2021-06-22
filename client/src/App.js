import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, Link, Redirect } from 'react-router-dom';
import './App.css';
import BookList from './components/BookList';
import NewBook from './components/NewBook';
import ManageBook from './components/ManageBook';

function App() {
  const [books, setBooks] = useState([]);
  const [currentBookId, setCurrentBookId] = useState();

  const handleView = (_id) => {
    setCurrentBookId(_id);
    loadBooks();
  }

  const loadBooks = async () => {
    await fetch(`http://localhost:5000/api/books/`)
      .then(res => res.json())
      .then(res => {
        setBooks(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  React.useEffect(() => {
    loadBooks();
  }, []);

  return (
    <Router>
    <div className="container">
      <header className="header">
        <h1>Favorite Books</h1>
      </header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/new-book">New Book</Link>
      </nav>
      <main>
        <Switch>
          <Route exact path="/">
            <BookList handleView={handleView} books={books}/>
          </Route>
          <Route exact path="/manage">
            <Redirect to="/"/>
          </Route>
          <Route path="/new-book">
            <NewBook reloadBooks={loadBooks}/>
          </Route>
          <Route path="/manage/:bookId">
            {currentBookId ? (
              <ManageBook reloadBooks={loadBooks} book={books.filter(book => book._id === currentBookId)[0]}/>
            ):(
              <Redirect to="/"/>
            )}
          </Route>
        </Switch>
      </main>
    </div>
    </Router>
  );
}

export default App;
