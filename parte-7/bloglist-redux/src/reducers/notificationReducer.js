import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: '', // 'success' | 'error' | 'info'
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    clearNotification() {
      return '';
    },
  },
});

export const { setMessage, clearNotification } = notificationSlice.actions;

export const setNotification = (message, type = 'info', seconds = 5) => {
  return async (dispatch) => {
    dispatch(setMessage({ message, type }));

    setTimeout(() => {
      dispatch(clearNotification());
    }, 1000 * seconds);
  };
};

export default notificationSlice.reducer;
