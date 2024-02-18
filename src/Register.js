import './App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

//Component for the Register page
export default function RegisterPage() {
    const [loading, setLoading] = useState(false);

    

    return (
        //Wraped in a div element
        <div>
          <RegisterTitle />
          <RegisterForm />
        </div>
      );
    }


//Component for title of the page
function RegisterTitle() {
    return (
      <h2 className='RegisterTitle'>Register</h2>
    )
  }

//component that contains the Register form. It uses child components for elements of the form 
function RegisterForm(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          // Make an HTTP request to the server's register
          const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
    
          if (response.ok) {
            // sends user back to the main page
            navigate("/");
          } else {
            
            console.error('Registration failed');
          }
        } catch (error) {
          console.error('Error during registration:', error);
        }
      };

    
    return (
      <form className='RegisterForm' onSubmit={handleSubmit}>
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
        Create a Username: 
        <input type='text'  name='Username' onChange={(e) => setUsername(e.target.value)} />
        <br />
      </label>
    )
  }

  //Component for Password input
function Password({ setPassword }){
    return (
      <label>
        Create a Password:
        <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} />
        <br />
      </label>
    )
  }

  //Component for Submit button input
function Button() {
    return(
      <button type='submit'>Register</button>
    )
  }


