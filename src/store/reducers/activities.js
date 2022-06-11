import {Activity} from '../classes';

const initialState = {
  currentActivityId: 3444442,
  activityList:[
    {
      id: 123412340,
      projectId: 0
    },
    {
      id: 21234234521,
      projectId: 0
    },
    {
      id: 3444442,
      projectId: 0
    }
  ]
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
  cloneActivityList.splice(activityIndex,1);
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

export {activitiesReducer, deleteActivity, createActivity, updatecurrentActivityId};