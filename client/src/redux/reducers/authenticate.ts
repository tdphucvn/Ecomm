import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as authenticateAPI from '../../api/authenticate';

type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
};
interface Authenticate {
    loading: boolean;
    authenticated: boolean;
    accessToken: Array<string>;
    user: Array<User>;
};

type LoginCredentials = {
    username: string;
    password: string;
};

type RegisterCredentials = {
    username: string;
    password: string;
    email: string
    firstName: string;
    lastName: string;
}

const initialState: Authenticate = {
    loading: false,
    authenticated: false,
    accessToken: [],
    user: []
};

export const loginRequest = createAsyncThunk(
    'user/loginRequestStatus', 
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const {username, password} = credentials;
            const response = await authenticateAPI.loginRequest(username, password);
            if(response.status === 401) return rejectWithValue({message: response.data.message, status: response.status});
            return response;
        } catch (error) {
            return error;
        };
    },
);

export const registerRequest = createAsyncThunk(
    'user/registerRequestStatus',
    async (credentials: RegisterCredentials, { rejectWithValue }) => {
        try {
            const {username, password, email, firstName, lastName} = credentials;
            const response = await authenticateAPI.registerRequest(username, password, email, firstName, lastName);
            if(response.status === 401) return rejectWithValue({message: response.data.message, status: response.status});
            return response;
        } catch (error) {
            return error;
        };
    },
);

export const authenticateSlise = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginRequest.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(loginRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.user = action.payload.data.user;
            state.accessToken = action.payload.data.token;
        });
        builder.addCase(loginRequest.rejected, (state, action) => {
            state.loading = false;
            state.authenticated = false;
        });
        builder.addCase(registerRequest.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registerRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.user = action.payload.data.user;
            state.accessToken = action.payload.data.token;
        });
        builder.addCase(registerRequest.rejected, (state, action) => {
            state.loading = false;
            state.authenticated = false;
        });
    },
});


export default authenticateSlise.reducer;