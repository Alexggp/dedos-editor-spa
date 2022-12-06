import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: null,
    name: null,
    id: null
  },
  token: null
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    unset(state) {
      state.user = initialState.user;
      state.token = initialState.token;
    },
  },
});

export const userActions = user.actions;

export default user.reducer;