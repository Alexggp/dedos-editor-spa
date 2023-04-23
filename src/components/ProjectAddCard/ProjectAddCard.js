import React from 'react';
import { useTranslation } from 'react-i18next';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const ProjectAddCard = ({showForm, emptyForm}) => {
  const { t } = useTranslation('global');


  return (
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
  );
}


export default ProjectAddCard;
