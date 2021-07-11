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
    admin: boolean;
    accessToken: string;
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
};

type LogoutData = {
    message: string;
};

const initialState: Authenticate = {
    loading: false,
    authenticated: false,
    admin: false,
    accessToken: '',
    user: []
};

export const loginRequest = createAsyncThunk(
    'user/loginRequestStatus', 
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const {username, password} = credentials;
            const response = await authenticateAPI.loginRequest(username, password);
            if(response.status === 401) return rejectWithValue({message: response.data.message, status: response.status});
            console.log(response);
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

export const logoutRequest = createAsyncThunk(
    'user/logoutRequestStatus',
    async ( data: LogoutData, {rejectWithValue}) => {
        try {
            const { message } = data;
            const response = await authenticateAPI.logoutRequest();
            console.log(message);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        };
    },
);

export const authenticateSlice = createSlice({
    name: 'authenticate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.user = action.payload.data.user;
            state.accessToken = action.payload.data.token;
            if(action.payload.data.user.admin) state.admin = true;
        });
        builder.addCase(loginRequest.rejected, (state, action) => {
            state.loading = false;
            state.authenticated = false;
        });
        builder.addCase(registerRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.authenticated = true;
            state.user = action.payload.data.user;
            state.accessToken = action.payload.data.token;
            if(action.payload.data.user.admin) state.admin = true;
        });
        builder.addCase(registerRequest.rejected, (state, action) => {
            state.loading = false;
            state.authenticated = false;
        });
        builder.addCase(logoutRequest.fulfilled, (state, action) => {
            state.authenticated = false;
            state.admin = false;
            state.user = [];
            state.accessToken = '';
        });
    },
});


export default authenticateSlice.reducer;