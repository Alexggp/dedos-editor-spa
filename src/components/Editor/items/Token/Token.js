import React, {useRef, useState} from 'react';
import { connect } from 'react-redux';

import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';
import classes from './Token.module.css';
import {deleteToken, updateToken} from '../../../../store/reducers/tokens';
import Options from './Options/Options';


const mapStateToProps = (state) => {
  return {
    areaList: state.areasReducer.areaList,
    currentActivity: state.activitiesReducer.currentActivity,
  }
}

const Token = (props) => {
  const tokenRef = useRef();

  const [showOptions, setShowOptions] = useState(false)

  const stopPropagation = (e) =>{
    e.stopPropagation();
  }


  const checkAreaOverlapping = (obj) =>{
    
    // Checks if the token overlaps with any area
  
    const areaList = props.areaList.filter(ar => ar.activityId === props.currentActivity);
    let overlapsWith = 0;
    areaList.forEach(area => {

      // area.top > obj.bottom ||
      // area.right < obj.left ||
      // area.bottom < obj.top ||
      // area.left > obj.right
  
      const overlaps = !(
        area.offset.y > (obj.screenOffset.y + obj.size.h) ||
        (area.offset.x + area.size.w) < obj.screenOffset.x ||
        (area.offset.y + area.size.h) < obj.screenOffset.y ||
        area.offset.x > (obj.screenOffset.x + obj.size.w)
      );
      if (overlaps) overlapsWith = area.id;
      
    });
    return overlapsWith;
  }
  
  const calculateNewOffset = (token) =>{
    const area = props.areaList.find(ar => ar.id === token.areaId);
    return {
      x: token.screenOffset.x - area.offset.x,
      y: token.screenOffset.y - area.offset.y
    }
  }


  const optionsButtonHandler = (e) =>{
    setShowOptions(!showOptions);
  }

  const hasMoved = ({x, y})=>{
    const auxToken = {...props.token}
    
    // Getting the offset referenced by the Edition Area div
    auxToken.screenOffset={
      x: tokenRef.current.getBoundingClientRect().x - 0,
      y: tokenRef.current.getBoundingClientRect().y - 85
    }
    
    // Checking if a token is dropped within an area
    auxToken.areaId = checkAreaOverlapping(auxToken);

    // Getting the offset referenced by the parent
    if (!auxToken.areaId){
      // If the token is outside any area, offset = screenOffset
      auxToken.offset = auxToken.screenOffset;
    }
    else if (auxToken.areaId !== props.token.areaId){
      // if the parent area changes, calculates a new offset 
      auxToken.offset = calculateNewOffset(auxToken);
    } else {
      // The token has been moved inside the same area
      auxToken.offset = {x: x, y: y};
    }

    props.updateToken(props.token.id, auxToken);
  }
  const hasResized = ({w, h})=>{
    const auxToken = {...props.token}
    // Size is returned as a string with px. eg: {w: '10px', y: '30px'}
    // It must be normalized as a number
    auxToken.size = {
      w: Number(w.replace('px','')), 
      h: Number(h.replace('px',''))
    };
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

  const updateOptions = (token) => {
    props.updateToken(props.token.id, token);
  }


  let pinButtonClass = classes.PinButton;

  if (!props.token.movable) {
    pinButtonClass = classes.PinButtonPressed;
  }
  
  const tokenClasses = [classes.Token, classes[`Token_type_${props.type}`]].join(' ');

  const headerContent = !showOptions ? (
    <React.Fragment>
      <div className={pinButtonClass} onMouseDown={stopPropagation} onClick={pinButtonHandler}></div>
      {props.title} 
      {props.addButton}
    </React.Fragment>
   
  ) : '';

  const optionsContainer = showOptions ? (
    <Options token={props.token} updateOptions={updateOptions}/>
  ) : '';

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
          <div className={tokenClasses}  ref={tokenRef}>
            <div className={classes.Header} >
              {headerContent}
            </div>
            <div className={classes.Body} >
              <div className={classes.OptionsButton} onClick={optionsButtonHandler}></div>
              {props.children}
              {optionsContainer}
            </div>
          </div>
      </ResizableAndDraggable>
  )

}

export default connect(mapStateToProps, {deleteToken, updateToken})(Token);