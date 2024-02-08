import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import LoginPage from './LoginPage';
import Products from './StorePage';


//the main Component displays the header and then the main page
function App(){
    return (
        <div className='App'>
            <Header />
            <MainPage />
        </div>
    )
}


//main page component displays LoginPage if user is signed out
//Otherwise displays the main store page
function MainPage(){
    //User is started logged out
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //User is logged in once they click the button
    const handleLoginSubmit = () => {
        setIsLoggedIn(true);
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