import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';


import classes from './EditionPage.module.css';
import Editor from '../../components/Editor/Editor';
import SideBar from '../../components/SideBar/SideBar';
import LoadingPage from '../LoadingPage/LoadingPage';

import { getProjectData } from '../../store/actions/projects';
import { projectsActions } from '../../store/reducers/projects';




const EditionPage = (props) => {
  const navigate = useNavigate();
  const token = useSelector(state => state.user.token);
  const [login, setLogin] = useState(true);
  const activityList = useSelector(state => state.activities.activityList);

  useEffect(() => {
    // If there is no token, redirects to login page
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const dispatch = useDispatch();
  const params = useParams();
  const projectId = params.projectId;

  useEffect(() => {
    dispatch(projectsActions.updateCurrent(projectId))
    dispatch(getProjectData(projectId));
  }, [projectId, dispatch]);

  useEffect(() => {
    if(activityList.length && activityList[0].projectId === projectId){
      setLogin(false);
    } else {
      setLogin(true);
    }
  }, [activityList]);

  return (
    <>
      {login ? <LoadingPage/> :
        <div className={classes.EditionPage}>
          <SideBar />
          <DndProvider backend={HTML5Backend}>
            <Editor />
          </DndProvider>
        </div>
      }
    </>
  );
}


export default EditionPage;
