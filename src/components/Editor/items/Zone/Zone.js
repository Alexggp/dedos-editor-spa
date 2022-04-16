import React from 'react';
import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';

import classes from './Zone.module.css';

const Zone = (props) => {
  
  return(

      <ResizableAndDraggable>
        <div className={classes.Zone} >
          
        </div>
      </ResizableAndDraggable>
  )

}


export default Zone;