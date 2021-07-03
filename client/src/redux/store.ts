import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';

const reducer = combineReducers({
    counter: counterReducer,
})

export const store = configureStore({
    reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;