import React, {useState} from 'react';
import { Grid, Paper, Button, Typography, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import OfferDialog from '../components/OfferDialog';

const stages = [
  "Applied", "Under review", "First interview", "Second interview",
  "Technical test", "Offer extended", "Offer declined", "Rejected"
];

const Dashboard = () => {
  const styles = {
    fullHeight: {
      height: '100vh', 
    
      display: 'flex',
      flexDirection: 'column',
    },
    fullHeightGrid: {
      height: '100vh', 
      display: 'flex',
      flexDirection: 'row',
      margin: '10px',
    },
    column: {
      flexGrow: 1, 
      backgroundColor: '#E0E0E0',
      
    },
    title: {
      backgroundColor: 'white',
      padding: 14,
      borderRadius: 3,
    },
    offerExtended: {
      backgroundColor: '#A9DBC8',
    },
    rejected: {
      backgroundColor: '#FFC2C2', 
    }
  };

  const getBackgroundColor = (stage) => {
    if (stage === "Offer extended") return styles.offerExtended;
    if (stage === "Rejected") return styles.rejected;
    return styles.column;
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} style={styles.fullHeightGrid}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleOpenDialog}  sx={{mt: 10, mb: 2, backgroundColor: '#003366', boxShadow: 'none', fontWeight: 'bold',
                '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: '#003366',
                },
              }}>
              <AddIcon />
            Add offer
          </Button>
          <OfferDialog open={isDialogOpen} handleClose={handleCloseDialog} />
        </Grid>
        {stages.map((stage, index) => (
          <Grid item xs={12} sm={6} md style={styles.fullHeight}>
            <Paper elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column',   borderRadius: 3, ...getBackgroundColor(stage)  }}>
              <Typography variant="h6" style={styles.title}>
                {stage}
              </Typography>
              {/* Placeholder for list items */}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


export default Dashboard;
