import React, { useState, useContext, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField, Button, Grid, Typography, MenuItem, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../auth/AuthContext';

const OfferDialog = ({ open, handleClose, addOffer, offerToEdit, updateOffer }) => {

  const { user } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    link_offer: '',
    stack_required: '',
    notes: '',
    interest: '',
    modality: '',
    created_at: new Date().toISOString().slice(0, 10)
  });
  console.log('Current user:', user);

  useEffect(() => {
    if (offerToEdit) {
      setFormValues(offerToEdit);
    }
  }, [offerToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (!user || !user.id || !user.token) {
      console.error('User information is missing!');
      return;
    }

    const offerData = {
      ...formValues,
      user_id: user.id,
    };

    try {
      const response = await fetch('http://localhost:3000/api/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(offerData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      addOffer(result);
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
            <Typography variant="h6">{offerToEdit ? 'Edit Job Offer' : 'Create Job Offer'}</Typography>
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
      <TextField
          value={formValues.title}
          onChange={handleInputChange}
          name="title"
          fullWidth
          sx={{
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#003366',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <InputLabel required htmlFor="company">Company name</InputLabel>
        <TextField
          value={formValues.company}
          onChange={handleInputChange}
          name="company"
          fullWidth
          sx={{
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#003366',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <InputLabel htmlFor="location">Location</InputLabel>
        <TextField
          value={formValues.location}
          onChange={handleInputChange}
          name="location"
          fullWidth
          sx={{
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#003366',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <InputLabel required htmlFor="link_offer">Link offer</InputLabel>
        <TextField
          value={formValues.link_offer}
          onChange={handleInputChange}
          name="link_offer"
          fullWidth
          sx={{
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#003366',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <InputLabel htmlFor="stack_required">Stack required</InputLabel>
        <TextField
          value={formValues.stack_required}
          onChange={handleInputChange}
          name="stack_required"
          fullWidth
          sx={{
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#003366',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <InputLabel htmlFor="description">Job description</InputLabel>
        <TextField
          value={formValues.description}
          onChange={handleInputChange}
          name="description"
          fullWidth
          multiline
          rows={4}
          sx={{
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#003366',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <InputLabel htmlFor="notes">Notes</InputLabel>
        <TextField
          value={formValues.notes}
          onChange={handleInputChange}
          name="notes"
          fullWidth
          multiline
          rows={2}
          sx={{
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#003366',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#003366',
              },
            },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Creation Date*"
              value={formValues.created_at}
              name="created_at"
              fullWidth
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Interest"
              select
              value={formValues.interest}
              name="interest"
              onChange={handleInputChange}
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
              value={formValues.modality}
              name="modality"
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            >
              <MenuItem value="hybrid">Hybrid</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="onsite">Presential</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="flex-end" marginTop={2}>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              mt: 10, mb: 2, backgroundColor: '#003366', boxShadow: 'none', fontWeight: 'bold',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: '#003366',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 10, mb: 2, marginX: '20px', backgroundColor: '#003366', boxShadow: 'none', fontWeight: 'bold',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: '#003366',
              },
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default OfferDialog;
