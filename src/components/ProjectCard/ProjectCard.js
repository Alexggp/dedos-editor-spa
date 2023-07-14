import React from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';
import { CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ProjectCard = ({
    pr, 
    downloadHandler, 
    showForm, 
    deleteHandler, 
    selectedProjectHandler}) => {
  const { t } = useTranslation('global');


  return (
    <Grid item xs={2} sm={4} md={4} key={pr._id}>
      <Card sx={{ background: "#dceaf1" }}>
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
  );
}


export default ProjectCard;
