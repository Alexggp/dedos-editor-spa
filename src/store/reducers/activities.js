import {Activity} from '../classes';

const initialState = {
  currentActivityId: '1',
  activityList:[]
}

// Set Activities
const setActivities = (activities) =>{
  return {
    type: "SET_ACTIVITIES",
    activities: activities
  }
}

const setActivitiesInState = (state, activities) => {
  state.activityList = activities;
  state.currentActivityId = activities[0]._id;
  return state;
}

// Delete Activity
const deleteActivity = (activityId, isSelected) =>{
  return {
    type: "DELETE_ACTIVITY",
    activityId: activityId,
    isSelected: isSelected
  }
}

const deleteActivityInState = (state, activityId, isSelected) => {
  const cloneActivityList = [...state.activityList];
  const activityIndex = state.activityList.findIndex(ac => ac.id === activityId);
  // If it is the last activity it can not be deleted
  if (cloneActivityList.length>1) cloneActivityList.splice(activityIndex,1);
  state.activityList= cloneActivityList;
  if (isSelected) state.currentActivityId = state.activityList[0].id;
  return state;
}

// Add new Activity
const createActivity = (activity) =>{
  return {
    type: "ADD_ACTIVITY",
    activity: activity
  }
}

const createActivityInState = (state) => {
  const cloneActivityList = [...state.activityList];
  const newActivity = new Activity();
  cloneActivityList.push(newActivity);
  state.activityList= cloneActivityList;
  state.currentActivityId = state.activityList[state.activityList.length-1].id;
  return state;
  
}

// Update Current Activity
const updatecurrentActivityId = (activityId) =>{
  return {
    type: "UPDATE_CURRENT_ACTIVITY",
    activityId: activityId
  }
}

const updatecurrentActivityIdInState = (state, activityId) => {
  state.currentActivityId= activityId;
  return state;
}

const activitiesReducer = (state = initialState, action = {})=>{
  switch(action.type){
    case 'SET_ACTIVITIES':
      return setActivitiesInState(state, action.activities);
    case 'DELETE_ACTIVITY':
      return deleteActivityInState(state, action.activityId, action.isSelected);   
    case 'ADD_ACTIVITY':
      return createActivityInState(state); 
    case 'UPDATE_CURRENT_ACTIVITY':
      return updatecurrentActivityIdInState(state, action.activityId);
    default:
      return {
        ...state
      }
  }
}

export {activitiesReducer, setActivities, deleteActivity, createActivity, updatecurrentActivityId};