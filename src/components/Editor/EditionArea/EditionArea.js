import React from 'react';


import classes from './EditionArea.module.css';
import Zone from '../items/Zone/Zone';
import Image from '../items/Image/Image';
import Text from '../items/Text/Text';

import Droppable from '../../hoc/Droppable/Droppable';


const EditionArea = (props) => {


  return(
    
      <div className={classes.EditionArea}>
        <Droppable accept={['Tool1','Tool2']} type="Dustbin">
          <div className={classes.WelcomeText}>
            <Zone/>
            <Image/>
            <Text/>
            <p>SOY EL ÁREA DE EDICIÓN:</p>
            <p>ARRASTRA SOBRE MI LOS ICONOS DE LA BARRA DE<br/>HERRAMIENTAS PARA CREAR UNA ACTIVIDAD</p>
          </div>
          <div className={classes.Trash}></div>
        </Droppable>
      </div>
    
  )

}


export default EditionArea;