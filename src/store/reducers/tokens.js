import { text, image } from '../classes';

// const initialState = {
//   tokenList: []
// }

// // Set Tokens
// const setTokens = (tokens) =>{
//   return {
//     type: "SET_TOKENS",
//     tokens: tokens
//   }
// }

// const setTokensInState = (state, tokens) => {
//   state.tokenList = tokens;
//   return state;
// }



// // Delete Token
// const deleteToken = (tokenId) =>{
//   return {
//     type: "DELETE_TOKEN",
//     tokenId: tokenId
//   }
// }

// const deleteTokenInState = (state, tokenId) => {
//   const cloneTokenList = [...state.tokenList];
//   const tokenIndex = state.tokenList.findIndex(tkn => tkn._id === tokenId);
//   cloneTokenList.splice(tokenIndex,1);
//   state.tokenList= cloneTokenList;

//   return state;
  
// }


// // Update Token
// const updateToken = (tokenId, payload) =>{
//   return {
//     type: "UPDATE_TOKEN",
//     tokenId: tokenId,
//     payload: payload
//   }
// }

// const updateTokenInState = (state, tokenId, payload) => {
//   const cloneTokenList = [...state.tokenList];
//   const tokenIndex = state.tokenList.findIndex(tkn => tkn._id === tokenId);
//   cloneTokenList[tokenIndex] = payload;
//   state.tokenList= cloneTokenList;
//   return state;
// }

// Add new Token
// const addNewToken = (tokenType, activity, offset) =>{
//   return {
//     type: "ADD_TOKEN",
//     offset: offset,
//     tokenType: tokenType,
//     activity: activity
//   }
// }

// const addNewTokenInState = (state, tokenType, activity, offset) => {
//   const cloneTokenList = [...state.tokenList];
//   let newToken;
//   if(tokenType==='txt'){
//     newToken = new Text(activity, offset);
//   } else {
//     newToken = new Image(activity, offset);
//   }
//   cloneTokenList.push(newToken);
//   state.tokenList= cloneTokenList;

//   return state;
  
// }

// const tokens = (state = initialState, action = {})=>{
//   switch(action.type){
//     case 'SET_TOKENS':
//       return setTokensInState(state, action.tokens);
//     case 'DELETE_TOKEN':
//       return deleteTokenInState(state, action.tokenId);  
//     case 'UPDATE_TOKEN':
//       return updateTokenInState(state, action.tokenId, action.payload);    
//     case 'ADD_TOKEN':
//       return addNewTokenInState(state, action.tokenType, action.activity, action.offset);     
//     default:
//       return {
//         ...state
//       }
//   }
// }

// export {tokens, setTokens, deleteToken, updateToken, addNewToken};


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tokenList: []
}


const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    set(state, action) {
      state.tokenList = action.payload;
    },
    delete(state, action) {
      const cloneTokenList = [...state.tokenList];
      const tokenIndex = state.tokenList.findIndex(tkn => tkn._id === action.payload);
      cloneTokenList.splice(tokenIndex,1);
      state.tokenList= cloneTokenList;
    },
    update(state, action) {
      const cloneTokenList = [...state.tokenList];
      const tokenIndex = state.tokenList.findIndex(tkn => tkn._id === action.payload.tokenId);
      cloneTokenList[tokenIndex] = action.payload.data;
      state.tokenList= cloneTokenList;
    },
    create(state, action) {
      // const cloneTokenList = [...state.tokenList];
      let newToken;
      if(action.payload.type==='txt'){
        newToken = text(action.payload.projectId, action.payload.activityId, action.payload.offset);
      } else {
        newToken = image(action.payload.projectId, action.payload.activityId, action.payload.offset);
      }
      // cloneTokenList.push(newToken);
      // state.tokenList= cloneTokenList;
      state.tokenList.push(newToken)
    },
  },
});

export const tokensActions = tokensSlice.actions;

export default tokensSlice.reducer;