import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActive: false
}

const trashSlice = createSlice({
  name: 'trash',
  initialState,
  reducers: {
    toggle(state, action) {
      state.isActive= !!action.payload;
    }
  }
});

export const trashActions = trashSlice.actions;

export default trashSlice.reducer;