import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  toast: {
    show: false,
    message: '',
    type: 'info' // 'success', 'error', 'info'
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    showToast: (state, action) => {
      state.toast = {
        show: true,
        message: action.payload.message,
        type: action.payload.type || 'info'
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    }
  }
});

export const { setLoading, setError, showToast, hideToast } = uiSlice.actions;

export default uiSlice.reducer;