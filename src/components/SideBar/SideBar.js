import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { createActivity, updateCurrentActivity } from '../../store/reducers/activities';

import classes from './SideBar.module.css';
import Miniature from './Miniature/Miniature';
import addIcon from '../../assets/icons/addIcon.png';

const SideBar = (props) => {
  const dispatch = useDispatch();

  const activityList = useSelector(state => state.activitiesReducer.activityList);

  const addActivity = ()=>{
    dispatch(createActivity());
  }
  const selectActivity = (activityId) =>{
    dispatch(updateCurrentActivity(activityId));
  }
  
  const activitiesContainers = activityList.map((activity)=>(
    <div 
      className={classes.ActivityContainer}
      onClick={()=>selectActivity(activity.id)}
      key={activity.id} >
        <Miniature activityId={activity.id}/>
    </div>
  ));


  return (

    <div className={classes.SideBar}>
      {activitiesContainers}
      <img className={classes.AddIcon} src={addIcon} onClick={addActivity} title='Nueva actividad' alt=''/>
    </div>
  );
}


export default SideBar;
