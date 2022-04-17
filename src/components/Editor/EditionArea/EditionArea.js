import React from 'react';

import classes from './EditionArea.module.css';
import Zone from '../items/Zone/Zone';
import Image from '../items/Image/Image';

const EditionArea = (props) => {

  return(
    <div className={classes.EditionArea}>
      <div className={classes.WelcomeText}>
        <Zone/>
        <Image/>
        <p>SOY EL ÁREA DE EDICIÓN:</p>
        <p>ARRASTRA SOBRE MI LOS ICONOS DE LA BARRA DE<br/>HERRAMIENTAS PARA CREAR UNA ACTIVIDAD</p>
      </div>
      <div className={classes.Trash}></div>
    </div>
  )

}


export default EditionArea;