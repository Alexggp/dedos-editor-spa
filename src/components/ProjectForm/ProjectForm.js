import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Modal from '../../hoc/Modal/Modal';

const ProjectForm = ({
  isOpen,
  formData,
  setFormData,
  send,
  close
}) => {

  const acceptHandler = ()=>{
    if(!formData.title) {
      setFormData({...formData, error:true})
      return;
    } 
    send();
  }

  return(
   <Modal open={isOpen} close={close}>
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
          error = {formData.error}
          id="projectTitle"
          label="Título"
          value={formData.title}
          onChange={(e)=>setFormData({...formData, title:e.currentTarget.value})}
        />
        <TextField
          multiline
          minRows={4}
          maxRows={10}
          id="descriptionTitle"
          label="Descripción"
          value={formData.description}
          onChange={(e)=>setFormData({...formData, description:e.currentTarget.value})}
        />
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={close}>Cancelar</Button>
          <Button variant="contained" onClick={acceptHandler}>Aceptar</Button>
        </Stack>
     </Box>
   </Modal>
  )
}


export default ProjectForm;