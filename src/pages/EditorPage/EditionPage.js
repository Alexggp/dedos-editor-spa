import React, { useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';


import classes from './EditionPage.module.css';
import Editor from '../../components/Editor/Editor';
import SideBar from '../../components/SideBar/SideBar';
import LoadingPage from '../LoadingPage/LoadingPage';
import { activitiesActions } from '../../store/reducers/activities';

import { getProjectData } from '../../store/actions/projects';

const EditionPage = (props) => {
  const navigate = useNavigate();
  const token = useSelector(state => state.user.token);
  const [login, setLogin] = useState(true);
  const activityList = useSelector(state => state.activities.activityList);
  const currentActivityId = useSelector(state => state.activities.currentActivityId);


  useEffect(() => {
    // If there is no token, redirects to login page
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const dispatch = useDispatch();
  const params = useParams();
  const projectId = params.projectId;
  const activityId = params.activityId;

  useEffect(() => {
    dispatch(getProjectData(projectId));
  }, [projectId, dispatch]);

  useEffect(() => {
    if (activityList.length && activityList[0].projectId === projectId) {
      // Navigating to the first acitivity of the project when the project is loaded for the first time
      if (!activityId) navigate(`/editor/${projectId}/${activityList[0]._id}`);
      setLogin(false);
    } else {
      setLogin(true);
    }
    // eslint-disable-next-line 
  }, [activityList]);

  useEffect(() => {
    // if the current activity on the store changes (because of removing or adding activities) it navigates to the current activity
    if(currentActivityId && currentActivityId !== activityId) navigate(`/editor/${projectId}/${currentActivityId}`);
      // eslint-disable-next-line 
  }, [currentActivityId]);

  useEffect(() => {
    // When navigate to a new activityId, it updates the current activity on the store
    if(currentActivityId !== activityId) dispatch(activitiesActions.updateCurrent(activityId));
    // eslint-disable-next-line 
  }, [activityId]);

  return (
    <>
      {login ? <LoadingPage /> :
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
