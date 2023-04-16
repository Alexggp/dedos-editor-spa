import { createSlice } from '@reduxjs/toolkit';

const languages = ['es', 'en'];
const selectedLang = (navigator.language || navigator.userLanguage).split('-')[0];

const locale = languages.find((item)=>item===selectedLang) ? selectedLang : 'es';


const initialState = {
  user: {
    email: null,
    name: null,
    id: null
  },
  locale: locale,
  token: null
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    unset(state) {
      state.user = initialState.user;
      state.token = initialState.token;
    },
    changeLocale(state, action){
      state.locale = action.payload
    }
  },
});

export const userActions = user.actions;

export default user.reducer;