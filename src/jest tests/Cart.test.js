import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '../Cart';
import { useSelector } from 'react-redux';

// Mock react-router-dom's useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock the Redux store
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Cart Component', () => {
  // Mock fake cart items
  const mockCartItems = [
    {
      id: 1,
      name: 'Item 1',
      price: 10,
      description: 'Description 1',
    },
    {
      id: 2,
      name: 'Item 2',
      price: 20,
      description: 'Description 2',
    },
  ];

  // Mock the selectors
  beforeEach(() => {
    useSelector.mockReturnValue(mockCartItems);
  });

  //Tests cart with items i it
  test('renders Cart component with items', () => {
    render(<Cart onClose={() => {}} onRemoveItem={() => {}} />);
    
    // Check if the CartTitle is rendered
    expect(screen.getByText('Your Cart')).toBeInTheDocument();

    // Check if the items are rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();

    // Check if the Close Cart button is rendered
    expect(screen.getByText('Close Cart')).toBeInTheDocument();

    // Check if the Buy Products button is rendered
    expect(screen.getByText('Buy Products!')).toBeInTheDocument();
  });


  //Tests cart with an no items
  test('renders Cart component with empty cart', () => {
    // Mock an empty cart
    useSelector.mockReturnValue([]);

    render(<Cart onClose={() => {}} onRemoveItem={() => {}} />);
    
    // Check if the "Your cart is empty." message is rendered
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });

  test('handles Buy Products button click', () => {
    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

    render(<Cart onClose={() => {}} onRemoveItem={() => {}} />);
    
    // Click the Buy Products button
    fireEvent.click(screen.getByText('Buy Products!'));

    // Check if user is brought to invoice
    expect(navigateMock).toHaveBeenCalledWith('/Invoice');
  });

  
});