import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    toast: {
      show: false,
      message: '',
      type: 'info' // info, success, error, warning
    },
    modal: {
      show: false,
      type: null,
      data: null
    },
    loading: false
  },
  reducers: {
    showToast: (state, action) => {
      state.toast = {
        show: true,
        message: action.payload.message,
        type: action.payload.type || 'info'
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },
    showModal: (state, action) => {
      state.modal = {
        show: true,
        type: action.payload.type,
        data: action.payload.data
      };
    },
    hideModal: (state) => {
      state.modal = {
        show: false,
        type: null,
        data: null
      };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { showToast, hideToast, showModal, hideModal, setLoading } = uiSlice.actions;
export default uiSlice.reducer;