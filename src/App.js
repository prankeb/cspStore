import './App.css';
//Imports the Header page
import Header from './Header.js';

//Component for the login page
function App() {
  return (
    //Wraped in a div element
    //Includes Header and then contains login form component 
    <div className="App">
      <Header />
      <LoginTitle />
      <LoginForm />
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
function LoginForm(){
  return (
    <form className='LoginForm'>
      <UserName />
      <Password />
      <Button />
    </form>
  )
}

//Component for user name input
function UserName(){
  return (
    <label>
      Username: 
      <input type='text'  name='Username' />
      <br />
    </label>
  )
}

//Component for Password input
function Password(){
  return (
    <label>
      Password:
      <input type='password' name='password' />
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

export default App;
