import {Project} from '../classes';

const initialState = {
  currentProject: 1,
  projectList:[
    {
      id: 0,
      userId: 0,
      title: 'Proyecto 1'
    },
    {
      id: 1,
      userId: 0,
      title: 'Proyecto 2'
    },
    {
      id: 2,
      userId: 0,
      title: 'Proyecto 3'
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
  const projectIndex = state.projectList.findIndex(ac => ac.id === projectId);
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
  state.currentProject= projectId;
  return state;
}

const activitiesReducer = (state = initialState, action = {})=>{
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

export {activitiesReducer, deleteProject, createProject, updateCurrentProject};