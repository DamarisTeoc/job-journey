import React, { useState, useContext } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Grid, Typography, MenuItem, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../auth/AuthContext';

const OfferDialog = ({ open, handleClose }) => {

  const [title, setTitle] = useState ('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [linkOffer, setLinkOffer] = useState('');
  const [stackRequired, setStackRequired] = useState('');
  const [notes, setNotes] = useState('');
  const [interest, setInterest] = useState('');
  const [modality, setModality] = useState('');
  const { user } = useContext(AuthContext);
  const [creationDate, setCreationDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSave = async () => {

    if (!user || !user.id || !user.token) {
      console.error('User information is missing!');
      return;
    }

    const offerData = {
      user_id: user.id, // Asegúrate de que `user.id` está disponible en el contexto
      title,
      description,
      company,
      location,
      link_offer: linkOffer,
      stack_required: stackRequired,
      notes,
      interest,
      modality,
      creation_date: creationDate,
    };

    try {
      const response = await fetch('http://localhost:3000/api/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Envía el token JWT en la cabecera
        },
        body: JSON.stringify(offerData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      handleClose();
    } catch (error) {
      console.error('Hubo un problema al guardar la oferta:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Create Job Offer</Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent margin="normal">
      <InputLabel required htmlFor="job title">Job title</InputLabel>
        <TextField value={title} onChange={e => setTitle(e.target.value)} fullWidth sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#003366',
          }, '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#003366',
            },
          }
        }} />
        <InputLabel required htmlFor="company-name">Company name</InputLabel>
        <TextField value={company} onChange={e => setCompany(e.target.value)} fullWidth sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#003366',
          }, '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#003366',
            },
          }
        }} />
        <InputLabel htmlFor="location">Location</InputLabel>
        <TextField onChange={e => setLocation(e.target.value)} fullWidth sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#003366',
          }, '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#003366',
            },
          }
        }} />
        <InputLabel required htmlFor="link">Link offer</InputLabel>
        <TextField onChange={e => setLinkOffer(e.target.value)} fullWidth sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#003366',
          }, '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#003366',
            },
          }
        }} />
        <InputLabel htmlFor="stack-required">Stack required</InputLabel>
        <TextField  value={stackRequired} onChange={e => setStackRequired(e.target.value)} fullWidth sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#003366',
          }, '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#003366',
            },
          }
        }} />
        <InputLabel htmlFor="job description">Job description</InputLabel>
        <TextField onChange={e => setDescription(e.target.value)}  value={description} fullWidth multiline rows={4} sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#003366',
          }, '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#003366',
            },
          }
        }} />
        <InputLabel htmlFor="notes">Notes</InputLabel>
        <TextField value={notes} onChange={e => setNotes(e.target.value)} fullWidth multiline rows={2} sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#003366',
          }, '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#003366',
            },
          }
        }} />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Creation Date*"
              value={creationDate}
              fullWidth
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Interest"
              select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Modality"
              select
              value={modality}
              onChange={(e) => setModality(e.target.value)}
              fullWidth
              margin="normal"
            >
              <MenuItem value="hybrid">Hybrid</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="onsite">Presential</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <TextField label="Benefits" fullWidth margin="normal" sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#003366',
          }, '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#003366',
            },
          }
        }} />
        <Grid container spacing={2} justifyContent="flex-end" marginTop={2}>
          <Button variant="contained" onClick={handleClose} sx={{
            mt: 10, mb: 2, backgroundColor: '#003366', boxShadow: 'none', fontWeight: 'bold',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#003366',
            },
          }}>Cancel</Button>
          <Button variant="contained" color="primary" sx={{
            mt: 10, mb: 2, marginX: '20px', backgroundColor: '#003366', boxShadow: 'none', fontWeight: 'bold',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#003366',
            },
          }} onClick={handleSave}>Save</Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default OfferDialog;
