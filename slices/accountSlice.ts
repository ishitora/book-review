import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/utils/store';
import { setCookie } from 'cookies-next';
import accountServers from '@/servers/accountServers';

export const signup = createAsyncThunk(
  'account/signup',
  async (payload: object) => {
    return accountServers.signup(payload);
  }
);

export const login = createAsyncThunk(
  'account/login',
  async (payload: object) => {
    return accountServers.login(payload).then((res) => {
      setCookie('token', 'Bearer ' + res?.token);
      return res?.accountData;
    });
  }
);

export const getAccount = createAsyncThunk('account/getAccount', async () => {
  return accountServers.getAccount();
});

interface Account {
  isLogin: boolean;
  info: any;
}

const initialState: Account = {
  isLogin: false,
  info: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.info = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.isLogin = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLogin = true;
      state.info = action.payload;
    });

    builder.addCase(getAccount.fulfilled, (state, action) => {
      state.isLogin = true;
      state.info = action.payload;
    });
  },
});

export const { logout } = accountSlice.actions;

export default accountSlice.reducer;
