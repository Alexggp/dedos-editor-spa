const initialState = {
  stages:[
    {
      itemList: [
        {
          type: 'zone',
          offset:{
            x: 10,
            y: 15
          },
          size:{
            w: 1010,
            h: 792
          }
        },
        {
          type: 'image',
          offset:{
            x: 177,
            y: 104
          },
          size:{
            w: 300,
            h: 200
          }
        },
        {
          type: 'text',
          offset:{
            x: 475,
            y: 506
          },
          size:{
            w: 458,
            h: 220
          }
        }
      ]
    },
    {
      itemList: [
        {
          type: 'zone',
          offset:{
            x: 50,
            y: 30
          },
          size:{
            w: 800,
            h: 700
          }
        }
      ]
    }
  ]
}


const moveItem = (stageIndex, itemIndex, offset) =>{
  return {
    type: "MOVE_ITEM",
    stageIndex: stageIndex,
    itemIndex: itemIndex,
    offset: {
      x: offset.x,
      y: offset.y
    }
  }
}

const moveItemInState = (state, stageIndex, itemIndex, offset) => {

  const cloneItemList = [...state.stages[stageIndex].itemList];
  cloneItemList[itemIndex].offset= offset;
  state.stages[stageIndex].itemList = cloneItemList;
  return state;
  
}

const resizeItem = (stageIndex, itemIndex, size) =>{
  return {
    type: "RESIZE_ITEM",
    stageIndex: stageIndex,
    itemIndex: itemIndex,
    size: {
      // removing px at the end and transfroming it in to an integer
      w: Number(size.w.replace('px', '')),
      h: Number(size.h.replace('px', ''))
    }
  }
}

const resizeItemInState = (state, stageIndex, itemIndex, size) => {
  const cloneItemList = [...state.stages[stageIndex].itemList];
  cloneItemList[itemIndex].size= size;
  state.stages[stageIndex].itemList = cloneItemList;
  return state;
  
}


const createItem = (stageIndex, item, offset) => {

  const itemType = ()=>{ switch(item){
    case 'AddZone':
      return 'zone';
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
    stageIndex: stageIndex,
    payload:{
      type: itemType(),
      offset: {
        x: offset.x-180,
        y: offset.y-100
      }
    }
  }
}

const addItemToState = (state, stageIndex, {type, offset})=>{

  const cloneItemList = [...state.stages[stageIndex].itemList]
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
      }
    }
  );
  state.stages[stageIndex].itemList = cloneItemList;
  return state;
}

const stagesReducer = (state = initialState, action = {})=>{
  switch(action.type){
    case 'CREATE_ITEM':
      return addItemToState(state, action.stageIndex, action.payload);
    case 'MOVE_ITEM':
      return moveItemInState(state, action.stageIndex, action.itemIndex, action.offset);
    case 'RESIZE_ITEM':
      return resizeItemInState(state, action.stageIndex, action.itemIndex, action.size);
    default:
      return {
        ...state
      }
  }
}

export {stagesReducer, createItem, moveItem, resizeItem};