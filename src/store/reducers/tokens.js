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

// Move token
const moveToken = (tokenId, offset) =>{
  return {
    type: "MOVE_TOKEN",
    tokenId: tokenId,
    offset: {
      x: offset.x,
      y: offset.y
    }
  }
}

const moveTokenInState = (state, tokenId, offset) => {

  const cloneTokenList = [...state.tokenList];
  const tokenIndex = state.tokenList.findIndex(tkn => tkn.id === tokenId);
  const cloneToken = {...cloneTokenList[tokenIndex]}

  cloneToken.offset= offset;
  cloneTokenList[tokenIndex] = cloneToken;
  state.tokenList= cloneTokenList;

  return state;
  
}

// Resize token
const resizeToken = (tokenId, size) =>{
  return {
    type: "RESIZE_TOKEN",
    tokenId: tokenId,
    size: {
      w: size.w,
      h: size.h
    }
  }
}

const resizeTokenInState = (state, tokenId, size) => {

  const cloneTokenList = [...state.tokenList];
  const tokenIndex = state.tokenList.findIndex(tkn => tkn.id === tokenId);
  const cloneToken = {...cloneTokenList[tokenIndex]}

  cloneToken.size= size;
  cloneTokenList[tokenIndex] = cloneToken;
  state.tokenList= cloneTokenList;

  return state;
  
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

// Movable Token
const movableToken = (tokenId) =>{
  return {
    type: "MOVABLE_TOKEN",
    tokenId: tokenId
  }
}

const movableTokenInState = (state, tokenId) => {
  const cloneTokenList = [...state.tokenList];
  const tokenIndex = state.tokenList.findIndex(tkn => tkn.id === tokenId);
  const cloneToken = {...cloneTokenList[tokenIndex]}

  cloneToken.movable= !cloneToken.movable;
  cloneTokenList[tokenIndex] = cloneToken;
  state.tokenList= cloneTokenList;

  return state;
  
}

// Update Images
const updateImages = (tokenId, imageList) =>{
  return {
    type: "UPDATE_IMAGES",
    tokenId: tokenId,
    imageList: imageList
  }
}

const updateImagesInState = (state, tokenId, imageList) => {
  const cloneTokenList = [...state.tokenList];
  const tokenIndex = state.tokenList.findIndex(tkn => tkn.id === tokenId);
  const cloneToken = {...cloneTokenList[tokenIndex]}

  cloneToken.content.urlList= imageList;
  cloneTokenList[tokenIndex] = cloneToken;
  state.tokenList= cloneTokenList;

  return state;
  
}

// Update Text
const updateText = (tokenId, text) =>{
  return {
    type: "UPDATE_TEXT",
    tokenId: tokenId,
    text: text
  }
}

const updateTextInState = (state, tokenId, text) => {
  const cloneTokenList = [...state.tokenList];
  const tokenIndex = state.tokenList.findIndex(tkn => tkn.id === tokenId);
  const cloneToken = {...cloneTokenList[tokenIndex]}

  cloneToken.content.text= text;
  cloneTokenList[tokenIndex] = cloneToken;
  state.tokenList= cloneTokenList;

  return state;
  
}


const tokensReducer = (state = initialState, action = {})=>{
  switch(action.type){
    case 'MOVE_TOKEN':
      return moveTokenInState(state, action.tokenId, action.offset);
    case 'RESIZE_TOKEN':
      return resizeTokenInState(state, action.tokenId, action.size);
    case 'DELETE_TOKEN':
      return deleteTokenInState(state, action.tokenId);  
    case 'MOVABLE_TOKEN':
      return movableTokenInState(state, action.tokenId);
    case 'UPDATE_IMAGES':
      return updateImagesInState(state, action.tokenId, action.imageList);
    case 'UPDATE_TEXT':
      return updateTextInState(state, action.tokenId, action.text);        
    default:
      return {
        ...state
      }
  }
}

export {tokensReducer, moveToken, resizeToken, deleteToken, movableToken, updateImages, updateText};