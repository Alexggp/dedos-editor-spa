import { createStore, combineReducers } from 'redux';
import {stagesReducer} from './reducers/stages';
import currentStageReducer from './reducers/currentStage';
import { trashIsActiveReducer } from './reducers/trashIsActive';

const reducers = combineReducers({
  stagesReducer,
  currentStageReducer,
  trashIsActiveReducer
})

const store = createStore(reducers);

export default store