import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';

import { getProjects, deleteProject, createProject, updateProject, getProjectData, downloadProject } from '../../store/actions/projects';
import classes from './ProjectsPage.module.css';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import UserMenu from '../../components/UserMenu/UserMenu';
import LocaleMenu from '../../components/LocaleMenu/LocaleMenu';
import LoadingPage from '../LoadingPage/LoadingPage';


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
    <Grid item xs={2} sm={4} md={4} key={pr._id}>
      <Card >
        <CardActionArea onClick={() => selectedProjectHandler(pr._id)}>
          <CardContent sx={{ height: "145px" }}>
            <Typography gutterBottom variant="h5" component="div">
              {pr.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pr.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Tooltip title="Descargar">
            <IconButton aria-label={t('projectsPage.download')} onClick={() => downloadHandler(pr)}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton aria-label={t('projectsPage.edit')} onClick={() => showForm(pr)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton aria-label={t('projectsPage.new')} onClick={() => deleteHandler(pr._id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>
  ))

  projects.push(
    <Grid item xs={2} sm={4} md={4} key={'Insert'}>
      <Card onClick={() => showForm(emptyForm)}>
        <CardActionArea>
          <CardContent sx={{ height: "200px" }}>
            <Typography gutterBottom variant="h5" component="div">
              {t('projectsPage.new')}...
            </Typography>
            <Typography style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "5%" }}>
              <AddCircleOutlineIcon sx={{ fontSize: 120 }} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
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
