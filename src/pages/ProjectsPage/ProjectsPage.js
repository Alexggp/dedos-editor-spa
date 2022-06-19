import React from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import classes from './ProjectsPage.module.css';
import addIcon from '../../assets/icons/addIcon.png';



const ProjectsPage = (props) => {

  const projectList = useSelector(state => state.projects.projectList);

  const cardStyle = {
    // width: "250px",
    height: "200px"
  };

  const boxStyle = { 
    flexGrow: 1, 
    width: '75%', 
    height: '50%'
  };

  const projects = projectList.map(pr=>(
    <Grid item xs={2} sm={4} md={4} key={pr._id}>
      <Card onClick={event => console.log("clicked")}>
        <CardActionArea>
          <CardContent style={cardStyle}>
            <Typography gutterBottom variant="h5" component="div">
              {pr.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pr.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  ))

  projects.push(
    <Grid item xs={2} sm={4} md={4} key={'Insert'}>
      <Card onClick={event => console.log("clicked")}>
        <CardActionArea>
          <CardContent style={cardStyle}>
            <Typography gutterBottom variant="h5" component="div">
              Crear nuevo...
            </Typography>
            <Typography style={{display:"flex", alignItems: "center", justifyContent: "center", paddingTop: "5%"}}>
              <img className={classes.AddIcon} src={addIcon} title='Nuevo proyecto' alt=''/>
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
