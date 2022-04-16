import React from 'react';

import classes from './Toolbar.module.css';

const Toolbar = (props) => {

  return(
    <div className={classes.Toolbar}>
      <div className={classes.ButtonArea}>
        <div className={classes.Button}></div>
      </div>
      <div className={classes.ButtonArea}>
        <div className={classes.Button}></div>
        <div className={classes.Button}></div>
      </div>
      <div className={classes.ButtonArea}>
        <div className={classes.Button}></div>
        <div className={classes.Button}></div>
        <div className={classes.Button}></div>
        <div className={classes.Button}></div>
      </div>
      <div className={classes.ButtonArea}>
        <div className={classes.Button}></div>
      </div>
    </div>
  )

}


export default Toolbar;