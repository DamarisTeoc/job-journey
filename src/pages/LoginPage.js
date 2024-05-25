import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, InputLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../auth/AuthContext';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(credentials);
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <Container sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, width: '400px'}}>
        
        <AccountCircleIcon sx={{ m: 1, color: '#8B8C89', height: '100px', width:'100px' }}/>
        
        <Typography variant="h4">Login</Typography>
        <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
        <InputLabel required htmlFor="description-required">Username</InputLabel>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="username"
            name="username"
            autoComplete="username"
            autoFocus
            value={credentials.username}
            onChange={handleInputChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#003366', 
                },}}}
          />
          <InputLabel required htmlFor="password-required">Password</InputLabel>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleInputChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#003366', 
                },}}}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{mt: 3, mb: 2, backgroundColor: '#003366',boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: '#003366',
                },
              }}>
              Log In
            </Button>
          </Box>
          <Button
            fullWidth
            variant="text"
            sx={{ color:'#003366'}}
            onClick={handleGoToRegister}
          >
            Don't have an account? Register
          </Button>
        </Box>
        </Container>
  );
};

export default LoginPage;
