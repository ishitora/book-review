import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reviewServers from '@/servers/reviewServers';

export const getReviews = createAsyncThunk('review/getReviews', async () => {
  return reviewServers.getMyReviews().then((res) => {
    const reviewsMap = {};
    res.forEach(
      ({ title, reference, rating, content, likes, create_date, id }) => {
        reviewsMap[reference] = {
          create_date,
          title,
          rating,
          content,
          likes,
          id,
        };
      }
    );
    return reviewsMap;
  });
});

const initialState = {};

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

export default reviewsSlice.reducer;
