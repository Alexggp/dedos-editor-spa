import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ResizableAndDraggable from '../../../../hoc/ResizableAndDraggable/ResizableAndDraggable';
import Droppable from '../../../../hoc/Droppable/Droppable';
import FileLoaer from '../../../FileLoader/FileLoader';

import classes from './Area.module.css';
import ObjetivesContainer from './ObjetivesContainer/ObjetivesContainer';
import usePairing from '../../../../hooks/usePairing';

import { updateArea, deleteArea } from '../../../../store/actions/areas';
import { deleteToken, updateToken } from '../../../../store/actions/tokens';
import { activitiesActions } from '../../../../store/reducers/activities';
import { createObjetive } from '../../../../store/actions/objetives';


const Area = (props) => {
  const dispatch = useDispatch();

  const activityList = useSelector(state => state.activities.activityList);
  const currentActivityId = useSelector((state) => state.activities.currentActivityId);
  const activity = activityList.find(ac => ac._id === currentActivityId);
  const [zIndex, setZIndex] = useState(1);
  const {setPairing} = usePairing();


  const objetivesList = useSelector(state => state.objetives.objetivesList);
  const objetive = objetivesList.find(obj => obj.origin === props.area._id || obj.target === props.area._id);

  const updateZIndex = () => {
    // updating activity zIndexTop index
    const auxActivity = { ...activity };
    auxActivity.zIndexTop = auxActivity.zIndexTop + 1;
    dispatch(activitiesActions.update(auxActivity));
    // updating area zIndex
    const auxArea = { ...props.area };
    auxArea.zIndex = auxActivity.zIndexTop;
    dispatch(updateArea(auxArea));

  }


  const updateChildrenZIndex = () => {
    // We need to update every children token zIndex in 
    // order to keep them on the top layer and keep their
    // arrows on the top layer and visibles all the time 

    const compare = ( a, b ) => {
      if ( a.zIndex < b.zIndex ){
        return 1;
      }
      if ( a.zIndex > b.zIndex ){
        return -1;
      }
      return 0;
    }

    const auxActivity = { ...activity };
    
    props.tokens.sort(compare).forEach(token => {
      
      auxActivity.zIndexTop = auxActivity.zIndexTop + 1;
      const auxToken = {...token}
      auxToken.zIndex= auxActivity.zIndexTop;
      dispatch(updateToken(auxToken));
    });
    dispatch(activitiesActions.update(auxActivity));
  }

  const firstUpdate = useRef(true); // preventing to call to update on the first loading at setting the value
  useEffect(() => {
    // every time the zIndex changes in the reducer, also when it is created
    if (props.area.zIndex && !firstUpdate.current) {
      updateChildrenZIndex();
      setZIndex(props.area.zIndex);
    } 
    if (firstUpdate.current) {
      firstUpdate.current = false
    }
    if (!props.area.zIndex) {
      updateZIndex();
    }
    // eslint-disable-next-line
  }, [props.area.zIndex]);

  useEffect(() => {
    // If there is a new token inside the Area, it goes to the top layer updating its zIndex
    if (previousChildrenLength !== undefined && (props.children.length > previousChildrenLength)) {
      updateZIndex();
    }
    // eslint-disable-next-line
  }, [props.children.length])

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const previousChildrenLength = usePrevious(props.children.length);

  const addBackgroundHandler = (backgroundUrl) => {
    const auxArea = { ...props.area }
    auxArea.background = backgroundUrl;
    dispatch(updateArea(auxArea));
  }

  const typeButtonHandler = (e) => {
    const auxArea = { ...props.area }
    auxArea.type = (props.area.type === 'Game') ? 'Player' : 'Game';
    dispatch(updateArea(auxArea));
  }

  const stopPropagation = (e) => {
    e.stopPropagation();
  }

  const hasMoved = ({ x, y }) => {

    const auxArea = { ...props.area }
    auxArea.offset = { x: x, y: y };
    auxArea.zIndex = zIndex;

    dispatch(updateArea(auxArea));
  }
  const hasResized = ({ w, h }) => {
    const auxArea = { ...props.area }
    // Size is returned as a string with px. eg: {w: '10px', y: '30px'}
    // It must be normalized as a number
    auxArea.size = {
      w: Number(w.replace('px', '')),
      h: Number(h.replace('px', ''))
    };
    dispatch(updateArea(auxArea));
  }

  const deleteAreaHandler = () => {
    props.tokens.forEach(token => {
      // Deleting tokens within the area
      dispatch(deleteToken(token._id));
    });
    dispatch(deleteArea(props.area._id));
  }

  const style = {
    backgroundImage: `url('${props.area.background || ''}')`
  }

  const areaClasses = [classes.Area];
  if (props.area.type === 'Game') {
    areaClasses.push(classes.GameArea);
  }

  const addObjetive = (item)=>{
    dispatch(createObjetive({
      projectId: props.area.projectId,
      activityId: props.area.activityId,
      type: item.name,
      origin: props.area._id
    }));
  }

  const handleClick = (e)=>{
    e.stopPropagation();
    setPairing(props.area._id);
  }

  return (

    <ResizableAndDraggable
      dragHandleClassName={classes.DragHandle}
      bounds={'parent'}
      offset={props.area.offset}
      moved={hasMoved}
      resized={hasResized}
      delete={deleteAreaHandler}
      zIndex={zIndex}
      updateZIndex={updateZIndex}
      size={props.area.size}>
      <Droppable
        type="Activity"
        accept={['Pairing', 'Counter']}
        activityId={currentActivityId}
        dropped={addObjetive}>
        <div className={areaClasses.join(' ')} style={style} onClick={handleClick} id={props.area._id}>
          <div className={classes.DragHandle}>
            <div className={classes.AreaTypeButton} onMouseDown={stopPropagation} onClick={typeButtonHandler} ></div>
            <div className={classes.AddButton}>
              <FileLoaer itemId={props.area._id} onLoad={addBackgroundHandler} />
            </div>
          </div>
          <ObjetivesContainer objetive={objetive}/>
          {props.children}
        </div>
      </Droppable>
    </ResizableAndDraggable>
  )

}


export default Area;