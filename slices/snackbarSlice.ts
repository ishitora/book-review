import { createSlice } from '@reduxjs/toolkit';

type TSnackbar = {
  open: boolean;
  severity: 'error' | 'info' | 'success' | 'warning';
  autoHideDuration: number;
  message: string;
};

const initialState: TSnackbar = {
  open: false,
  severity: 'error',
  autoHideDuration: 3000,
  message: '',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action) => {
      state = { ...state, ...action.payload, open: true };
      return state;
    },
    closeSnackbar: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
