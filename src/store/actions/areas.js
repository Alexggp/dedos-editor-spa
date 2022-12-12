import dedosInstance from '../../apis/dedosInstance';
import { area } from '../classes';
import { areasActions } from '../reducers/areas';

export const updateArea = (area) => {
  return async (dispatch) => {

    try {
      const response = await dedosInstance.put(`/areas/${area._id}`,area)

      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status}`);
      }
      dispatch(areasActions.update(area));

    } catch (error) {
      // console.log(error)
      return;
    }
  };
};

export const deleteArea = (areaId) => {
  return async (dispatch) => {

    try {
      const response = await dedosInstance.delete(`/areas/${areaId}`)
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      dispatch(areasActions.delete(areaId));

    } catch (error) {
      // console.log(error)
      return;
    }
  };
};

export const createArea = ({projectId, activityId, offset}) => {
  return async (dispatch) => {

    const newArea = area(projectId, activityId, offset);

    try {
      const response = await dedosInstance.post(`/areas`, newArea);
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      newArea._id = response.data._id;
      dispatch(areasActions.create(newArea));

    } catch (error) {
      // console.log(error)
      return;
    }
  };
};