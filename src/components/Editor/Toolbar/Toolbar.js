import React from 'react';
import { useNavigate } from 'react-router';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import classes from './Toolbar.module.css';
import Draggable from '../../../hoc/Draggable/Draggable';

import UserMenu from '../../UserMenu/UserMenu';

import addAreaIcon from '../../../assets/icons/addAreaIcon.png';
import addTextIcon from '../../../assets/icons/addTextIcon.png';
import addImageIcon from '../../../assets/icons/addImageIcon.png';
import dartboardIcon from '../../../assets/icons/dartboardIcon.png';
import pairIcon from '../../../assets/icons/pairIcon.png';
import addPathIcon from '../../../assets/icons/addPathIcon.png';
import abacusIcon from '../../../assets/icons/abacusIcon.png';
import clockIcon from '../../../assets/icons/clockIcon.png';


const Toolbar = (props) => {
  const navigate = useNavigate();

  const goToProjects = () =>{
    navigate(`/projects`);
  }

  return(
    <div className={classes.Toolbar}>
      <div className={classes.ButtonArea} title='Arrástrame al área de edición para crear una Zona'>
        <div className={classes.Button}>
            <Draggable type={'AddArea'}>
              <img alt='' src={addAreaIcon}/>
            </Draggable>
        </div>
      </div>
      <div className={classes.ButtonArea}>
        <div className={classes.Button} title='Arrástrame al área de edición para crear una tarjeta de texto'>
            <Draggable type={'AddText'}>
              <img alt='' src={addTextIcon}/>
            </Draggable>
        </div>
        <div className={classes.Button} title='Arrástrame al área de edición para crear una tarjeta de imágenes'>
            <Draggable type={'AddImage'}>
              <img alt='' src={addImageIcon}/>
            </Draggable>
        </div>
      </div>
      <div className={classes.ButtonArea} title='Arrástrame a una tarjeta para crear un objetivo de selección'>
        <div className={classes.Button}>
            <Draggable type={'Selection'}>
              <img alt='' src={dartboardIcon}/>
            </Draggable>
        </div>
        <div className={classes.Button} title='Arrástrame a una tarjeta o zona para crear un objetivo de emparejamiento'>
            <Draggable type={'Pairing'}>
              <img alt='' src={pairIcon}/>
            </Draggable>
        </div>
        <div className={classes.Button} title='Arrástrame a una tarjeta para crear un objetivo de caminos'>
            <Draggable type={'Path'}>
              <img alt='' src={addPathIcon}/>
            </Draggable>
        </div>
        <div className={classes.Button} title='Contador de tarjetas'>
            <Draggable type={'Counter'}>
              <img alt='' src={abacusIcon}/>
            </Draggable>
        </div>
      </div>
      <div className={classes.ButtonArea} title='Arrástrame al área de edición para añadir límite de tiempo a la actividad'>
        <div className={classes.Button}>
            <Draggable type={'Timer'}>
              <img alt='' src={clockIcon}/>
            </Draggable>
        </div>
      </div>
      <div className={classes.Controls}>
        <Tooltip title="Todos los projectos" onClick={goToProjects}>
          <IconButton aria-label="Todos los projectos">
            <AppsOutlinedIcon sx={{ fontSize: 50 }}/>
          </IconButton>
        </Tooltip>
        <UserMenu />
      </div>
    </div>
  )

}


export default Toolbar;