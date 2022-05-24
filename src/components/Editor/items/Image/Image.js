import React from 'react';
import { connect } from 'react-redux';

import Token from '../Token/Token';
import classes from './Image.module.css';
import removeIcon from '../../../../assets/icons/removeIcon.png';
import {updateToken} from '../../../../store/reducers/tokens';

const Image = (props) => {

  const stopPropagation = (e) =>{
    e.stopPropagation();
  }

  const addImage = (e) =>{
    const image="https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png";
    const auxToken = {...props.token}
    auxToken.content.urlList.push(image);
    props.updateToken(props.token.id, auxToken);
  }

  const removeImage = (index) =>{
    const auxToken = {...props.token}
    auxToken.content.urlList.splice(index,1);
    props.updateToken(props.token.id, auxToken);
  }

  let images;
  if (props.token.content.urlList) {
    images = props.token.content.urlList.map((imgSrc, index)=>(
      <div className={classes.ImageBox} key={index}>
        <img className={classes.Image} src={imgSrc} alt='' />
        <img className={classes.RemoveImg} src={removeIcon} onClick={()=>removeImage(index)} title='Eliminar imagen' alt=''/>
      </div>
    ))
  }

  const addButton = <div className={classes.AddButton} onMouseDown={stopPropagation} onClick={addImage}></div>

  return(

      <Token
        type={'IMAGE'}
        token={props.token}
        title={'Imagen'}
        addButton={addButton}>
          
        <div className={classes.ImageContainer} >
          {images}
        </div>

      </Token>
  )

}

export default connect(null, {updateToken})(Image);