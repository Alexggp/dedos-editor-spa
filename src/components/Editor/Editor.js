import React, { Component } from 'react';

import classes from './Editor.module.css';
import Toolbar from './Toolbar/Toolbar';
import EditionArea from './EditionArea/EditionArea';


class Editor extends Component {

  render(){
    return(
      <div className={classes.Editor}>
        <Toolbar/>
        <EditionArea/>
      </div>
    )
  }
}



export default Editor;