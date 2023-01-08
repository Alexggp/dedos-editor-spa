import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  currentActivityId: '',
  activityList:[]
}


const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    set(state, action) {
      state.activityList = action.payload;
    },
    delete(state, action) {
      state.activityList = state.activityList.filter(ac => ac._id !== action.payload.activityId);
      if (action.payload.isSelected) state.currentActivityId = state.activityList[state.activityList.length-1]._id;
    },
    create(state, action) {
      state.activityList.push(action.payload);
      state.currentActivityId = state.activityList[state.activityList.length-1]._id;
    },
    updateCurrent(state, action) {
      console.log(action.payload)
      state.currentActivityId= action.payload;
    },
    update(state, action) {
      const acIndex = state.activityList.findIndex(ac => ac._id === action.payload._id);
      state.activityList[acIndex]= action.payload;
    },
  },
});

export const activitiesActions = activitiesSlice.actions;

export default activitiesSlice.reducer;