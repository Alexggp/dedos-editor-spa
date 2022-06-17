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
      const cloneProjectList = [...state.projectList];
      const projectIndex = state.projectList.findIndex(pj => pj._id === action.payload);
      cloneProjectList.splice(projectIndex,1);
      state.projectList= cloneProjectList;
    },
    create(state) {
      const cloneProjectList = [...state.projectList];
      const newProject = project();
      cloneProjectList.push(newProject);
      state.projectList= cloneProjectList;
    },
    update(state, action) {
      state.currentProjectId= action.payload;
    },
  },
});

export const projectsActions = projectsSlice.actions;

export default projectsSlice.reducer;