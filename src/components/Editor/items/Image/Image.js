import React from 'react';
import { connect } from 'react-redux';

import Token from '../Token/Token';
import classes from './Image.module.css';
// import {changeItemProps} from '../../../../store/reducers/activities';

const mapStateToProps = (state) => {
  const currentActivity = state.currentActivityReducer.index;
  return {
    currentActivity: currentActivity
  }
}

const Image = (props) => {

  const stopPropagation = (e) =>{
    e.stopPropagation();
  }

  const addImage = (e) =>{
    const image="https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png";
    const images = [...(props.item.props.images || [])]
    const propsClone = {...props.item.props}
    images.push(image);
    propsClone.images = images;
    props.changeItemProps(props.currentActivity, props.itemIndex, propsClone)

  }



  let images;

  if (props.token.content.urlList) {
    images = props.token.content.urlList.map((imgSrc, index)=>(
      <img src={imgSrc} alt='' key={index}/>
    ))
  }

const addButton = <div className={classes.AddButton} onMouseDown={stopPropagation} onClick={addImage}></div>

  return(

      <Token
        type={'IMAGE'}
        token={props.token}
        title={'Imagen'}
        addButton={addButton}
        addImage={addImage}>
          
        <div className={classes.ImageContainer} >
          {images}
        </div>

      </Token>
  )

}

export default connect(mapStateToProps, null)(Image);