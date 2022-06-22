import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Modal from '../hoc/Modal/Modal';
import { createProject, updateProject } from '../../store/actions/projects';

const ProjectForm = (props) => {
  const dispatch = useDispatch();

  const [projectData, setProjectaDta] = useState({});

  useEffect(() => {
    setProjectaDta(props.data);
  }, [props.data]);

  const send = ()=>{
    if(!projectData.title) {
      setProjectaDta({...projectData, error:true})
      return;
    } 
    if (props.data.title){
      dispatch(updateProject(projectData));
      props.close();
    } else {
      dispatch(createProject(0, projectData.title, projectData.description));
      props.close();
    }
  }

  return(
   <Modal open={props.open} close={props.close}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '300px' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          error = {projectData.error}
          id="projectTitle"
          label="Título"
          value={projectData.title}
          onChange={(e)=>setProjectaDta({...projectData, title:e.currentTarget.value})}
        />
        <TextField
          multiline
          minRows={4}
          maxRows={10}
          id="descriptionTitle"
          label="Descripción"
          value={projectData.description}
          onChange={(e)=>setProjectaDta({...projectData, description:e.currentTarget.value})}
        />
        <Stack spacing={2} direction="row">
        <Button variant="outlined" onClick={props.close}>Cancelar</Button>
        <Button variant="contained" onClick={send}>Aceptar</Button>
      </Stack>
     </Box>
   </Modal>
  )

}


export default ProjectForm;