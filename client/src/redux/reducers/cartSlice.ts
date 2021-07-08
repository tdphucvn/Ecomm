import { createSlice } from '@reduxjs/toolkit';

type Item = {
  id: string;
  amount: number;
}

interface CartState {
  items: Array<Item>;
  count: number;
};

const initialState: CartState = {
  items: [],
  count: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state) => {
      state.count++;
    },
    removeFromCart: (state) => {
      
    },
    increaseAmount: (state) => {

    },
    decreaseAmount: (state) => {

    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, increaseAmount, decreaseAmount } = cartSlice.actions;
export default cartSlice.reducer;