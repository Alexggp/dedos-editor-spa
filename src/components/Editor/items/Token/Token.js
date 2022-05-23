import React from 'react';
import { connect } from 'react-redux';

import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';

import classes from './Token.module.css';
import {moveToken, resizeToken, deleteToken, movableToken} from '../../../../store/reducers/tokens';

const Token = (props) => {


  const optionsButtonHandler = (e) =>{
    console.log('Options Button Pressed');
  }

  const stopPropagation = (e) =>{
    e.stopPropagation();
  }

  const hasMoved = ({x, y})=>{
    props.moveToken(props.token.id, {x: x, y: y});
  }
  const hasResized = ({w, h})=>{
    props.resizeToken(props.token.id, {w: w, h: h});
  }
  
  const deleteToken = ()=>{
    props.deleteToken(props.token.id);
  }

  const pinButtonHandler = (e) =>{
    props.movableToken(props.token.id);
  }


  let pinButtonClass = classes.PinButton;

  if (!props.token.movable) {
    pinButtonClass = classes.PinButtonPressed;
  }
  
  const cardClasses = [classes.Token, classes[`Token_type_${props.type}`]].join(' ');

  return(

      <ResizableAndDraggable
        dragHandleClassName={classes.Header}
        bounds={'parent'}
        offset={props.token.offset}
        moved = {hasMoved}
        resized = {hasResized}
        delete = {deleteToken}
        zIndex = {300}
        notMove={!props.token.movable}
        size={props.token.size}>
          <div className={cardClasses} >
            <div className={classes.Header} >
              <div className={pinButtonClass} onMouseDown={stopPropagation} onClick={pinButtonHandler}></div>
                {props.title} 
                {props.addButton}
            </div>
            <div className={classes.Body} >
              <div className={classes.OptionsButton} onClick={optionsButtonHandler}></div>
              {JSON.stringify(props.token.offset)}
              {props.children}
            </div>
          </div>
      </ResizableAndDraggable>
  )

}

export default connect(null, {moveToken, resizeToken, deleteToken, movableToken})(Token);