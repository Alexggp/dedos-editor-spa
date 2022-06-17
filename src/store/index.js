import { configureStore } from '@reduxjs/toolkit';

import activities from './reducers/activities';
import areas from './reducers/areas';
import tokens from './reducers/tokens';
import trash from './reducers/trash';
import projects from './reducers/projects';

const store = configureStore({
  reducer: { 
    activities,
    areas,
    tokens,
    projects,
    trash
  }
});

export default store;