import {Activity} from '../classes';

const initialState = {
  currentActivity: 1,
  activityList:[
    {
      id: 0,
      projectId: 0
    },
    {
      id: 1,
      projectId: 0
    },
    {
      id: 2,
      projectId: 0
    }
  ]
}

// Delete Activity
const deleteActivity = (activityId) =>{
  return {
    type: "DELETE_ACTIVITY",
    activityId: activityId
  }
}

const deleteActivityInState = (state, activityId) => {
  const cloneActivityList = [...state.activityList];
  const activityIndex = state.activityList.findIndex(ac => ac.id === activityId);
  cloneActivityList.splice(activityIndex,1);
  state.activityList= cloneActivityList;
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

  return state;
  
}

// Update Current Activity
const updateCurrentActivity = (activityId) =>{
  return {
    type: "UPDATE_CURRENT_ACTIVITY",
    activityId: activityId
  }
}

const updateCurrentActivityInState = (state, activityId) => {
  state.currentActivity= activityId;
  return state;
}

const activitiesReducer = (state = initialState, action = {})=>{
  switch(action.type){
    case 'DELETE_ACTIVITY':
      return deleteActivityInState(state, action.activityId);   
    case 'ADD_ACTIVITY':
      return createActivityInState(state); 
    case 'UPDATE_CURRENT_ACTIVITY':
      return updateCurrentActivityInState(state, action.activityId);
    default:
      return {
        ...state
      }
  }
}

export {activitiesReducer, deleteActivity, createActivity, updateCurrentActivity};