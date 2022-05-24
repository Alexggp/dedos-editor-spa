import {Area} from '../classes';

const initialState = {
  areaList: [
    {
      id: 1,
      activityId: 0,
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
      id: 8,
      activityId: 1,
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

// Move area
const moveArea = (areaId, offset) =>{
  return {
    type: "MOVE_AREA",
    areaId: areaId,
    offset: {
      x: offset.x,
      y: offset.y
    }
  }
}

const moveAreaInState = (state, areaId, offset) => {

  const cloneAreaList = [...state.areaList];
  const areaIndex = state.areaList.findIndex(ar => ar.id === areaId);
  const cloneArea = {...cloneAreaList[areaIndex]}

  cloneArea.offset= offset;
  cloneAreaList[areaIndex] = cloneArea;
  state.areaList= cloneAreaList;

  return state;
  
}

// Resize area
const resizeArea = (areaId, size) =>{
  return {
    type: "RESIZE_AREA",
    areaId: areaId,
    size: {
      w: size.w,
      h: size.h
    }
  }
}

const resizeAreaInState = (state, areaId, size) => {

  const cloneAreaList = [...state.areaList];
  const areaIndex = state.areaList.findIndex(ar => ar.id === areaId);
  const cloneArea = {...cloneAreaList[areaIndex]}

  cloneArea.size= size;
  cloneAreaList[areaIndex] = cloneArea;
  state.areaList= cloneAreaList;

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
  const areaIndex = state.areaList.findIndex(ar => ar.id === areaId);
  cloneAreaList.splice(areaIndex,1);
  state.areaList= cloneAreaList;

  return state;
  
}

// Type Area
const typeArea = (areaId) =>{
  return {
    type: "TYPE_AREA",
    areaId: areaId
  }
}

const typeAreaInState = (state, areaId) => {
  const cloneAreaList = [...state.areaList];
  const areaIndex = state.areaList.findIndex(ar => ar.id === areaId);
  const cloneArea = {...cloneAreaList[areaIndex]}

  cloneArea.type= (cloneArea.type === 'Game') ? 'Player' : 'Game';
  cloneAreaList[areaIndex] = cloneArea;
  state.areaList= cloneAreaList;

  return state;
  
}

// Background Area
const backgroundArea = (areaId, url) =>{
  return {
    type: "BACKGROUND_AREA",
    areaId: areaId,
    url: url
  }
}

const backgroundAreaInState = (state, areaId, url) => {
  const cloneAreaList = [...state.areaList];
  const areaIndex = state.areaList.findIndex(ar => ar.id === areaId);
  const cloneArea = {...cloneAreaList[areaIndex]}

  cloneArea.background= url;
  cloneAreaList[areaIndex] = cloneArea;
  state.areaList= cloneAreaList;

  return state;
  
}

// Add new Area
const addNewArea = (activity, offset) =>{
  return {
    type: "ADD_AREA",
    offset: offset,
    activity: activity
  }
}

const addNewAreaInState = (state, activity, offset) => {
  console.log(offset);
  const cloneAreaList = [...state.areaList];
  const newArea = new Area(activity, offset);
  cloneAreaList.push(newArea);
  state.areaList= cloneAreaList;

  return state;
  
}

const areasReducer = (state = initialState, action = {})=>{
  switch(action.type){
    case 'MOVE_AREA':
      return moveAreaInState(state, action.areaId, action.offset);
    case 'RESIZE_AREA':
      return resizeAreaInState(state, action.areaId, action.size);
    case 'DELETE_AREA':
      return deleteAreaInState(state, action.areaId);  
    case 'TYPE_AREA':
      return typeAreaInState(state, action.areaId);
    case 'BACKGROUND_AREA':
      return backgroundAreaInState(state, action.areaId, action.url);
    case 'ADD_AREA':
      return addNewAreaInState(state, action.activity, action.offset);  
    default:
      return {
        ...state
      }
  }
}
export {areasReducer, moveArea, resizeArea, deleteArea, typeArea, backgroundArea, addNewArea};