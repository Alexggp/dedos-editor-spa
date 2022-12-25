import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  objetiveId: false
}

const pairingSlice = createSlice({
  name: 'pairing',
  initialState,
  reducers: {
    set(state, action) {
      state.objetiveId= action.payload;
    }
  }
});

export const pairingActions = pairingSlice.actions;

export default pairingSlice.reducer;