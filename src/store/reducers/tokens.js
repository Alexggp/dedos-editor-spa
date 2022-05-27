import { Text, Image } from '../classes';

const initialState = {
  tokenList: [
    {
      id: 4,
      activityId: 0,
      areaId: 1,
      type: 'img',
      offset:{
        x: 10,
        y: 384
      },
      screenOffset:{
        x: 0,
        y: 0
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
      activityId: 0,
      areaId: 0,
      id: 2,
      type: 'img',
      offset:{
        x: 177,
        y: 104
      },
      screenOffset:{
        x: 0,
        y: 0
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
      activityId: 0,
      areaId: 0,
      type: 'txt',
      offset:{
        x: 475,
        y: 506
      },
      screenOffset:{
        x: 0,
        y: 0
      },
      size:{
        w: 458,
        h: 220
      },
      movable: true,
      content:{
        text: 'holita hola holota'
      }
    },
    {
      id: 5,
      activityId: 1,
      areaId: 8,
      type: 'txt',
      offset:{
        x: 475,
        y: 506
      },
      screenOffset:{
        x: 0,
        y: 0
      },
      size:{
        w: 458,
        h: 220
      },
      movable: true,
      content:{
        text: 'testo de la actividad 2'
      }
    }
  ]
}

// Delete Token
const deleteToken = (tokenId) =>{
  return {
    type: "DELETE_TOKEN",
    tokenId: tokenId
  }
}

const deleteTokenInState = (state, tokenId) => {
  const cloneTokenList = [...state.tokenList];
  const tokenIndex = state.tokenList.findIndex(tkn => tkn.id === tokenId);
  cloneTokenList.splice(tokenIndex,1);
  state.tokenList= cloneTokenList;

  return state;
  
}


// Update Token
const updateToken = (tokenId, payload) =>{
  return {
    type: "UPDATE_TOKEN",
    tokenId: tokenId,
    payload: payload
  }
}

const updateTokenInState = (state, tokenId, payload) => {
  const cloneTokenList = [...state.tokenList];
  const tokenIndex = state.tokenList.findIndex(tkn => tkn.id === tokenId);
  cloneTokenList[tokenIndex] = payload;
  state.tokenList= cloneTokenList;
  return state;
}

// Add new Token
const addNewToken = (tokenType, activity, offset) =>{
  return {
    type: "ADD_TOKEN",
    offset: offset,
    tokenType: tokenType,
    activity: activity
  }
}

const addNewTokenInState = (state, tokenType, activity, offset) => {
  const cloneTokenList = [...state.tokenList];
  let newToken;
  if(tokenType==='txt'){
    newToken = new Text(activity, offset);
  } else {
    newToken = new Image(activity, offset);
  }
  cloneTokenList.push(newToken);
  state.tokenList= cloneTokenList;

  return state;
  
}

const tokensReducer = (state = initialState, action = {})=>{
  switch(action.type){
    case 'DELETE_TOKEN':
      return deleteTokenInState(state, action.tokenId);  
    case 'UPDATE_TOKEN':
      return updateTokenInState(state, action.tokenId, action.payload);    
    case 'ADD_TOKEN':
      return addNewTokenInState(state, action.tokenType, action.activity, action.offset);     
    default:
      return {
        ...state
      }
  }
}

export {tokensReducer, deleteToken, updateToken, addNewToken};