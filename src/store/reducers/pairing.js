import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  origin: false
}

const pairingSlice = createSlice({
  name: 'pairing',
  initialState,
  reducers: {
    toggle(state, action) {
      state.origin= action.payload;
    }
  }
});

export const pairingActions = pairingSlice.actions;

export default pairingSlice.reducer;