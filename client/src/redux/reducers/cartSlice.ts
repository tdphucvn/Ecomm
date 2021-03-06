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
  total: number;
  count: number;
};

const initialState: CartState = {
  items: [],
  total: 0,
  count: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.count++;
      state.total = state.total + action.payload.price;
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      const newItemsArray = state.items.filter(item => item._id !== action.payload.id);
      state.items = newItemsArray;
      state.count = newItemsArray.length;
      state.total = state.total - action.payload.price * action.payload.amount;
    },
    updateCart: (state, action) => {
      const removedProducts = action.payload.data.arrayOfProductsIDs;
      let productsInCart = state.items;
      removedProducts.forEach((removedProductId: string) => {
        const updatedProductsInCart = productsInCart.filter(product => product._id !== removedProductId)
        productsInCart = updatedProductsInCart;
      });
      state.items = productsInCart;
      state.count = productsInCart.length;
    },
    cleanCart: (state) => {
      state.items = [];
      state.total = 0;
      state.count = 0;
    },
  },
});
// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, updateCart, cleanCart } = cartSlice.actions;
export default cartSlice.reducer;
