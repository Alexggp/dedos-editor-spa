import React, {useState, useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { createActivity, deleteActivity } from '../../store/actions/activities';


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
  const [acLenght, setAcLenght] = useState(0);

  const project = projectList.find((pr)=>pr._id === currentProjectId);

  const addActivity = async ()=>{
    setAcLenght(activityList.length);
    await dispatch(createActivity(currentProjectId));

  }
  const selectActivity = (activityId) =>{
    navigate(`/editor/${currentProjectId}/${activityId}`);
  }

  const removeActivity = (e, activityId, isSelected) =>{
    e.stopPropagation();
    setAcLenght(activityList.length);
    dispatch(deleteActivity({activityId, isSelected}));
  }

  useEffect(()=>{
    if (acLenght && acLenght!==activityList.length) navigate(`/editor/${currentProjectId}/${activityList[activityList.length-1]._id}`);
    // eslint-disable-next-line
  },[activityList.length])
  
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
          <Miniature activityId={activity._id} removeActivity={removeActivity} isSelected={isSelected}/>
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
