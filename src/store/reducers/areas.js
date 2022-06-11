import {Area} from '../classes';

const initialState = {
  areaList: [
    {
      id: 1,
      activityId: 123412340,
      type: 'Player',
      offset:{
        x: 10,
        y: 15
      },
      size:{
        w: 1010,
        h: 792
      }, 
      background: "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31",
    },
    {
      id: 2,
      activityId: 123412340,
      type: 'Player',
      offset:{
        x: 1110,
        y: 15
      },
      size:{
        w: 500,
        h: 500
      }, 
      background: "",
    },
    {
      id: 8,
      activityId: 21234234521,
      type: 'Game',
      offset:{
        x: 10,
        y: 15
      },
      size:{
        w: 800,
        h: 600
      }, 
      background: "",
    }
  ]
}

// Delete Area
const deleteArea = (areaId) =>{
  return {
    type: "DELETE_AREA",
    areaId: areaId
  }
}

const deleteAreaInState = (state, areaId) => {
  const cloneAreaList = [...state.areaList];
  const areaIndex = state.areaList.findIndex(ar => ar.id === areaId);
  cloneAreaList.splice(areaIndex,1);
  state.areaList= cloneAreaList;

  return state;
  
}

// Update Area
const updateArea = (areaId, payload) =>{
  return {
    type: "UPDATE_AREA",
    areaId: areaId,
    payload: payload
  }
}

const updateAreaInState = (state, areaId, payload) => {
  const cloneAreaList = [...state.areaList];
  const areaIndex = state.areaList.findIndex(ar => ar.id === areaId);
  cloneAreaList[areaIndex] = payload;
  state.areaList= cloneAreaList;
  return state;
  
}

// Add new Area
const createArea = (activity, offset) =>{
  return {
    type: "ADD_AREA",
    offset: offset,
    activity: activity
  }
}

const createAreaInState = (state, activity, offset) => {
  const cloneAreaList = [...state.areaList];
  const newArea = new Area(activity, offset);
  cloneAreaList.push(newArea);
  state.areaList= cloneAreaList;

  return state;
  
}

const areasReducer = (state = initialState, action = {})=>{
  switch(action.type){
    case 'DELETE_AREA':
      return deleteAreaInState(state, action.areaId);  
    case 'UPDATE_AREA':
      return updateAreaInState(state, action.areaId, action.payload);
    case 'ADD_AREA':
      return createAreaInState(state, action.activity, action.offset);  
    default:
      return {
        ...state
      }
  }
}
export {areasReducer, deleteArea, createArea, updateArea};