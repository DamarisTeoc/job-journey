import React from 'react';
import { Card, CardContent, Typography, Button, IconButton, Box, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

const OfferCard = ({ offer, onEdit, onDelete }) => {
  return (
    <Grid item lg={3}  m={2}>
    <Card m={6} sx={{ borderRadius: 2, padding: 2, width: "8rem", height:"13rem", display:"flex", flexDirection: "column",justifyContent:"center", alignItems:"center", position: "relative"}}>
      <IconButton
        size="small"
        onClick={() => onDelete(offer.offer_id)}
        sx={{ position:"absolute",top: 0, right: 0, paddingTop: 1 }}
      >
        <CloseIcon />
      </IconButton>
      <CardContent>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}><a href={offer.link_offer} target="_blank" rel="noopener noreferrer">{offer.title}</a></Typography>
        </Box>
        <Typography variant="body2"  align="center">{offer.company}</Typography>
        <Typography variant="body2"  align="center">{offer.location}</Typography>
        <Typography variant="body2"  align="center">{new Date(offer.created_at).toLocaleDateString()}</Typography>
      </CardContent>
      <Box display="flex" justifyContent="center"  alignItems="center" pb={2}>
      <Button variant="contained" size="small" sx={{ backgroundColor: '#003366', boxShadow: 'none', fontWeight: 'bold',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: '#003366',
        },}} onClick={() => onEdit(offer)}>
        <EditIcon sx={{ marginRight: 0.5 }}/>Edit</Button>
        </Box>
    </Card>
    </Grid>
  );
};

export default OfferCard;
