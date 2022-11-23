import axios from 'axios';

import config from '../../config/index';
import { project } from '../classes';
import { projectsActions } from '../reducers/projects';
import { activitiesActions } from '../reducers/activities';
import { areasActions } from '../reducers/areas';
import { tokensActions } from '../reducers/tokens';

export const getProjectData = (projectId) => {
  return async (dispatch) => {


    try {
      const response = await axios.get(`${config.server.url}/projects/${projectId}`);

      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status}`);
      }
      dispatch(projectsActions.set([response.data.project]));
      dispatch(activitiesActions.set(response.data.activities));
      dispatch(areasActions.set(response.data.areas));
      dispatch(tokensActions.set(response.data.tokens));

    } catch (error) {
      console.log(error)
    }
  };
};


export const getProjects = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.server.url}/projects/user/${userId}`);
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status}`);
      }
      dispatch(projectsActions.set(response.data));
    } catch (error) {
      console.log(error)
    }
  };
};

export const createProject = (userId, title, description) => {
  return async (dispatch) => {

    const screenResolution = `${window.screen.availWidth}x${window.screen.availHeight}`;
    const newProject = project(userId, title, description, screenResolution);

    try {
      const response = await axios.post(`${config.server.url}/projects`, newProject);
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      newProject._id = response.data._id;
      dispatch(projectsActions.create(newProject));

    } catch (error) {
      console.log(error)
    }
  };
};

export const updateProject = (project) => {
  return async (dispatch) => {

    try {
      const response = await axios.put(`${config.server.url}/projects/${project._id}`,project)

      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status}`);
      }
      dispatch(projectsActions.update(project));

    } catch (error) {
      console.log(error)
    }
  };
};

export const deleteProject = (projectId) => {
  return async (dispatch) => {

    try {
      const response = await axios.delete(`${config.server.url}/projects/${projectId}`)
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      dispatch(projectsActions.delete(projectId));

    } catch (error) {
      console.log(error)
    }
  };
};
