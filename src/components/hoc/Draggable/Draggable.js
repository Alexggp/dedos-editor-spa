import React from 'react';
import { useDrag } from 'react-dnd'


const Draggable = (props) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: props.type,
    item: {name: props.type},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        // alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    })
  }))
  const style = {
    cursor: 'move',
    opacity: isDragging ? '0.4' : '1'
  }

  return(
    <div className='Draggable' ref={drag} style={style} data-testid={props.type}>  
      {props.children}
    </div>
  )
}


export default Draggable;