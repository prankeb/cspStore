import './App.css';
import React, { useState, useEffect } from 'react';
import Cart from './Cart';

//Main function is for displaying products
export default function Products(){
    const [books, setBooks] = useState([]);
    //Selected book starts out null
    const [selectedBook, setSelectedBook] = useState(null);
    //Variables for the cart as a list and the usestate for showing the cart page
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

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

    //adds book to cart and includes books that were already in the cart
    const handleAddToCart = book => {
        setCart(prevCart => [...prevCart, book]);
      };
    
    //When the cart is clicked it will display the cart page
    const handleCartClick = () => {
        setShowCart(!showCart);
      };

      //removes item from the cart
      const handleRemoveItem = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
      };
    
    //displays cart if it was clicked otherwise displays the store page
    return(
        <div>
            {showCart ? (
                <Cart cart={cart} onClose={() => setShowCart(false)} onRemoveItem={handleRemoveItem} />
            ) : (
                <StorePage
                    books={books}
                    selectedBook={selectedBook}
                    onBookClick={handleBookClick}
                    onAddToCart={handleAddToCart}
                    onCartClick={handleCartClick}
                />
            )}
        </div>
    );
            }

    function StorePage({ books, selectedBook, onBookClick, onAddToCart, onCartClick, showCart, cart }){
    //Displays the title and image component
    //Also displays booklist component
    //Displays the selected book if one is selected
    return(
        <div className='StorePage'>
            <StoreTitle />
            <StoreImage />
            <div className='StoreContent'>
            <div className='BookList'>
                <BookList books={books} onBookClick={onBookClick} selectedBook={selectedBook} setSelectedBook={onBookClick} />
            </div>
            {selectedBook && (
                <div className='selectedbook'>
                    
                    <h3>Used Book:</h3>
                    <p>Title: {selectedBook.name}</p>
                    <p>Price: ${selectedBook.price}</p>
                    <p>Description: {selectedBook.description}</p>
                    <button onClick={() => onAddToCart(selectedBook)}>Add to Cart!</button>
                </div>  
            )}
            {showCart && <Cart cart={cart} />}
            </div>
            <button onClick={onCartClick} id='cartButton'>View Cart</button>
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
function BookItem({ book, onBookClick, selectedBook, setSelectedBook, }){
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



