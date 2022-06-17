import {project} from '../classes';



// // Delete Project
// const deleteProject = (projectId) =>{
//   return {
//     type: "DELETE_PROJECT",
//     projectId: projectId
//   }
// }

// const deleteProjectInState = (state, projectId) => {
//   const cloneProjectList = [...state.projectList];
//   const projectIndex = state.projectList.findIndex(pj => pj._id === projectId);
//   cloneProjectList.splice(projectIndex,1);
//   state.projectList= cloneProjectList;
//   return state;
// }

// Add new Project
// const createProject = (project) =>{
//   return {
//     type: "ADD_PROJECT",
//     project: project
//   }
// }

// const createProjectInState = (state) => {
//   const cloneProjectList = [...state.projectList];
//   const newProject = new Project();
//   cloneProjectList.push(newProject);
//   state.projectList= cloneProjectList;

//   return state;
  
// }

// Update Current Project
// const updateCurrentProject = (projectId) =>{
//   return {
//     type: "UPDATE_CURRENT_PROJECT",
//     projectId: projectId
//   }
// }

// const updateCurrentProjectInState = (state, projectId) => {
//   state.currentProjectId= projectId;
//   return state;
// }

// const projects = (state = initialState, action = {})=>{
//   switch(action.type){
//     case 'DELETE_PROJECT':
//       return deleteProjectInState(state, action.projectId);   
//     case 'ADD_PROJECT':
//       return createProjectInState(state); 
//     case 'UPDATE_CURRENT_PROJECT':
//       return updateCurrentProjectInState(state, action.projectId);
//     default:
//       return {
//         ...state
//       }
//   }
// }

// export {projects, deleteProject, createProject, updateCurrentProject};


import { createSlice } from '@reduxjs/toolkit';

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