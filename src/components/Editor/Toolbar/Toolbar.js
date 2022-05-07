import React from 'react';

import classes from './Toolbar.module.css';
import Draggable from '../../hoc/Draggable/Draggable';

const Toolbar = (props) => {

  return(
    <div className={classes.Toolbar}>
      <div className={classes.ButtonArea}>
        <div className={classes.Button}>
            <Draggable type={'AddZone'}>
              <img alt='' src='https://icones.pro/wp-content/uploads/2021/04/icone-internet-noire.png'/>
            </Draggable>
        </div>
      </div>
      <div className={classes.ButtonArea}>
        <div className={classes.Button}>
            <Draggable type={'AddText'}>
              <img alt='' src='https://icones.pro/wp-content/uploads/2021/04/icone-internet-noire.png'/>
            </Draggable>
        </div>
        <div className={classes.Button}>
            <Draggable type={'AddImage'}>
              <img alt='' src='https://icones.pro/wp-content/uploads/2021/04/icone-internet-noire.png'/>
            </Draggable>
        </div>
      </div>
      <div className={classes.ButtonArea}>
        <div className={classes.Button}>
            <Draggable type={'Tool4'}>
              <img alt='' src='https://icones.pro/wp-content/uploads/2021/04/icone-internet-noire.png'/>
            </Draggable>
        </div>
        <div className={classes.Button}>
            <Draggable type={'Tool5'}>
              <img alt='' src='https://icones.pro/wp-content/uploads/2021/04/icone-internet-noire.png'/>
            </Draggable>
        </div>
        <div className={classes.Button}>
            <Draggable type={'Tool6'}>
              <img alt='' src='https://icones.pro/wp-content/uploads/2021/04/icone-internet-noire.png'/>
            </Draggable>
        </div>
        <div className={classes.Button}>
            <Draggable type={'Tool7'}>
              <img alt='' src='https://icones.pro/wp-content/uploads/2021/04/icone-internet-noire.png'/>
            </Draggable>
        </div>
      </div>
      <div className={classes.ButtonArea}>
        <div className={classes.Button}>
            <Draggable type={'Tool8'}>
              <img alt='' src='https://icones.pro/wp-content/uploads/2021/04/icone-internet-noire.png'/>
            </Draggable>
        </div>
      </div>
    </div>
  )

}


export default Toolbar;