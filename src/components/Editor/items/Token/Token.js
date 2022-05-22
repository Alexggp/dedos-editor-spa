import React from 'react';
import { connect } from 'react-redux';

import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';

import classes from './Token.module.css';
import {moveToken} from '../../../../store/reducers/tokens';


const mapStateToProps = (state) => {

}

const Token = (props) => {

  const pinButtonHandler = (e) =>{
    const propsClone = {...props.token.props}
    propsClone.pin = props.token.props.pin ? false: true;
    props.changeItemProps(props.currentActivity, props.tokenIndex, propsClone)
  }

  const optionsButtonHandler = (e) =>{
    console.log('Options Button Pressed');
  }

  const stopPropagation = (e) =>{
    e.stopPropagation();
  }

  const hasMoved = (offset)=>{
    props.moveToken(props.token.id, offset);
  }
  const hasResized = (w, h)=>{
    props.resizeItem(props.currentActivity, props.tokenIndex, {w: w, h:h});
  }
  
  const deleteItem = ()=>{
    props.deleteItem(props.currentActivity, props.tokenIndex);
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
        delete = {deleteItem}
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
              {props.children}
            </div>
          </div>
      </ResizableAndDraggable>
  )

}

export default connect(mapStateToProps, {moveToken})(Token);