import React from 'react';
import { useDispatch } from 'react-redux';

import Token from '../Token/Token';
import classes from './Image.module.css';
import removeIcon from '../../../../assets/icons/removeIcon.png';
import { updateToken } from '../../../../store/actions/tokens';
import FileLoaer from '../../../FileLoader/FileLoader';

const Image = (props) => {
  const dispatch = useDispatch();

  const addImage = (imageUrl) => {
    const auxToken = { ...props.token }
    auxToken.content = {
      ...auxToken.content,
      urlList: [...auxToken.content.urlList, ...[imageUrl]]
    };
    dispatch(updateToken(auxToken));
  }

  const removeImage = (index) => {
    const auxToken = { ...props.token }
    const auxList = [...auxToken.content.urlList]
    auxList.splice(index, 1);
    auxToken.content = {
      ...auxToken.content,
      urlList: auxList
    };
    dispatch(updateToken(auxToken));
  }

  let images;
  if (props.token.content.urlList) {
    images = props.token.content.urlList.map((imgSrc, index) => (
      <div className={classes.ImageBox} key={index}>
        <img className={classes.Image} src={imgSrc} alt='' />
        <img className={classes.RemoveImg} src={removeIcon} onClick={() => removeImage(index)} title='Eliminar imagen' alt='' />
      </div>
    ))
  }

  const addButton = (
    <div className={classes.AddButton}>
      <FileLoaer itemId={props.token._id} onLoad={addImage} />
    </div>
  )

  return (

    <Token
      type={'IMAGE'}
      token={props.token}
      title={'Imagen'}
      area={props.area}
      addButton={addButton}>

      <div className={classes.ImageContainer} >
        {images}
      </div>

    </Token>
  )

}

export default Image;