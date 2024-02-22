import React from "react";
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Products from "../StorePage";
import { Provider } from 'react-redux';
import store from '../store';
import { MemoryRouter } from "react-router-dom";

//Mocks the cart page
jest.mock('../Cart', () => () => <div data-testid="mocked-cart" />);

//Mocks data from the redux store
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: 'Sample Book',
          price: 10.99,
          description: 'A sample book description',
        },
      ]),
  })
);

describe('Products Component', () => {
    it('renders correctly', async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Products />
                </Provider>
            </MemoryRouter>
        );

        
        await waitFor(() => {
          // Check if sample book is loaded into page
          expect(screen.getByText('Store Page')).toBeInTheDocument();
          expect(screen.getByAltText('Textbooks')).toBeInTheDocument();
          expect(screen.getByText('Sample Book')).toBeInTheDocument(); // Assuming you have a specific identifier for a book item
          expect(screen.getByText('View Cart')).toBeInTheDocument();
        });
    });

    //Test to see if selected book is rendered after clicked on
    it('displays selected book when clicked', async () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Products />
                </Provider>
            </MemoryRouter>
        );

        await waitFor(() => {
            fireEvent.click(screen.getByText('Sample Book'));
        })

        
        await act(async () => {
            expect(screen.getByText('Add to Cart!')).toBeInTheDocument();
        });
    });

    it('displays Cart when "View Cart" button is clicked', () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Products />
                </Provider>
            </MemoryRouter>
        );

        // Click on "View Cart" button
        fireEvent.click(screen.getByText('View Cart'));

        // Check if the Cart component is rendered
        expect(screen.getByTestId('mocked-cart')).toBeInTheDocument();
    });
});