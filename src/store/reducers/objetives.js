import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  objetivesList:[]
}


const objetivesSlice = createSlice({
  name: 'objetives',
  initialState,
  reducers: {
    set(state, action) {
      state.objetivesList = action.payload;
    },
    delete(state, action) {
      state.objetivesList = state.objetivesList.filter(obj => obj._id !== action.payload);
    },
    create(state, action) {
      state.objetivesList.push(action.payload);
    },
    update(state, action) {
      const objIndex = state.objetivesList.findIndex(obj => obj._id === action.payload._id);
      state.objetivesList[objIndex]= action.payload;
    },
    mark(state, action){
      const objIndex = state.objetivesList.findIndex(obj => obj._id === action.payload.objetiveId);
      state.objetivesList[objIndex]['marked']= action.payload.value;
    }
  },
});

export const objetivesActions = objetivesSlice.actions;

export default objetivesSlice.reducer;