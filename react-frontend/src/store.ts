import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './slices/membersSlice';

export const store = configureStore({
    reducer: {
        members: membersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
