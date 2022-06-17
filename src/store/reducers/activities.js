import { createSlice } from '@reduxjs/toolkit';
import {activity} from '../classes';


const initialState = {
  currentActivityId: '1',
  activityList:[]
}


const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    set(state, action) {
      state.activityList = action.payload;
      state.currentActivityId = action.payload[0]._id;
    },
    delete(state, action) {
      const cloneActivityList = [...state.activityList];
      const activityIndex = state.activityList.findIndex(ac => ac._id === action.payload.activityId);
      // If it is the last activity it can not be deleted
      if (cloneActivityList.length>1) cloneActivityList.splice(activityIndex,1);
      state.activityList= cloneActivityList;
      if (action.payload.isSelected) state.currentActivityId = state.activityList[0]._id;
    },
    create(state, action) {
      const cloneActivityList = [...state.activityList];
      const newActivity = activity(action.payload);
      cloneActivityList.push(newActivity);
      state.activityList= cloneActivityList;
      state.currentActivityId = state.activityList[state.activityList.length-1]._id;
    },
    updateCurrent(state, action) {
      state.currentActivityId= action.payload;
    },
  },
});

export const activitiesActions = activitiesSlice.actions;

export default activitiesSlice.reducer;