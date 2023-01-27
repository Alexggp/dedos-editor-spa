import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: 0,
  message: ''
}

const globalErrorSlice = createSlice({
  name: 'globalError',
  initialState,
  reducers: {
    set(state, action) {
      state.error= action.payload.error;
      state.message= action.payload.message
    },
    uneset(state){
      state.error= false;
      state.message= ''
    }
  }
});

export const globalErrorActions = globalErrorSlice.actions;

export default globalErrorSlice.reducer;