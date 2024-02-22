
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';  
import App from '../App';  
import MainPage from '../App';
import LoginPage from '../LoginPage';

// Mocksthe components used in App
jest.mock('../Header', () => () => <div data-testid="mocked-header" />);
jest.mock('../LoginPage', () => ({ onLoginSubmit }) => (
  <div data-testid="mocked-login">
    <button onClick={() => onLoginSubmit({ user: 'testUser' })}>Login</button>
  </div>
));
jest.mock('../StorePage', () => () => <div data-testid="mocked-store" /> );

//Testing to make sure app renders login page
describe('App Component', () => {
  it('renders Header and Login Page', () => {
    render(
      <Router>
        <Provider store={store}>
          <App />
          </Provider>
      </Router>
    );

    //Checks to see if it worked
    expect(screen.getByTestId('mocked-header')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-login')).toBeInTheDocument();
    
  });

  //Tests that store page shows up after login is done
  it('renders Header and Store Page', () => {
    render(
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>,
    );


    //Clicks the login button
    fireEvent.click(screen.getByText('Login'));

   

    // You can add more specific assertions based on your actual component structure
    expect(screen.getByTestId('mocked-header')).toBeInTheDocument();
    expect(screen.getByTestId('mocked-store')).toBeInTheDocument();
    
  });


});

