import { createStore, combineReducers } from 'redux';
import {activitiesReducer} from './reducers/activities';
import {areasReducer} from './reducers/areas';
import {tokensReducer} from './reducers/tokens';
import { trashIsActiveReducer } from './reducers/trashIsActive';

const reducers = combineReducers({
  activitiesReducer,
  areasReducer,
  tokensReducer,
  trashIsActiveReducer
})

const store = createStore(reducers);

export default store