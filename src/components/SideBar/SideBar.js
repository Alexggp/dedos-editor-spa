import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { createActivity, updatecurrentActivityId } from '../../store/reducers/activities';

import classes from './SideBar.module.css';
import Miniature from './Miniature/Miniature';
import addIcon from '../../assets/icons/addIcon.png';

const SideBar = (props) => {
  const dispatch = useDispatch();

  const activityList = useSelector(state => state.activitiesReducer.activityList);
  const currentActivityId = useSelector(state => state.activitiesReducer.currentActivityId);

  const addActivity = ()=>{
    dispatch(createActivity());
  }
  const selectActivity = (activityId) =>{
    dispatch(updatecurrentActivityId(activityId));
  }
  


  const activitiesContainers = activityList.map((activity)=>{
    let isSelected = false;
    const miniatureClasses = [classes.MiniatureContainer]
    if (currentActivityId === activity.id){
      miniatureClasses.push(classes.MiniatureSelected);
      isSelected = true;
    }
  
    return (
      <div 
        className={miniatureClasses.join(' ')}
        onClick={()=>selectActivity(activity.id)}
        key={activity.id} >
          <Miniature activityId={activity.id} isSelected={isSelected}/>
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
