import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentProjectId: '62a4aae238dd5eedb90821b8',
  projectList:[]
}


const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    set(state, action) {
      state.projectList = action.payload;
    },
    delete(state, action) {
      state.projectList = state.projectList.filter(pj => pj._id !== action.payload);
    },
    create(state, action) {
      state.projectList.push(action.payload);
    },
    update(state, action) {
      const projectIndex = state.projectList.findIndex(pr => pr._id === action.payload._id);
      state.projectList[projectIndex] = action.payload;
    },
    updateCurrent(state, action) {
      state.currentProjectId= action.payload;
    },
  },
});

export const projectsActions = projectsSlice.actions;

export default projectsSlice.reducer;