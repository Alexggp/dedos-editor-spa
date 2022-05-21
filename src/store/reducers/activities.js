const initialState = {
  activities:[
    {
      objectives:[],
      areaList:[
        {
          id: 1,
          type: 'Player',
          offset:{
            x: 10,
            y: 15
          },
          size:{
            w: 1010,
            h: 792
          }, 
          background: "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31"     ,
          tokenList: []
        }
      ],
      tokenList: [
        {
          id: 2,
          type: 'img',
          offset:{
            x: 177,
            y: 104
          },
          size:{
            w: 300,
            h: 200
          },
          movable: true,
          content:{
            urlList:[
              "https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png",
              "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31"
            ]
          }
        },
        {
          id: 3,
          type: 'txt',
          offset:{
            x: 475,
            y: 506
          },
          size:{
            w: 458,
            h: 220
          },
          movable: true,
          content:{
            text: 'holita hola holota'
          }
        }
      ]
    },
    {
      tokenList: [
        {
          type: 'area',
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


const moveItem = (activityIndex, itemIndex, offset) =>{
  return {
    type: "MOVE_ITEM",
    activityIndex: activityIndex,
    itemIndex: itemIndex,
    offset: {
      x: offset.x,
      y: offset.y
    }
  }
}

const moveItemInState = (state, activityIndex, itemIndex, offset) => {

  const cloneItemList = [...state.activities[activityIndex].tokenList];
  cloneItemList[itemIndex].offset= offset;
  state.activities[activityIndex].tokenList = cloneItemList;
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
      return moveItemInState(state, action.activityIndex, action.itemIndex, action.offset);
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