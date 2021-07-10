import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productsAPI from '../../api/products';

type Query = {
    sortState: string;
    filterState: string;
};

const initialState = {
    products: []
};

export const getProductsRequest = createAsyncThunk(
    'products/getProductsStatus', 
    async(query: Query, { rejectWithValue }) => {
        try {
            const {sortState, filterState} = query;
            const response = await productsAPI.getProducts(sortState, filterState);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        };
    },
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductsRequest.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
});

export default productsSlice.reducer;