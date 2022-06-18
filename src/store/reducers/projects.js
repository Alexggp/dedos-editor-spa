import { createSlice } from '@reduxjs/toolkit';
import {project} from '../classes';

const initialState = {
  currentProjectId: '62a4aae238dd5eedb90821b8',
  projectList:[
    {
      id: '62a4aae238dd5eedb90821b8',
      userId: 0,
      title: 'Proyecto 1'
    }
  ]
}


const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    delete(state, action) {
      state.projectList = state.projectList.filter(pj => pj._id !== action.payload);
    },
    create(state) {
      const newProject = project();
      state.projectList.push(newProject);
    },
    update(state, action) {
      state.currentProjectId= action.payload;
    },
  },
});

export const projectsActions = projectsSlice.actions;

export default projectsSlice.reducer;