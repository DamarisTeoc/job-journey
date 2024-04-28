import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const NavBar = () => {
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate('/about');
  };


  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{backgroundColor:'#003366'}}>
        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold', fontSize:'24px' }}>
          JOBJOURNEY
        </Typography>
        <Button color="inherit" onClick={handleAboutClick} style={{fontWeight: 'bold', fontSize:'16px' }} sx={{ marginX: 3 }}>
          About
        </Button>
        <IconButton color="inherit">
          <AccountBoxIcon />
        </IconButton>
        <IconButton color="inherit">
          <Settings />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
