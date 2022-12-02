import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set(state, action) {
      state.user = action.payload;
    },
    unset(state) {
      state.user = null;
    },
  },
});

export const userActions = user.actions;

export default user.reducer;