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
      state.tokenList = state.tokenList.filter(tkn => tkn._id !== action.payload);
    },
    update(state, action) {
      const tokenIndex = state.tokenList.findIndex(tkn => tkn._id === action.payload._id);
      state.tokenList[tokenIndex] = action.payload;
    },
    create(state, action) {
      state.tokenList.push(action.payload)
    },
  },
});

export const tokensActions = tokensSlice.actions;

export default tokensSlice.reducer;