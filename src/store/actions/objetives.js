import dedosInstance from '../../apis/dedosInstance';
import { objetive } from '../classes';
import { objetivesActions } from '../reducers/objetives';


export const updateObjetive = ({objetiveId, data}) => {
  return async (dispatch) => {
    try {
      const response = await dedosInstance.put(`/objetives/${objetiveId}`, data);
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      dispatch(objetivesActions.update(response));
    } catch (error) {
      // console.log(error)
      return;    
    }
  };
};

export const deleteObjetive = ({objetiveId}) => {
  return async (dispatch) => {
    try {
      const response = await dedosInstance.delete(`/objetives/${objetiveId}`)
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      dispatch(objetivesActions.delete({objetiveId}));
    } catch (error) {
      // console.log(error)
      return;    
    }
  };
};

export const createObjetive = (projectId, activityId, type, origin, target, value) => {
  return async (dispatch) => {

    const newObjetive = objetive(projectId, activityId, type, origin, target, value);

    try {
      const response = await dedosInstance.post(`/objetives`, newObjetive);
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      newObjetive._id = response.data._id;
      dispatch(objetivesActions.create(newObjetive));

    } catch (error) {
      // console.log(error)
      return;    
    }
  };
};