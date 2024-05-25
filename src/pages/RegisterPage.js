import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, InputLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../auth/AuthContext';

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <Container sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, width: '400px' }}>
      <AccountCircleIcon sx={{ m: 1, color: '#8B8C89', height: '100px', width: '100px' }} />
      <Typography variant="h4">Register</Typography>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
        <InputLabel required htmlFor="username">Username</InputLabel>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="username"
          name="username"
          autoComplete="username"
          autoFocus
          value={form.username}
          onChange={handleChange}
          sx={{
            marginBottom: '15px',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <InputLabel required htmlFor="email">Email</InputLabel>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="email"
          type="email"
          id="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          sx={{
            marginBottom: '15px',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <InputLabel required htmlFor="password">Password</InputLabel>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          type="password"
          id="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
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
            type="submit"
            variant="contained"
            sx={{
              mt: 3, mb: 2, backgroundColor: '#003366', boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: '#003366',
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
