import { createSlice } from '@reduxjs/toolkit';

//Redux slice for cart array
const cartSlice = createSlice({
  //Cart starts out as an empty array
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    //Reducer for adding item to cart
    addItem: (state, action) => {
      const newItem = { ...action.payload, price: parseFloat(action.payload.price) };
      state.items.push(action.payload);
    },
    //Reducer for removing item from cart
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    //Reducer for making the cart empty
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;
  
  
