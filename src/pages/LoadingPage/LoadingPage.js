import CircularProgress from '@mui/material/CircularProgress';
import classes from './LoadingPage.module.css';

const LoadingPage = () => {
  return (
    <div className={classes.LoadingPage} >
      <CircularProgress size={100} sx={{ color: 'blue.500' }} />
      <h3>Cargando...</h3>
    </div>

  );
}


export default LoadingPage;
