import React from 'react';
import { connect } from 'react-redux';

import classes from './EditionArea.module.css';
import Zone from '../items/Zone/Zone';
import Image from '../items/Image/Image';
import Text from '../items/Text/Text';

import Droppable from '../../hoc/Droppable/Droppable';

import {createItem, moveItem, resizeItem} from '../../../store/reducers/stages'; 


const mapStateToProps = (state) => {
  const currentStage = state.currentStageReducer.index;
  return {
    itemList: state.stagesReducer.stages[currentStage].itemList,
    currentStage: currentStage
  }
}

const EditionArea = (props) => {

  const addNewItem = (item, offset)=>{
    props.createItem(props.currentStage, item, offset);
  }

  const moveItem = (itemIndex, offset)=>{
    props.moveItem(props.currentStage, itemIndex, offset);
  }
  
  const resizeItem = (itemIndex, size)=>{
    props.resizeItem(props.currentStage, itemIndex, size);
  }

  const items = props.itemList.map((item, index)=>{
    switch (item.type) {
      case 'zone':
        return <Zone key={index} stageIndex={props.currentStage}  props={item.props} itemIndex={index} offset={item.offset} size={item.size} moved={moveItem} resized={resizeItem}/>;
      case 'image':
        return <Image key={index} stageIndex={props.currentStage}  props={item.props} itemIndex={index} offset={item.offset} size={item.size} moved={moveItem} resized={resizeItem}/>;
      case 'text':
        return <Text key={index} stageIndex={props.currentStage}  props={item.props} itemIndex={index} offset={item.offset} size={item.size} moved={moveItem} resized={resizeItem}/>;
      default:
        return <Text key={index} stageIndex={props.currentStage}  props={item.props} itemIndex={index} offset={item.offset} size={item.size} moved={moveItem} resized={resizeItem}/>;
    }
  })

  return(
    
      <div className={classes.EditionArea}>
        <Droppable 
          type="EditionArea"
          accept={['AddZone','AddText','AddImage']} 
          dropped={addNewItem}>
            <div className={classes.WelcomeText}>
              {items}
              <p>SOY EL ÁREA DE EDICIÓN:</p>
              <p>ARRASTRA SOBRE MI LOS ICONOS DE LA BARRA DE<br/>HERRAMIENTAS PARA CREAR UNA ACTIVIDAD</p>
            </div>
            <div className={classes.Trash}></div>
        </Droppable>
      </div>
    
  )

}


export default connect(mapStateToProps, {createItem, moveItem, resizeItem})(EditionArea);