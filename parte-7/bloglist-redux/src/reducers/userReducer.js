import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../services/user';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } =
  userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersStart());
    try {
      const users = await getAllUsers();
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

export default userSlice.reducer;
