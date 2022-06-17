import { createSlice } from '@reduxjs/toolkit';
import { text, image } from '../classes';


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