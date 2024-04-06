import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      const item = action.payload;

      const exists = state.cartItems.find(
        (cartItem) => cartItem.product === item.product
      );

      if (exists) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.product === item.product ? item : cartItem
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const { setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
