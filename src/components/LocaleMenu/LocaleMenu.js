import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import Flag from 'react-world-flags'

import { userActions } from '../../store/reducers/user';



const LocaleMenu = (props) => {
  const dispatch = useDispatch();
  const locale = useSelector(state => state.user.locale);

  const handleChange = (event) => {
    dispatch(userActions.changeLocale(event.target.value));
  };
  return (
    <>
     <Select
          id="locale-select"
          value={locale}
          onChange={handleChange}
        >
          <MenuItem value={'es'}><Flag height="20" width="25" code="es" /></MenuItem>
          <MenuItem value={'en'}><Flag  height="20" width="25" code="gb" /></MenuItem>
      </Select>
    </>
  );
}


export default LocaleMenu;
