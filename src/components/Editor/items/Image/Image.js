import React from 'react';
import { connect } from 'react-redux';

import Token from '../Token/Token';
import classes from './Image.module.css';
import removeIcon from '../../../../assets/icons/removeIcon.png';
import {updateImages} from '../../../../store/reducers/tokens';

const Image = (props) => {

  const stopPropagation = (e) =>{
    e.stopPropagation();
  }

  const addImage = (e) =>{
    const image="https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png";
    const imageList = [...props.token.content.urlList];
    imageList.push(image);
    props.updateImages(props.token.id, imageList);
  }

  const removeImage = (index) =>{
    const imageList = [...props.token.content.urlList];
    imageList.splice(index,1);
    props.updateImages(props.token.id, imageList);
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

export default connect(null, {updateImages})(Image);