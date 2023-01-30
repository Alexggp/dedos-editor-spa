import React, { useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';


import classes from './EditionPage.module.css';
import Editor from '../../components/Editor/Editor';
import SideBar from '../../components/SideBar/SideBar';
import LoadingPage from '../LoadingPage/LoadingPage';

import { getProjectData } from '../../store/actions/projects';

const EditionPage = (props) => {
  const navigate = useNavigate();
  const token = useSelector(state => state.user.token);
  const activityList = useSelector(state => state.activities.activityList);
  const [login, setLogin] = useState(false);


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
    if(!activityList.length){
      // if page is reloaded the data is lost so we need to fetch it again
      (async () =>{
        setLogin(true);
        await dispatch(getProjectData(projectId));
        setLogin(false);
      })()
    }
  }, [projectId, dispatch, activityList]);

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
