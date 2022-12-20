import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  objetivesList:[]
}


const objetivesSlice = createSlice({
  name: 'objetives',
  initialState,
  reducers: {
    delete(state, action) {
      state.objetivesList = state.objetivesList.filter(obj => obj._id !== action.payload.objetiveId);
    },
    create(state, action) {
      state.objetivesList.push(action.payload);
    },
    update(state, action) {
      const acIndex = state.objetivesList.findIndex(obj => obj._id === action.payload._id);
      state.objetivesList[acIndex]= action.payload;
    },
  },
});

export const objetivesActions = objetivesSlice.actions;

export default objetivesSlice.reducer;