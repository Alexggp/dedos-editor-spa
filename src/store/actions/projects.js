import dedosInstance from '../../apis/dedosInstance';
import { project } from '../classes';
import { projectsActions } from '../reducers/projects';
import { activitiesActions } from '../reducers/activities';
import { areasActions } from '../reducers/areas';
import { tokensActions } from '../reducers/tokens';
import { objetivesActions } from '../reducers/objetives';
import { createActivity } from './activities';

export const getProjectData = (projectId) => {
  return async (dispatch) => {
    try {
      const response = await dedosInstance.get(`/projects/${projectId}`);

      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status}`);
      }
      dispatch(projectsActions.set([response.data.project]));
      dispatch(tokensActions.set(response.data.tokens));
      dispatch(objetivesActions.set(response.data.objetives));
      dispatch(areasActions.set(response.data.areas));
      dispatch(activitiesActions.set(response.data.activities));

      return response.data;

    } catch (error) {
      // console.log(error)
      return;
    }
  };
};

export const getProjects = () => {
  return async (dispatch) => {
    try {
      const response = await dedosInstance.get(`/projects`);
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status}`);
      }
      dispatch(projectsActions.set(response.data));
    } catch (error) {
      // console.log(error)
      return;
    }
  };
};

export const createProject = (title, description) => {
  return async (dispatch) => {

    // We have to substract the height and width of the side and upper bars in order to have the real resolution of edition area
    const screenResolution = `${window.screen.availWidth-230}x${window.screen.availHeight-85}`;
    const newProject = project(title, description, screenResolution);

    try {
      const response = await dedosInstance.post(`/projects`, newProject);
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      newProject._id = response.data._id;
      dispatch(projectsActions.create(newProject));
      // Creating the first activity inside the project
      dispatch(createActivity(newProject._id));
    } catch (error) {
      // console.log(error)
      return;
    }
  };
};

export const updateProject = (project) => {
  return async (dispatch) => {

    try {
      const response = await dedosInstance.put(`/projects/${project._id}`,project)

      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status}`);
      }
      dispatch(projectsActions.update(project));

    } catch (error) {
      // console.log(error)
      return;
    }
  };
};

export const deleteProject = (projectId) => {
  return async (dispatch) => {

    try {
      const response = await dedosInstance.delete(`/projects/${projectId}`)
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      dispatch(projectsActions.delete(projectId));

    } catch (error) {
      // console.log(error)
      return;
    }
  };
};


export const downloadProject = async (project) => {
    try {
      const response = await dedosInstance.get(`/download/${project._id}`, {responseType: 'blob'})
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', project.title+'.zip');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
       console.log(error)
      return;
    }

};