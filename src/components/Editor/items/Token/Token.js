import React from 'react';
import { connect } from 'react-redux';

import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';
import checkOverlapping from '../../../../utils/checkOverlapping';
import classes from './Token.module.css';
import {deleteToken, updateToken} from '../../../../store/reducers/tokens';



const mapStateToProps = (state) => {
  return {
    areaList: state.areasReducer.areaList,
    currentActivity: state.activitiesReducer.currentActivity,
  }
}

const Token = (props) => {

  const stopPropagation = (e) =>{
    e.stopPropagation();
  }


  const optionsButtonHandler = (e) =>{
    console.log('Options Button Pressed');
  }

  const hasMoved = ({x, y})=>{
    const auxToken = {...props.token}
    auxToken.offset = {x: x, y: y};
    auxToken.areaId = checkOverlapping(auxToken, props.areaList, props.currentActivity)[0] || 0;
    console.log(auxToken.areaId)
    props.updateToken(props.token.id, auxToken);
  }
  const hasResized = ({w, h})=>{
    const auxToken = {...props.token}
    auxToken.size = {w: w, h: h}
    props.updateToken(props.token.id, auxToken);
  }
  
  const deleteToken = ()=>{
    props.deleteToken(props.token.id);
  }

  const pinButtonHandler = (e) =>{
    const auxToken = {...props.token}
    auxToken.movable = !props.token.movable;
    props.updateToken(props.token.id, auxToken);
  }


  let pinButtonClass = classes.PinButton;

  if (!props.token.movable) {
    pinButtonClass = classes.PinButtonPressed;
  }
  
  const cardClasses = [classes.Token, classes[`Token_type_${props.type}`]].join(' ');

  return(

      <ResizableAndDraggable
        dragHandleClassName={classes.Header}
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
              {props.children}
            </div>
          </div>
      </ResizableAndDraggable>
  )

}

export default connect(mapStateToProps, {deleteToken, updateToken})(Token);