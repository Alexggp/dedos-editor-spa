import axios from 'axios';
import { activity } from '../classes';

import config from '../../config/index';
import { activitiesActions } from '../reducers/activities';


export const updateActivity = ({activityId, zIndexTop}) => {
  return async () => {
    try {
      const response = await axios.put(`${config.server.url}/activities/${activityId}`, {zIndexTop});
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.log(error)
    }
  };
};

export const deleteActivity = ({activityId, isSelected}) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${config.server.url}/activities/${activityId}`)
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      dispatch(activitiesActions.delete({activityId, isSelected}));
    } catch (error) {
      console.log(error)
    }
  };
};

export const createActivity = (projectId) => {
  return async (dispatch) => {

    const newActivity = activity(projectId);

    try {
      const response = await axios.post(`${config.server.url}/activities`, newActivity);
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      newActivity._id = response.data._id;
      dispatch(activitiesActions.create(newActivity));

    } catch (error) {
      console.log(error)
    }
  };
};