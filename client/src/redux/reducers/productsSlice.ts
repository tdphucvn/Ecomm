import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
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
            console.log(response);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        };
    },
);

export const deleteProductsRequest = createAsyncThunk(
    'products/deleteProductsStatus',
    async(productsIds: Array<string>, { rejectWithValue }) => {
        try {
            const response = await productsAPI.deleteProducts(productsIds);
            console.log(response);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductsRequest.fulfilled, (state, action) => {
            state.products = action.payload;
        });
        builder.addCase(deleteProductsRequest.fulfilled, (state, action) => {
            const currentArrayOfProducts = state.products;
            let currentArrayOfProductsIds = [];
            const newArrayOfProducts = [];
            currentArrayOfProducts.forEach(product => {
                currentArrayOfProductsIds.push(product._id);
            })
            const arrayOfProductsIDs = action.payload.data.arrayOfProductsIDs;
            const newArrayOfProductsIDs = currentArrayOfProductsIds.filter(product => !arrayOfProductsIDs.includes(product));
            newArrayOfProductsIDs.forEach(id => {
                const newProduct = currentArrayOfProducts.find(product => product._id === id);
                newArrayOfProducts.push(newProduct);
            });

            console.log(newArrayOfProducts);
            console.log(newArrayOfProductsIDs);
            state.products = newArrayOfProducts;
        });
    },
});

export default productsSlice.reducer;