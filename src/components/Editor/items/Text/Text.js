import React from 'react';
import { connect } from 'react-redux';

import Token from '../Token/Token';
import classes from './Text.module.css';
import {updateToken} from '../../../../store/reducers/tokens';

const Text = (props) => {

  const changeText = (e) => {
    const auxToken = {...props.token}
    auxToken.content.text = e.target.value;
    props.updateToken(props.token.id, auxToken);
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


export default connect(null, {updateToken})(Text);