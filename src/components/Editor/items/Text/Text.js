import React from 'react';
import { connect } from 'react-redux';

import Token from '../Token/Token';
import classes from './Text.module.css';
import {changeItemProps} from '../../../../store/reducers/exercises';

const mapStateToProps = (state) => {
  const currentExercise = state.currentExerciseReducer.index;
  return {
    currentExercise: currentExercise
  }
}

const Text = (props) => {

  const changeText = (e) => {
    const propsClone = {...props.item.props}
    propsClone.text = e.target.value;
    props.changeItemProps(props.currentExercise, props.itemIndex, propsClone)
  }

  
  return(

    <Token
      type={'TEXT'}
      item={props.item}
      title={'Texto'}
      itemIndex={props.itemIndex}>

      <div className={classes.TextContainer} >
        <textarea placeholder="<Excriba aquí el texto>" onChange={changeText}/>
      </div>

    </Token>
  )

}


export default connect(mapStateToProps, {changeItemProps})(Text);