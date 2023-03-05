import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '@/slices/accountSlice';
import reviewsReducer from '@/slices/reviewsSlice';
import snackbarReducer from '@/slices/snackbarSlice';

const store = configureStore({
  reducer: {
    account: accountReducer,
    reviews: reviewsReducer,
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
