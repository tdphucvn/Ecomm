import { configureStore, combineReducers } from "@reduxjs/toolkit";
import counterReducer from './reducers/counterSlice';

const reducer = combineReducers({
    count: counterReducer,
});

export const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch