import { createStore, combineReducers } from 'redux';
import {stagesReducer} from './reducers/stages';
import currentStageReducer from './reducers/currentStage';

const reducers = combineReducers({
  stagesReducer,
  currentStageReducer
})

const store = createStore(reducers);

export default store