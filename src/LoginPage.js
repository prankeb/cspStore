import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Component for the login page
export default function LoginPage({ onLoginSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //calls the server to log in the user
  const handleSubmit = async (event) => {

    event.preventDefault();
    

    try {
      // Make an HTTP request to the server's login
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Call the onLoginSubmit function with the received data
        onLoginSubmit(data);
      } else {
        // shows error if did not work
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    //Wraped in a div element
    <div className="LoginPage">
      <LoginTitle />
      <LoginForm onLoginSubmit={handleSubmit} setUsername={setUsername} setPassword={setPassword} username={username} password={password} />
      <AccountButton />
    </div>
  );
}

//Component for title of the page
function LoginTitle() {
  return (
    <h2 className='loginTitle'>Login</h2>
  )
}

//component that contains the login form. It uses child components for elements of the form 
function LoginForm({ onLoginSubmit, username, password, setUsername, setPassword }){
  return (
    <form className='LoginForm' onSubmit={onLoginSubmit}>
      <UserName setUsername={setUsername}/>
      <Password setPassword={setPassword}/>
      <Button />
    </form>
  )
}

//Component for user name input
function UserName({ setUsername }){
  return (
    <label>
      Username: 
      <input type='text'  name='Username' onChange={(e) => setUsername(e.target.value)} />
      <br />
    </label>
  )
}

//Component for Password input
function Password({ setPassword }){
  return (
    <label>
      Password:
      <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
      <br />
    </label>
  )
}

//Component for Submit button input
function Button() {
  return(
    <button type='submit'>Login</button>
  )
}

//button component for making an accouant
function AccountButton() {
  const navigate = useNavigate();

  //if clicked sends user to register page
  const handleAccountButton = () => {
      navigate('/register');
  };
  return (
      <button onClick={handleAccountButton}>Need an Account?</button>
  )

}


