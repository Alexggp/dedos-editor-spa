import axios from 'axios';
import { area } from '../classes';

import config from '../../config/index';
import { areasActions } from '../reducers/areas';

export const updateArea = (area) => {
  return async (dispatch) => {

    try {
      const response = await axios.put(`${config.server.url}/areas/${area._id}`,area)

      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status}`);
      }
      dispatch(areasActions.update(area));

    } catch (error) {
      console.log(error)
    }
  };
};

export const deleteArea = (areaId) => {
  return async (dispatch) => {

    try {
      const response = await axios.delete(`${config.server.url}/areas/${areaId}`)
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      dispatch(areasActions.delete(areaId));

    } catch (error) {
      console.log(error)
    }
  };
};

export const createArea = ({projectId, activityId, offset}) => {
  return async (dispatch) => {

    const newArea = area(projectId, activityId, offset);

    try {
      const response = await axios.post(`${config.server.url}/areas`, newArea);
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      newArea._id = response.data._id;
      dispatch(areasActions.create(newArea));

    } catch (error) {
      console.log(error)
    }
  };
};