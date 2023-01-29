import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie, deleteCookie } from 'cookies-next';

import accountServers from '@/servers/accountServers';
import bookServers from '@/servers/bookServers';

import { getReviews } from './reviewsSlice';

import type { TMyBook } from '@/types/book';

export const login = createAsyncThunk(
  'account/login',
  async (
    payload: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    return accountServers
      .login(payload)
      .then((res) => {
        setCookie('token', 'Bearer ' + res?.token);
        dispatch(getReviews());
        return res?.accountData;
      })
      .catch((error) => {
        if (!error.response) {
          throw new Error('發生錯誤');
        }
        return rejectWithValue(error.response.data);
      });
  }
);

export const logout = createAsyncThunk('account/logout', () => {
  deleteCookie('token');
  return;
});

export const getAccount = createAsyncThunk(
  'account/getAccount',
  async (payload: { email: string | null }, { dispatch }) => {
    return accountServers.getAccount().then((res) => {
      dispatch(getReviews());
      return res;
    });
  }
);

export const changeBookshelf = createAsyncThunk(
  'account/changeBookshelf',
  async (payload: { id: string; newStatus: 0 | 1 | 2 }) => {
    return bookServers
      .changeBookshelf(payload.id, payload.newStatus)
      .then((res) => {
        return res;
      });
  }
);

export const removeFromBookshelf = createAsyncThunk(
  'account/removeFromBookshelf',
  async (payload: { id: string }) => {
    return bookServers.removeBook(payload.id).then(() => {
      return { id: payload.id };
    });
  }
);

interface Account {
  isLoading: boolean;
  isLogin: boolean;
  info: {
    name: string;
    myBooks: TMyBook[];
  } | null;
}

const initialState: Account = {
  isLoading: true,
  isLogin: false,
  info: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: (state) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLogin = true;
      state.info = action.payload;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state = initialState;
      return state;
    });

    builder.addCase(getAccount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      state.info = action.payload;
      return state;
    });
    builder.addCase(getAccount.rejected, (state) => {
      state.isLoading = false;
      return state;
    });

    builder.addCase(changeBookshelf.fulfilled, (state, action) => {
      if (state.info) {
        state.info.myBooks = action.payload;
      }
    });

    builder.addCase(removeFromBookshelf.fulfilled, (state, action) => {
      if (state.info) {
        state.info.myBooks = state.info.myBooks.filter(
          (b) => b.book.id !== action.payload.id
        );
      }
    });
  },
});

export default accountSlice.reducer;
