import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import classes from './LoadingPage.module.css';

const LoadingPage = () => {
  const { t } = useTranslation('global');
  return (
    <div className={classes.LoadingPage} >
      <CircularProgress size={100} sx={{ color: 'blue.500' }} />
      <h3>{t('loadingPage.loading')}...</h3>
    </div>

  );
}


export default LoadingPage;
