import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { getProjects, deleteProject, createProject, updateProject, getProjectData, downloadProject } from '../../store/actions/projects';
import classes from './ProjectsPage.module.css';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import UserMenu from '../../components/UserMenu/UserMenu';
import LocaleMenu from '../../components/LocaleMenu/LocaleMenu';
import LoadingPage from '../LoadingPage/LoadingPage';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProjectAddCard from '../../components/ProjectAddCard/ProjectAddCard';

const ProjectsPage = () => {
  const { t } = useTranslation('global');
  const navigate = useNavigate();
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    // If there is no token, redirects to login page
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const emptyForm = {
    title: '',
    description: '',
    _id: '',
    error: false
  }
  const [formIsOpen, openForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const projectList = useSelector(state => state.projects.projectList);
  const dispatch = useDispatch();

  useEffect(() => {
    // fetching data
    (async () => {
      setLoading(true);
      await dispatch(getProjects());
      setLoading(false);
    })();
  }, [dispatch]);

  const showForm = (pr) => {
    setFormData({ ...formData, ...pr });
    openForm(true);
  }

  const deleteHandler = (projectId) => {
    dispatch(deleteProject(projectId));
  }

  const sendHandler = () => {
    if (formData._id) {
      dispatch(updateProject(formData));
      openForm(false);
    } else {
      dispatch(createProject(formData.title, formData.description));
      openForm(false);
    }
  }

  const downloadHandler = (project) => {
    downloadProject(project);
  }

  const selectedProjectHandler = async (projectId) => {
    setLoading(true);
    const projectData = await dispatch(getProjectData(projectId));
    navigate(`/editor/${projectId}/${projectData.activities[0]._id}`);
  }

  const boxStyle = {
    flexGrow: 1,
    width: '75%',
    height: '50%'
  };

  const projects = projectList.map(pr => (
    <ProjectCard 
      pr={pr}
      downloadHandler={downloadHandler}
      showForm={showForm}
      deleteHandler={deleteHandler}
      selectedProjectHandler={selectedProjectHandler}
    />
  ))

  projects.push(
    <ProjectAddCard showForm={showForm} emptyForm={emptyForm}/>
  )

  return (
    <>
      {
        loading ?
          <LoadingPage />
          :
          <div className={classes.ProjectsPage}>
            <ProjectForm
              isOpen={formIsOpen}
              formData={formData}
              setFormData={setFormData}
              send={sendHandler}
              close={() => openForm(false)} />
            <div className={classes.Header}>
              <h1>
                {t('projectsPage.title')}
              </h1>
            </div>
            <Box sx={boxStyle}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {projects}
              </Grid>
            </Box>
            <div className={classes.MenuUser}>
              <LocaleMenu />
              <UserMenu />
            </div>
          </div>
      }
    </>

  );
}


export default ProjectsPage;
