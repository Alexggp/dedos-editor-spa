import React from 'react';
import classes from './NotFound.module.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const NotFound = (props) => {
  const { t } = useTranslation('global');

  return (
    <div className={classes.NotFound}> 
      <h1>
        404 - NOT FOUND
      </h1>
      <h2>
        <Link to="/">{t('notFoundPage.goToHome')}</Link>
      </h2>
    </div>

  );
}


export default NotFound;
