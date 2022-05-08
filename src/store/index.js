import { createStore, combineReducers } from 'redux';
import {exercisesReducer} from './reducers/exercises';
import currentExerciseReducer from './reducers/currentExercise';
import { trashIsActiveReducer } from './reducers/trashIsActive';

const reducers = combineReducers({
  exercisesReducer,
  currentExerciseReducer,
  trashIsActiveReducer
})

const store = createStore(reducers);

export default store