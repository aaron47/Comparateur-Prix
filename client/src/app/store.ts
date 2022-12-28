import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import ProduitsReducer from '../features/ProduitsSlice';
import { usersApi } from '../services/usersApi';
import usersReducer from '../features/UsersSlice';

export const store = configureStore({
  reducer: {
    produits: ProduitsReducer,
    user: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
