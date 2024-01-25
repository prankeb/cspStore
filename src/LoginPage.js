import './App.css';

//Component for the login page
export default function LoginPage({ onLoginSubmit }) {
  return (
    //Wraped in a div element
    <div className="LoginPage">
      <LoginTitle />
      <LoginForm onLoginSubmit={onLoginSubmit} />
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
function LoginForm({ onLoginSubmit }){
  const handleSubmit = (event) => {
    event.preventDefault();
    onLoginSubmit();
  }
  return (
    <form className='LoginForm' onSubmit={handleSubmit}>
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


