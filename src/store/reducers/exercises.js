const initialState = {
  exercises:[
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
          }, 
          props:{
            background: "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31"
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
          },
          props:{
            images:[
              "https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png",
              "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31"
            ]
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
          },
          props:{}
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
          },
          props:{}
        }
      ]
    }
  ]
}


const moveItem = (exerciseIndex, itemIndex, offset) =>{
  return {
    type: "MOVE_ITEM",
    exerciseIndex: exerciseIndex,
    itemIndex: itemIndex,
    offset: {
      x: offset.x,
      y: offset.y
    }
  }
}

const moveItemInState = (state, exerciseIndex, itemIndex, offset) => {

  const cloneItemList = [...state.exercises[exerciseIndex].itemList];
  cloneItemList[itemIndex].offset= offset;
  state.exercises[exerciseIndex].itemList = cloneItemList;
  return state;
  
}

const resizeItem = (exerciseIndex, itemIndex, size) =>{
  return {
    type: "RESIZE_ITEM",
    exerciseIndex: exerciseIndex,
    itemIndex: itemIndex,
    size: {
      // removing px at the end and transfroming it in to an integer
      w: Number(size.w.replace('px', '')),
      h: Number(size.h.replace('px', ''))
    }
  }
}

const resizeItemInState = (state, exerciseIndex, itemIndex, size) => {
  const cloneItemList = [...state.exercises[exerciseIndex].itemList];
  cloneItemList[itemIndex].size= size;
  state.exercises[exerciseIndex].itemList = cloneItemList;
  return state;
  
}


const createItem = (exerciseIndex, item, offset) => {

  const itemType = ()=>{ 
    switch(item){
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
    exerciseIndex: exerciseIndex,
    payload:{
      type: itemType(),
      offset: {
        x: offset.x-180,
        y: offset.y-100
      }
    }
  }
}

const addItemToState = (state, exerciseIndex, {type, offset})=>{

  const cloneItemList = [...state.exercises[exerciseIndex].itemList]
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
  state.exercises[exerciseIndex].itemList = cloneItemList;
  return state;
}

const changeItemProps  = (exerciseIndex, itemIndex, props) =>{
  return {
    type: "CHANGE_ITEM_PROPS",
    exerciseIndex: exerciseIndex,
    itemIndex: itemIndex,
    props: props
  }
}

const changeItemPropsInState = (state, exerciseIndex, itemIndex, props) => {
  const cloneItemList = [...state.exercises[exerciseIndex].itemList];
  cloneItemList[itemIndex].props= props;
  state.exercises[exerciseIndex].itemList = cloneItemList;
  return state;
  
}

const deleteItem  = (exerciseIndex, itemIndex) =>{
  return {
    type: "DELETE_ITEM",
    exerciseIndex: exerciseIndex,
    itemIndex: itemIndex,
  }
}

const deleteItemInState = (state, exerciseIndex, itemIndex) => {
  const cloneItemList = [...state.exercises[exerciseIndex].itemList];
  cloneItemList.splice(itemIndex,1);
  state.exercises[exerciseIndex].itemList = cloneItemList;
  return state;
  
}

const exercisesReducer = (state = initialState, action = {})=>{
  switch(action.type){
    case 'CREATE_ITEM':
      return addItemToState(state, action.exerciseIndex, action.payload);
    case 'MOVE_ITEM':
      return moveItemInState(state, action.exerciseIndex, action.itemIndex, action.offset);
    case 'RESIZE_ITEM':
      return resizeItemInState(state, action.exerciseIndex, action.itemIndex, action.size);
    case 'CHANGE_ITEM_PROPS':
      return changeItemPropsInState(state, action.exerciseIndex, action.itemIndex, action.props);
    case 'DELETE_ITEM':
      return deleteItemInState(state, action.exerciseIndex, action.itemIndex);
    default:
      return {
        ...state
      }
  }
}

export {exercisesReducer, createItem, moveItem, resizeItem, changeItemProps, deleteItem};