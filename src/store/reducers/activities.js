import { createSlice } from '@reduxjs/toolkit';


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
      state.currentActivityId = action.payload[0] ? action.payload[0]._id : '';
    },
    delete(state, action) {
      // If it is the last activity it can not be deleted
      if (state.activityList.length>1) state.activityList = state.activityList.filter(ac => ac._id !== action.payload.activityId);
      if (action.payload.isSelected) state.currentActivityId = state.activityList[0]._id;
    },
    create(state, action) {
      state.activityList.push(action.payload);
      state.currentActivityId = state.activityList[state.activityList.length-1]._id;
    },
    updateCurrent(state, action) {
      state.currentActivityId= action.payload;
    },
  },
});

export const activitiesActions = activitiesSlice.actions;

export default activitiesSlice.reducer;