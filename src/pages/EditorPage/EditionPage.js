import React, {useEffect} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';


import classes from './EditionPage.module.css';
import Editor from '../../components/Editor/Editor';
import SideBar from '../../components/SideBar/SideBar';

import { getProjectData } from '../../store/actions/projects';
import { projectsActions } from '../../store/reducers/projects';



const EditionPage = (props) => {

  const projectList = useSelector(state => state.projects.projectList);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const params = useParams();
  const projectId = params.projectId;

  useEffect(() => {
    dispatch(projectsActions.updateCurrent(projectId))
    dispatch(getProjectData(projectId));
  }, [projectId, dispatch]);


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
