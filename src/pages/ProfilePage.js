import React, { useState, useContext, useEffect } from 'react';
import { Container, Box, TextField, Button, Typography, InputLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout, deleteUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ username: '', password: '' });

  useEffect(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    setCredentials({ username: username || '', password: password ? '********' : '' });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser();
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account:', error.message);
    }
  };

  if (!user) {
    return (
      <Container sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, width: '400px' }}>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, width: '400px' }}>
      <AccountCircleIcon sx={{ m: 1, color: '#8B8C89', height: '100px', width: '100px' }} />
      <Typography variant="h4">Profile</Typography>
      <Box component="form" sx={{ mt: 1 }}>
        <InputLabel htmlFor="username">Username</InputLabel>
        <TextField
          variant="outlined"
          fullWidth
          id="username"
          name="username"
          value={credentials.username}
          disabled
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <InputLabel htmlFor="password">Password</InputLabel>
        <TextField
          variant="outlined"
          fullWidth
          name="password"
          type="password"
          value={credentials.password}
          disabled
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#003366', boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: '#003366',
              },
            }}
            onClick={handleLogout}
          >
            Log Out
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#003366', boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: '#003366',
              },
            }}
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
