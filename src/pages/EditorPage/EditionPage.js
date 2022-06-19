import React, {useEffect} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';


import classes from './EditionPage.module.css';
import Editor from '../../components/Editor/Editor';
import SideBar from '../../components/SideBar/SideBar';

import { getProjectData } from '../../store/actions/projects';


const EditionPage = (props) => {

  const dispatch = useDispatch();
  const currentProjectId = useSelector(state => state.projects.currentProjectId);

  useEffect(() => {
    dispatch(getProjectData(currentProjectId));
    
  }, [currentProjectId, dispatch]);

  return (

    <div className={classes.EditionPage}>
      <SideBar/>
      <DndProvider backend={HTML5Backend}>
        <Editor/>
			</DndProvider>
    </div>
  );
}


export default EditionPage;
