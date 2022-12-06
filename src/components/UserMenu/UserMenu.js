import React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItem from '@mui/material/ListItem';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../../store/reducers/user';

const UserMenu = (props) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);  
  const open = Boolean(anchorEl);
  const user = useSelector(state => state.user.user);

  const clickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch(userActions.unset());
    handleClose();
  }

  return (
    <>
      <Avatar
        sx={{ bgcolor: "darkred", cursor: "pointer"}}
        alt={user.name}
        src="/broken-image.jpg"
        onClick={clickHandler}
        />
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <ListItem  sx={{ paddingBottom: "0px"}}>
          <ListItemIcon sx={{ minWidth: "30px"}}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{user.name}</ListItemText>
        </ListItem>
        <ListItem sx={{ paddingTop: "0px"}}>
          <ListItemIcon sx={{ minWidth: "30px"}}>
            <EmailIcon fontSize="small" />
          </ListItemIcon >
          <ListItemText>{user.email}</ListItemText>
        </ListItem>
        <Divider />
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
}


export default UserMenu;
