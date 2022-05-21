import { createStore, combineReducers } from 'redux';
import {activitiesReducer} from './reducers/activities';
import currentActivityReducer from './reducers/currentActivity';
import { trashIsActiveReducer } from './reducers/trashIsActive';

const reducers = combineReducers({
  activitiesReducer,
  currentActivityReducer,
  trashIsActiveReducer
})

const store = createStore(reducers);

export default store