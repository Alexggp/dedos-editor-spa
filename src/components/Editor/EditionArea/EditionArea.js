import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import classes from './EditionArea.module.css';
import Area from '../items/Area/Area';
import Image from '../items/Image/Image';
import Text from '../items/Text/Text';

import Droppable from '../../hoc/Droppable/Droppable';

import {createItem, moveItem, resizeItem, deleteItem} from '../../../store/reducers/activities'; 
import { togleTrash } from '../../../store/reducers/trashIsActive';


const mapStateToProps = (state) => {
  const currentActivity = state.currentActivityReducer.index;
  return {
    itemList: state.activitiesReducer.activities[currentActivity].itemList,
    currentActivity: currentActivity,
    activities: state.activitiesReducer.activities
  }
}

const EditionArea = (props) => {

  useEffect(() => {
    console.log(props.activities);
  }, [props.itemList, props.activities]);

  const addNewItem = (item, offset)=>{
    props.createItem(props.currentActivity, item, offset);
  }

  const moveItem = (itemIndex, offset)=>{
    props.moveItem(props.currentActivity, itemIndex, offset);
  }
  
  const resizeItem = (itemIndex, size)=>{
    props.resizeItem(props.currentActivity, itemIndex, size);
  }

  const deleteItem = (itemIndex)=>{
    props.deleteItem(props.currentActivity, itemIndex);
  }

  const items = props.itemList.map((item, index)=>{
    switch (item.type) {
      case 'area':
        return <Area key={index} activityIndex={props.currentActivity}  props={item.props} itemIndex={index} offset={item.offset} size={item.size} moved={moveItem} resized={resizeItem} delete={()=>deleteItem(index)}/>;
      case 'image':
        return <Image key={index} itemIndex={index} item={item}/>;
      case 'text':
        return <Text key={index} itemIndex={index} item={item}/>;
      default:
        return <Text key={index} itemIndex={index} item={item}/>;
    }
  })

  return(
    
      <div className={classes.EditionArea}>
        <Droppable 
          type="EditionArea"
          accept={['AddArea','AddText','AddImage']} 
          dropped={addNewItem}>
            <div className={classes.WelcomeText}>
              {items}
              <p>SOY EL ÁREA DE EDICIÓN:</p>
              <p>ARRASTRA SOBRE MI LOS ICONOS DE LA BARRA DE<br/>HERRAMIENTAS PARA CREAR UNA ACTIVIDAD</p>
            </div>
            <div className={classes.Trash}
              onMouseEnter={()=>{props.togleTrash(true)}}
              onMouseLeave={()=>{props.togleTrash(false)}}
            />
        </Droppable>
      </div>
    
  )

}


export default connect(mapStateToProps, {createItem, moveItem, resizeItem, deleteItem, togleTrash})(EditionArea);