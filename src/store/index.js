import { createStore, combineReducers } from 'redux';
import { activitiesReducer } from './reducers/activities';
import { areasReducer } from './reducers/areas';
import { tokensReducer } from './reducers/tokens';
import { trashIsActiveReducer } from './reducers/trashIsActive';
import { projectsReducer } from './reducers/projects';

const reducers = combineReducers({
  activitiesReducer,
  areasReducer,
  tokensReducer,
  projectsReducer,
  trashIsActiveReducer
})

const store = createStore(reducers);

export default store