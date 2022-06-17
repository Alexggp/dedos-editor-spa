import {Project} from '../classes';

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

// Delete Project
const deleteProject = (projectId) =>{
  return {
    type: "DELETE_PROJECT",
    projectId: projectId
  }
}

const deleteProjectInState = (state, projectId) => {
  const cloneProjectList = [...state.projectList];
  const projectIndex = state.projectList.findIndex(pj => pj._id === projectId);
  cloneProjectList.splice(projectIndex,1);
  state.projectList= cloneProjectList;
  return state;
}

// Add new Project
const createProject = (project) =>{
  return {
    type: "ADD_PROJECT",
    project: project
  }
}

const createProjectInState = (state) => {
  const cloneProjectList = [...state.projectList];
  const newProject = new Project();
  cloneProjectList.push(newProject);
  state.projectList= cloneProjectList;

  return state;
  
}

// Update Current Project
const updateCurrentProject = (projectId) =>{
  return {
    type: "UPDATE_CURRENT_PROJECT",
    projectId: projectId
  }
}

const updateCurrentProjectInState = (state, projectId) => {
  state.currentProjectId= projectId;
  return state;
}

const projectsReducer = (state = initialState, action = {})=>{
  switch(action.type){
    case 'DELETE_PROJECT':
      return deleteProjectInState(state, action.projectId);   
    case 'ADD_PROJECT':
      return createProjectInState(state); 
    case 'UPDATE_CURRENT_PROJECT':
      return updateCurrentProjectInState(state, action.projectId);
    default:
      return {
        ...state
      }
  }
}

export {projectsReducer, deleteProject, createProject, updateCurrentProject};