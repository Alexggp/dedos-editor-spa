import React from 'react';
import { connect } from 'react-redux';

import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';

import classes from './Token.module.css';
import {createItem, moveItem, resizeItem, deleteItem, changeItemProps} from '../../../../store/reducers/exercises';


const mapStateToProps = (state) => {
  const currentExercise = state.currentExerciseReducer.index;
  return {
    currentExercise: currentExercise
  }
}

const Token = (props) => {

  const pinButtonHandler = (e) =>{
    const propsClone = {...props.item.props}
    propsClone.pin = props.item.props.pin ? false: true;
    props.changeItemProps(props.currentExercise, props.itemIndex, propsClone)
  }

  const optionsButtonHandler = (e) =>{
    console.log('Options Button Pressed');
  }

  const stopPropagation = (e) =>{
    e.stopPropagation();
  }

  const hasMoved = (x, y)=>{
    props.moveItem(props.currentExercise, props.itemIndex, {x: x, y:y});
  }

  const hasResized = (w, h)=>{
    props.resizeItem(props.currentExercise, props.itemIndex, {w: w, h:h});
  }
  
  const deleteItem = ()=>{
    props.deleteItem(props.currentExercise, props.itemIndex);
  }


  let pinButtonClass = classes.PinButton;

  if (props.item.props.pin) {
    pinButtonClass = classes.PinButtonPressed;
  }
  
  const cardClasses = [classes.Token, classes[`Token_type_${props.type}`]].join(' ');

  return(

      <ResizableAndDraggable
        dragHandleClassName={classes.Header}
        bounds={'parent'}
        offset={props.item.offset}
        moved = {hasMoved}
        resized = {hasResized}
        delete = {deleteItem}
        zIndex = {300}
        notMove={props.item.props.pin}
        size={props.item.size}>
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

export default connect(mapStateToProps, {createItem, moveItem, resizeItem, deleteItem, changeItemProps})(Token);