import React from 'react';
import { useTranslation } from 'react-i18next';

import Token from '../TokenMin/TokenMin';
import classes from './TextMin.module.css';

const TextMin = (props) => {
  const { t } = useTranslation('global');
  
  return(
    <Token
      type={'TEXT'}
      token={props.token}
      title={t('items.text.title')}>

      <div className={classes.TextContainer} >
        {props.token.content.text}
      </div>

    </Token>
  )

}


export default TextMin;