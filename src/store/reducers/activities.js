const initialState = {
  currentActivity: 0,
  activities:[
    {id: 0},
    {id: 1}
  ]
}


const moveItem = (activityIndex, itemId, offset) =>{
  return {
    type: "MOVE_ITEM",
    activityIndex: activityIndex,
    itemId: itemId,
    offset: {
      x: offset.x,
      y: offset.y
    }
  }
}

const moveItemInState = (state, activityIndex, itemId, offset) => {

  // const cloneItemList = [...state.activities[activityIndex].tokenList];
  // cloneItemList[itemIndex].offset= offset;
  // state.activities[activityIndex].tokenList = cloneItemList;



  return state;
  
}

const resizeItem = (activityIndex, itemIndex, size) =>{
  return {
    type: "RESIZE_ITEM",
    activityIndex: activityIndex,
    itemIndex: itemIndex,
    size: {
      // removing px at the end and transfroming it in to an integer
      w: Number(size.w.replace('px', '')),
      h: Number(size.h.replace('px', ''))
    }
  }
}

const resizeItemInState = (state, activityIndex, itemIndex, size) => {
  const cloneItemList = [...state.activities[activityIndex].tokenList];
  cloneItemList[itemIndex].size= size;
  state.activities[activityIndex].tokenList = cloneItemList;
  return state;
  
}


const createItem = (activityIndex, item, offset) => {

  const itemType = ()=>{ 
    switch(item){
      case 'AddArea':
        return 'area';
      case 'AddImage':
        return 'image';
      case 'AddText':
        return 'text'
      default:
        return null 
    }
  }

  return {
    type: "CREATE_ITEM",
    activityIndex: activityIndex,
    payload:{
      type: itemType(),
      offset: {
        x: offset.x-180,
        y: offset.y-100
      }
    }
  }
}

const addItemToState = (state, activityIndex, {type, offset})=>{

  const cloneItemList = [...state.activities[activityIndex].tokenList]
  cloneItemList.push(
    {
      type: type,
      offset:{
        x: offset.x,
        y: offset.y
      },
      size:{
        w: 360,
        h: 240
      },
      props:{}
    }
  );
  state.activities[activityIndex].tokenList = cloneItemList;
  return state;
}

const changeItemProps  = (activityIndex, itemIndex, props) =>{
  return {
    type: "CHANGE_ITEM_PROPS",
    activityIndex: activityIndex,
    itemIndex: itemIndex,
    props: props
  }
}

const changeItemPropsInState = (state, activityIndex, itemIndex, props) => {
  const cloneItemList = [...state.activities[activityIndex].tokenList];
  const cloneItemPops = {...cloneItemList[itemIndex].props, ...props}
  cloneItemList[itemIndex].props= cloneItemPops;
  state.activities[activityIndex].tokenList = cloneItemList;
  return state;
  
}

const deleteItem  = (activityIndex, itemIndex) =>{
  return {
    type: "DELETE_ITEM",
    activityIndex: activityIndex,
    itemIndex: itemIndex,
  }
}

const deleteItemInState = (state, activityIndex, itemIndex) => {
  const cloneItemList = [...state.activities[activityIndex].tokenList];
  cloneItemList.splice(itemIndex,1);
  state.activities[activityIndex].tokenList = cloneItemList;
  return state;
  
}

const activitiesReducer = (state = initialState, action = {})=>{
  switch(action.type){
    case 'CREATE_ITEM':
      return addItemToState(state, action.activityIndex, action.payload);
    case 'MOVE_ITEM':
      return moveItemInState(state, action.activityIndex, action.itemId, action.offset);
    case 'RESIZE_ITEM':
      return resizeItemInState(state, action.activityIndex, action.itemIndex, action.size);
    case 'CHANGE_ITEM_PROPS':
      return changeItemPropsInState(state, action.activityIndex, action.itemIndex, action.props);
    case 'DELETE_ITEM':
      return deleteItemInState(state, action.activityIndex, action.itemIndex);
    default:
      return {
        ...state
      }
  }
}

export {activitiesReducer, createItem, moveItem, resizeItem, changeItemProps, deleteItem};