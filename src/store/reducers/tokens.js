import { Text, Image } from '../classes';

const initialState = {
  tokenList: []
}

// Set Tokens
const setTokens = (tokens) =>{
  return {
    type: "SET_TOKENS",
    tokens: tokens
  }
}

const setTokensInState = (state, tokens) => {
  state.tokenList = tokens;
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
  const tokenIndex = state.tokenList.findIndex(tkn => tkn._id === tokenId);
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
  const tokenIndex = state.tokenList.findIndex(tkn => tkn._id === tokenId);
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
    case 'SET_TOKENS':
      return setTokensInState(state, action.tokens);
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

export {tokensReducer, setTokens, deleteToken, updateToken, addNewToken};