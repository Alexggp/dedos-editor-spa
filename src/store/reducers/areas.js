import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  areaList: []
}

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    set(state, action) {
      state.areaList = action.payload;
    },
    delete(state, action) {
      state.areaList = state.areaList.filter(ar => ar._id !== action.payload);
    },
    update(state, action) {
      const areaIndex = state.areaList.findIndex(ar => ar._id === action.payload._id);
      state.areaList[areaIndex] = action.payload;
    },
    create(state, action) {
      state.areaList.push(action.payload);
    }
  },
});

export const areasActions = areasSlice.actions;

export default areasSlice.reducer;