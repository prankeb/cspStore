import cartReducer, { addItem, removeItem, clearCart, selectCartItems } from '../storeSlice';

//Test for adding item to cart reducer
describe('Cart Reducer', () => {
  test('should handle adding an item to the cart', () => {
    const initialState = { items: [] };
    const newItem = { id: 1, name: 'Test Item', price: '10.00' };

    const nextState = cartReducer(initialState, addItem(newItem));

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual({ ...newItem, price: "10.00" });
  });

  //Test for the remove item reducer
  test('should handle removing an item from the cart', () => {
    const initialState = {
      items: [
        { id: 1, name: 'Item 1', price: 10 },
        { id: 2, name: 'Item 2', price: 20 },
      ],
    };

    const nextState = cartReducer(initialState, removeItem(1));

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual({ id: 2, name: 'Item 2', price: 20 });
  });

  //Test for clearing the cart
  test('should handle clearing the cart', () => {
    const initialState = {
      items: [
        { id: 1, name: 'Item 1', price: 10 },
        { id: 2, name: 'Item 2', price: 20 },
      ],
    };

    const nextState = cartReducer(initialState, clearCart());

    expect(nextState.items).toHaveLength(0);
  });

  test('should select cart items from the state', () => {
    const state = {
      cart: {
        items: [
          { id: 1, name: 'Item 1', price: 10 },
          { id: 2, name: 'Item 2', price: 20 },
        ],
      },
    };

    const selectedItems = selectCartItems(state);

    expect(selectedItems).toEqual(state.cart.items);
  });
});