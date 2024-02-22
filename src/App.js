import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import LoginPage from './LoginPage';
import Register from './Register';
import Products from './StorePage';
import { Route, Routes } from 'react-router-dom';
import Cart from './Cart';
import Invoice from './Invoice';
import { Provider} from 'react-redux';
import store from './store';





//the main Component displays the header and then the main page
//Wraps it in the redux store allows all components access to cart data 
//Adds routes to homepage, cart, and to the invoice page
function App(){
    return (
        <Provider store={store}>
        <div className='App'>
        <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
        </Provider>
    )
}


//main page component displays LoginPage if user is signed out
//Otherwise displays the main store page
function MainPage(){
    //User is started logged out
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //User is logged in once they click the button
    const handleLoginSubmit = (userData) => {
        setUser(userData.user);
        setIsLoggedIn(true)
      };
    
      //Returns store page if logged in 
    return (
        <div>
            {isLoggedIn ? (
                <Products />
            ) : (
                <LoginPage onLoginSubmit={handleLoginSubmit} />
            )}
        </div>

    )
}

export default App;