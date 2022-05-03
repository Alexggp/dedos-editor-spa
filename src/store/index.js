import { createStore, combineReducers } from 'redux';
import coordinatesReducer from './coordinates/reducer';
import stagesReducer from './reducers/stages';
import currentStageReducer from './reducers/currentStage';

const reducers = combineReducers({
  coordinatesReducer,
  stagesReducer,
  currentStageReducer
})

const store = createStore(reducers);

export default store