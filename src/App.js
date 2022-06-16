import React, {useEffect} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';


import classes from './App.module.css';
import Editor from './components/Editor/Editor';
import SideBar from './components/SideBar/SideBar';

import { getProjectById } from './services/projects'
import { setActivities } from './store/reducers/activities';
import { setAreas } from './store/reducers/areas';
import { setTokens } from './store/reducers/tokens';


const App = (props) => {

  const dispatch = useDispatch();
  const currentProjectId = useSelector(state => state.projectsReducer.currentProjectId);

  useEffect(() => {
    getProjectById(currentProjectId)
      .then((response) =>{
        dispatch(setActivities(response.activities));
        dispatch(setAreas(response.areas));
        dispatch(setTokens(response.tokens));
      })
      .catch(err => console.log(err));
    
  }, [currentProjectId, dispatch]);

  return (

    <div className={classes.App}>
      <SideBar/>
      <DndProvider backend={HTML5Backend}>
        <Editor/>
			</DndProvider>
    </div>
  );
}


export default App;
