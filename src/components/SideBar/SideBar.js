import React from 'react';

import { useSelector } from 'react-redux';


import classes from './SideBar.module.css';
import Miniature from './Miniature/Miniature';
import addIcon from '../../assets/icons/addIcon.png';

const SideBar = (props) => {

  const activities = useSelector(state => state.activitiesReducer.activities);

  const addActivity = ()=>{
    console.log('addActivity');
  }

  const activitiesContainers = activities.map((activity)=>(
    <div className={classes.ActivityContainer} key={activity.id}>
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
