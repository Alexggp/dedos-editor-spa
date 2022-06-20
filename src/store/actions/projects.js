import axios from 'axios';

import config from '../../config/index';
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
      console.log(response.data)
      dispatch(projectsActions.set(response.data));
    } catch (error) {
      console.log(error)
    }
  };
};