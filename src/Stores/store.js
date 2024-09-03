import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './storeSlice';


//Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer
  },
});

export default store;