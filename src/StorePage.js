import './App.css';
import React, { useState, useEffect } from 'react';

//Main function is store page
export default function StorePage(){
    const [books, setBooks] = useState([]);
    //Selected book starts out null
    const [selectedBook, setSelectedBook] = useState(null);

    //Fetches the json file with book data
    //uses the data to use as book info
    useEffect(() => {
        fetch('/books.json')
            .then(response => response.json())
            .then(jsonData => setBooks(jsonData))
            .catch(error => console.error('Error getting books:', error));
    }, []);

    //When the user clicks on a book 
    //It becomes their selected book 
    const handleBookClick = (book) => {
        setSelectedBook(book);
    };

    //Displays the title and image component
    //Also displays booklist component
    //Displays the selected book if one is selected
    return(
        <div className='StorePage'>
            <StoreTitle />
            <StoreImage />
            <div className='StoreContent'>
            <div className='BookList'>
                <BookList books={books} onBookClick={handleBookClick} selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
            </div>
            {selectedBook && (
                <div className='selectedbook'>
                    
                    <h3>Used Book:</h3>
                    <p>Title: {selectedBook.name}</p>
                    <p>Price: ${selectedBook.price}</p>
                    <p>Description: {selectedBook.description}</p>
                    <button>Buy Now!</button>
                </div>
                
                
            )}
            </div>
        </div>

    )
}

//Component for the title
function StoreTitle () {
    return (
        <h2>Store Page</h2>
    )
}

//puplic domain image of textbooks 
//Source: https://commons.wikimedia.org/wiki/File:Wikibooks_textbooks_hybrid2.svg
function StoreImage () {
    return(
        <img src="images/textbooks.png" alt="Textbooks" className='StoreImage' />
    )
}

//Component for the book list. its passes the books, event listener from parent 
function BookList({ books, onBookClick, selectedBook, setSelectedBook }) {
    //maps each book 
    return (
        <div className='bookList'>
            {books.map(book => (
                <BookItem 
                    key={book.id} 
                    book={book} 
                    onBookClick={onBookClick}
                    selectedBook={selectedBook}
                    setSelectedBook={setSelectedBook} 
                />
            ))}
        </div>
    );
}

//Component for each indivdual book in the book list
//listens for click on book and then passes the selected book back up to the parent StorePage component
function BookItem({ book, onBookClick, selectedBook, setSelectedBook }){
    const handleClick = () => {
        onBookClick(book);
        setSelectedBook(book);
    };

    return (
        <div className={`BookItem ${book === selectedBook ? 'selected' : ''}`} onClick={handleClick}>
            <h3>{book.name}</h3>
            <p>${book.price}</p>
            <p>{book.description}</p>
        </div>
    );
}

