import React, {useEffect} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import classes from './App.module.css';
import EditionPage from './pages/EditorPage/EditionPage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NotFound from './pages/NotFound/NotFound';
import ErrorBanner from './components/ErrorBanner/ErrorBanner';
import { useTranslation } from 'react-i18next'

const App = (props) => {
  const token = useSelector(state => state.user.token);
  const locale = useSelector(state => state.user.locale);

  const root = !token ? <Navigate replace to='/login' /> : <Navigate replace to='/projects' />;

  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(locale);
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <Routes>
        <Route path='/' element={root} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/editor/:projectId/:activityId' element={<EditionPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ErrorBanner></ErrorBanner>
    </>
  );
}


export default App;
