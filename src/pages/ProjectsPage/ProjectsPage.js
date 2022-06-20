import React, {useEffect} from 'react';
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';

import { getProjects } from '../../store/actions/projects';
import classes from './ProjectsPage.module.css';



const ProjectsPage = (props) => {


  const projectList = useSelector(state => state.projects.projectList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects(0));
  }, [dispatch]);



  const selectedProject = (projectId) => {
    navigate(`/editor/${projectId}`);
  }

  const boxStyle = { 
    flexGrow: 1, 
    width: '75%', 
    height: '50%'
  };

  const projects = projectList.map(pr=>(
    <Grid item xs={2} sm={4} md={4} key={pr._id}>
      <Card >
        <CardActionArea onClick={() => selectedProject(pr._id)}>
          <CardContent sx={{height: "145px"}}>
            <Typography gutterBottom variant="h5" component="div">
              {pr.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pr.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions  disableSpacing sx={{display: "flex", justifyContent: "flex-end"}}>
          <Tooltip title="Editar">
            <IconButton aria-label="Editar">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton aria-label="Eliminar">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>
  ))

  projects.push(
    <Grid item xs={2} sm={4} md={4} key={'Insert'}>
      <Card onClick={event => console.log("clicked")}>
        <CardActionArea>
          <CardContent sx={{height: "200px"}}>
            <Typography gutterBottom variant="h5" component="div">
              Crear nuevo...
            </Typography>
            <Typography style={{display:"flex", alignItems: "center", justifyContent: "center", paddingTop: "5%"}}>
              <AddCircleOutlineIcon sx={{ fontSize: 120 }}/>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )

  return (
    <div className={classes.ProjectsPage}> 
      <div className={classes.Header}>
        <h1>
          Proyectos
        </h1>
      </div>
      <Box sx={boxStyle}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {projects}
        </Grid>
      </Box>
    </div>

  );
}


export default ProjectsPage;
