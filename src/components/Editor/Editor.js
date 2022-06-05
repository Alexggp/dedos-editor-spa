import React from 'react';

import classes from './Editor.module.css';
import Toolbar from './Toolbar/Toolbar';
import Activity from './Activity/Activity';


const Editor = () => {



  return(
    <div className={classes.Editor}>
      <Toolbar/>
      <Activity/>
    </div>
  )
  
}



export default Editor;