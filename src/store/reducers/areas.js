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
      const cloneAreaList = [...state.areaList];
      const areaIndex = state.areaList.findIndex(ar => ar._id === action.payload);
      cloneAreaList.splice(areaIndex,1);
      state.areaList= cloneAreaList;
    },
    update(state, action) {
      const cloneAreaList = [...state.areaList];
      const areaIndex = state.areaList.findIndex(ar => ar._id === action.payload.areaId);
      cloneAreaList[areaIndex] = action.payload.data;
      state.areaList= cloneAreaList;
    },
    create(state, action) {
      const cloneAreaList = [...state.areaList];
      const newArea = area(action.payload.projectId, action.payload.activityId, action.payload.offset);
      cloneAreaList.push(newArea);
      state.areaList= cloneAreaList;
    }
  },
});

export const areasActions = areasSlice.actions;

export default areasSlice.reducer;