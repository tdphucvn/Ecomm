import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productsAPI from '../../api/products';

type Query = {
    sortState: string;
    filterState: string;
};

type DeleteObject = {
    productsIds: Array<string>;
    accessToken: string;
}

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
    async(productObject: DeleteObject, { rejectWithValue }) => {
        try {
            const {productsIds, accessToken} = productObject;
            const response = await productsAPI.deleteProducts(productsIds, accessToken);
            if(response.status === 400) return rejectWithValue({message: response.data.message, status: response.status});
            if(response.status === 401) return rejectWithValue({message: response.data.message, status: response.status});
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
            state.products = newArrayOfProducts;
        });
        builder.addCase(deleteProductsRequest.rejected, (state, action) => {
            console.log('rejected');
        })
    },
});

export default productsSlice.reducer;