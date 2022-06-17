import {Area} from '../classes';

const initialState = {
  areaList: []
}

// Set Areas
const setAreas = (areas) =>{
  return {
    type: "SET_AREAS",
    areas: areas
  }
}

const setAreasInState = (state, areas) => {
  state.areaList = areas;
  return state;
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
  const areaIndex = state.areaList.findIndex(ar => ar._id === areaId);
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
  const areaIndex = state.areaList.findIndex(ar => ar._id === areaId);
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
    case 'SET_AREAS':
      return setAreasInState(state, action.areas);
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
export {areasReducer, setAreas, deleteArea, createArea, updateArea};