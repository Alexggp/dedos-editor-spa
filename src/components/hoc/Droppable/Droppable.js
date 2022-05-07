import React from 'react';
import { useDrop } from 'react-dnd';


const Droppable = (props) => {

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
  }))
  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  const style = props.style || {
    with: '100%',
    height: '100%'
  }
  
  return(
    <div className='Droppable' ref={drop} style={{...style,...{ backgroundColor }}} data-testid={props.type}>  
      {props.children}
    </div>
  )

}


export default Droppable;