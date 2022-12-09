import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '@/slices/accountSlice';
import reviewsReducer from '@/slices/reviewsSlice';
const store = configureStore({
  reducer: {
    account: accountReducer,
    reviews: reviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
