import React  from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// import classes from './App.module.css';
import EditionPage from './pages/EditorPage/EditionPage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import NotFound from './pages/NotFound/NotFound';

const App = (props) => {

  
  return (

    <Routes>
      <Route path='/' element={<Navigate replace to='/projects' />} />
      <Route path='/projects' element={<ProjectsPage />} />
      <Route path='/editor/:projectId' element={<EditionPage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}


export default App;
