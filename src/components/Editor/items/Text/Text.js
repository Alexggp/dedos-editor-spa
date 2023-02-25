import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Token from '../Token/Token';
import classes from './Text.module.css';
import { updateToken } from '../../../../store/actions/tokens';


const Text = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('global');

  const changeText = (e) => {
    const auxToken = {...props.token}
    auxToken.content = {
      ...auxToken.content,
      text: e.target.value
    }
    dispatch(updateToken(auxToken));
  }

  
  return(
    <Token
      type={'TEXT'}
      token={props.token}
      area = {props.area}
      title={t('items.text.title')}>

      <div className={classes.TextContainer} >
        <textarea 
          placeholder= {'<' + t('items.text.textarea') + '>'}
          value={props.token.content.text}
          onChange={changeText}/>
      </div>

    </Token>
  )

}


export default Text;