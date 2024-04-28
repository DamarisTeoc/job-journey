import React from 'react';
import { Container, Box, TextField, Button, Typography, InputLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Register = () => {
  return (
    <Container sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, width: '400px'}}>
        <AccountCircleIcon sx={{ m: 1, color: '#8B8C89', height: '100px', width:'100px' }}/>
        <Typography  variant="h4">
          Register
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
        <InputLabel required htmlFor="username-required">Username</InputLabel>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="username"
            name="username"
            autoComplete="username"
            autoFocus
            sx={{marginBottom: '15px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#003366', 
                },}, }}
          />
          <InputLabel required htmlFor="email-required">Email</InputLabel>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="email"
            type="email"
            id="email"
            autoComplete="email"
            sx={{marginBottom: '15px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#003366', 
                },}}}
          />
          <InputLabel required htmlFor="email-required">Password</InputLabel>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
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
            sx={{ mt: 3, mb: 2, backgroundColor: '#003366',boxShadow: 'none',
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

export default Register;