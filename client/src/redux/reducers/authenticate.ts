import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as authenticateAPI from '../../api/authenticate';

interface Authenticate {
    authenticated: boolean;
    accessToken: Array<string>;
    refreshToken: Array<string>;
    user: Array<string>;
};

type Credentials = {
    username: string;
    password: string;
}

const initialState: Authenticate = {
    authenticated: false,
    accessToken: [],
    refreshToken: [],
    user: []
};

const loginRequest = createAsyncThunk(
    'user/loginRequestStatus', 
    async (credentials: Credentials, thunkAPI) => {
        const response = await authenticateAPI.loginRequest(credentials.username, credentials.password);
        return response;
    }
);

export const authenticateSlise = createSlice({
    name: 'Authenticate',
    initialState,
    reducers: {
      
    },
});