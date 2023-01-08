import dedosInstance from '../../apis/dedosInstance';
import { project } from '../classes';
import { projectsActions } from '../reducers/projects';
import { activitiesActions } from '../reducers/activities';
import { areasActions } from '../reducers/areas';
import { tokensActions } from '../reducers/tokens';
import { objetivesActions } from '../reducers/objetives';

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

    const screenResolution = `${window.screen.availWidth}x${window.screen.availHeight}`;
    const newProject = project(title, description, screenResolution);

    try {
      const response = await dedosInstance.post(`/projects`, newProject);
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      newProject._id = response.data._id;
      dispatch(projectsActions.create(newProject));

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
