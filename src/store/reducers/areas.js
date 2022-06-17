import { createSlice } from '@reduxjs/toolkit';
import {area} from '../classes';

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
      const areaIndex = state.areaList.findIndex(ar => ar._id === action.payload);
      state.areaList.splice(areaIndex,1);
    },
    update(state, action) {
      const areaIndex = state.areaList.findIndex(ar => ar._id === action.payload.areaId);
      state.areaList[areaIndex] = action.payload.data;
    },
    create(state, action) {
      const newArea = area(action.payload.projectId, action.payload.activityId, action.payload.offset);
      state.areaList.push(newArea);
    }
  },
});

export const areasActions = areasSlice.actions;

export default areasSlice.reducer;