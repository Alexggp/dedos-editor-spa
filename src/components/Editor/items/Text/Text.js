import React from 'react';
import { connect } from 'react-redux';

import Token from '../Token/Token';
import classes from './Text.module.css';
import {changeItemProps} from '../../../../store/reducers/activities';

const mapStateToProps = (state) => {

}

const Text = (props) => {

  const changeText = (e) => {
    const propsClone = {...props.item.props}
    propsClone.text = e.target.value;
    props.changeItemProps(props.currentActivity, props.itemIndex, propsClone)
  }

  
  return(

    <Token
      type={'TEXT'}
      token={props.token}
      title={'Texto'}>

      <div className={classes.TextContainer} >
        <textarea 
          placeholder="<Excriba aquí el texto>" 
          value={props.token.content.text}
          onChange={changeText}/>
      </div>

    </Token>
  )

}


export default connect(mapStateToProps, {changeItemProps})(Text);