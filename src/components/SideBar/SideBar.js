import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { createActivity } from '../../store/actions/activities';


import classes from './SideBar.module.css';
import Miniature from './Miniature/Miniature';
import addIcon from '../../assets/icons/addIcon.png';
import { useParams, useNavigate } from 'react-router-dom';

const SideBar = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activityList = useSelector(state => state.activities.activityList);
  const currentActivityId = params.activityId;
  const currentProjectId = params.projectId;
  const projectList = useSelector(state => state.projects.projectList);

  const project = projectList.find((pr)=>pr._id === currentProjectId);

  const addActivity = ()=>{
    dispatch(createActivity(currentProjectId));
  }
  const selectActivity = (activityId) =>{
    navigate(`/editor/${currentProjectId}/${activityId}`);
  }
  
  const activitiesContainers = activityList.map((activity)=>{
    let isSelected = false;
    const miniatureClasses = [classes.MiniatureContainer]
    if (currentActivityId === activity._id){
      miniatureClasses.push(classes.MiniatureSelected);
      isSelected = true;
    }
  
    return (
      <div 
        className={miniatureClasses.join(' ')}
        onClick={()=>selectActivity(activity._id)}
        key={activity._id} >
          <Miniature activityId={activity._id} isSelected={isSelected}/>
      </div>
    )
  });
  

  return (

    <div className={classes.SideBar}>
      <div className={classes.ProjectTitle}>
        {project ? project.title : ""}
      </div>
      {activitiesContainers}
      <img className={classes.AddIcon} src={addIcon} onClick={addActivity} title='Nueva actividad' alt=''/>
    </div>
  );
}


export default SideBar;
