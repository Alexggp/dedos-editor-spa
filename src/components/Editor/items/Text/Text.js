import React from 'react';
import { connect } from 'react-redux';

import Token from '../Token/Token';
import classes from './Text.module.css';
import {updateText} from '../../../../store/reducers/tokens';

const Text = (props) => {

  const changeText = (e) => {
    const newText = e.target.value;
    props.updateText(props.token.id, newText);
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


export default connect(null, {updateText})(Text);