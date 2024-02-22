import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'; 
import configureStore from 'redux-mock-store';
import Invoice from '../Invoice';

//Mock Store
const mockStore = configureStore();


describe('Invoice Component', () => {
  //Tests invoice with fake sample data
  test('renders Invoice component with sample data', () => {
    const mockCartItems = [
      {
        id: 1,
        name: 'Item 1',
        price: 10,
      },
      {
        id: 2,
        name: 'Item 2',
        price: 20,
      },
    ];

    const initialState = {
      cart: {
        items: mockCartItems,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Router>
          <Invoice />
        </Router>
      </Provider>
    );

  });


});