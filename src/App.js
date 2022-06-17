import React, {useEffect} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';


import classes from './App.module.css';
import Editor from './components/Editor/Editor';
import SideBar from './components/SideBar/SideBar';

import { getProjectById } from './services/projects'
import { activitiesActions } from './store/reducers/activities';
import { areasActions } from './store/reducers/areas';
import { tokensActions } from './store/reducers/tokens';


const App = (props) => {

  const dispatch = useDispatch();
  const currentProjectId = useSelector(state => state.projects.currentProjectId);

  useEffect(() => {
    getProjectById(currentProjectId)
      .then((response) =>{
        dispatch(activitiesActions.set(response.activities));
        dispatch(areasActions.set(response.areas));
        dispatch(tokensActions.set(response.tokens));
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
