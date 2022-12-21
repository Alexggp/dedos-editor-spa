import dedosInstance from '../../apis/dedosInstance';
import { objetive } from '../classes';
import { objetivesActions } from '../reducers/objetives';
import { store } from '..';

export const updateObjetive = ({objetiveId, data}) => {
  return async (dispatch) => {
    try {
      const response = await dedosInstance.put(`/objetives/${objetiveId}`, data);
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }

      dispatch(objetivesActions.update(response.data));
    } catch (error) {
      // console.log(error)
      return;    
    }
  };
};

export const deleteObjetive = (objetiveId) => {
  return async (dispatch) => {
    try {
      const response = await dedosInstance.delete(`/objetives/${objetiveId}`)
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      dispatch(objetivesActions.delete(objetiveId));
    } catch (error) {
      // console.log(error)
      return;    
    }
  };
};

export const createObjetive = ({projectId, activityId, type, origin}) => {
  return async (dispatch) => {
    const objetivesList = store.getState().objetives.objetivesList;
    const obj = objetivesList.find(obj => obj.origin === origin);
    // Only one objetive by origin is allowed 
    if (obj) return;

    let target;
    let value;
    if(type === "Counter" || type === "Timer"){
      value = 1;
    }

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