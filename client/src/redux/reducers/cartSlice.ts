import { createSlice } from '@reduxjs/toolkit';

type Item = {
  _id: string;
  date: string;
  description: string;
  image: {
    url: string;
    public_id: string;
  };
  name: string;
  price: number;
  soldPieces: number;
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
    addToCart: (state, action) => {
      state.count++;
      state.items.push(action.payload)
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
