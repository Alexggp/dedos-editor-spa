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
      state.tokenList = state.tokenList.filter(tkn => tkn._id !== action.payload);
    },
    update(state, action) {
      const tokenIndex = state.tokenList.findIndex(tkn => tkn._id === action.payload.tokenId);
      state.tokenList[tokenIndex] = action.payload.data;
    },
    create(state, action) {
      let newToken;
      if(action.payload.type==='txt'){
        newToken = text(action.payload.projectId, action.payload.activityId, action.payload.offset);
      } else {
        newToken = image(action.payload.projectId, action.payload.activityId, action.payload.offset);
      }
      state.tokenList.push(newToken)
    },
  },
});

export const tokensActions = tokensSlice.actions;

export default tokensSlice.reducer;