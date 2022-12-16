import React from 'react';
import { useDrop } from 'react-dnd';


const Droppable = (props) => {
  
  // eslint-disable-next-line 
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: props.accept,
    // drop: () => ({ name: props.type }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item, monitor) =>{
      props.dropped(item.name, monitor.getClientOffset())
      return { name: props.type }
    }
  }), [props.activityId])

  const style = props.style || {
    width: '100%',
    height: '100%'
  }
  
  return(
    <div className='Droppable' ref={drop} style={style} data-testid={props.type}>  
      {props.children}
    </div>
  )

}


export default Droppable;