import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { activitiesActions } from '../../store/reducers/activities';

import classes from './SideBar.module.css';
import Miniature from './Miniature/Miniature';
import addIcon from '../../assets/icons/addIcon.png';

const SideBar = (props) => {
  const dispatch = useDispatch();

  const activityList = useSelector(state => state.activities.activityList);
  const currentActivityId = useSelector(state => state.activities.currentActivityId);

  const addActivity = ()=>{
    dispatch(activitiesActions.create());
  }
  const selectActivity = (activityId) =>{
    dispatch(activitiesActions.updateCurrent(activityId));
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
      {activitiesContainers}
      <img className={classes.AddIcon} src={addIcon} onClick={addActivity} title='Nueva actividad' alt=''/>
    </div>
  );
}


export default SideBar;