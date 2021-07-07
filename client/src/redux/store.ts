import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from './reducers/counterSlice';
import authenticatonReducer from './reducers/authenticate';

const reducer = combineReducers({
    count: counterReducer,
    auth: authenticatonReducer
});

export const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch