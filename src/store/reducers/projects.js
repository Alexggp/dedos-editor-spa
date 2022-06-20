import { createSlice } from '@reduxjs/toolkit';
import {project} from '../classes';

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
    create(state) {
      const newProject = project();
      state.projectList.push(newProject);
    },
    updateCurrent(state, action) {
      state.currentProjectId= action.payload;
    },
  },
});

export const projectsActions = projectsSlice.actions;

export default projectsSlice.reducer;