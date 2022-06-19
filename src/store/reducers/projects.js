import { createSlice } from '@reduxjs/toolkit';
import {project} from '../classes';

const initialState = {
  currentProjectId: '62a4aae238dd5eedb90821b8',
  projectList:[
    {
      _Id: '62a4aae238dd5eedb90821b8',
      userId: 0,
      title: 'Proyecto 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ]
}


const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    delete(state, action) {
      state.projectList = state.projectList.filter(pj => pj._Id !== action.payload);
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