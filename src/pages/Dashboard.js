import React, {useState, useContext, useEffect, useCallback} from 'react';
import { Grid, Paper, Button, Typography, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import OfferDialog from '../components/OfferDialog';
import { AuthContext } from '../auth/AuthContext';
import OfferCard from '../components/OfferCard'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


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
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState({});
  const [stages, setStages] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [offerToEdit, setOfferToEdit] = useState(null);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setOfferToEdit(null);
  };

  const addOffer = (offer) => {
    setOffers(prev => ({
      ...prev,
      "Applied": [...prev["Applied"], offer]
    }));
  };

  const updateOffer = (updatedOffer) => {
    setOffers(prev => {
      const newOffers = { ...prev };
      Object.keys(newOffers).forEach(stage => {
        newOffers[stage] = newOffers[stage].map(offer =>
          offer.offer_id === updatedOffer.offer_id ? updatedOffer : offer
        );
      });
      return newOffers;
    });
  };

  const handleEditOffer = (offer) => {
    setOfferToEdit(offer);
    setIsDialogOpen(true);
  };

  const handleDeleteOffer = async (offerId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/offers/${offerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      setOffers((prevOffers) => {
        const newOffers = { ...prevOffers };
        Object.keys(newOffers).forEach((stage) => {
          newOffers[stage] = newOffers[stage].filter((offer) => offer.offer_id !== offerId);
        });
        return newOffers;
      });
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/states', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
  
        const statesData = await response.json();
        const states = statesData.map((state) => state.name);
        console.log('Fetched states:', states); // Loguea los estados
        setStages(states);
  
        const initialOffers = states.reduce((acc, stage) => {
          acc[stage] = [];
          return acc;
        }, {});
  
        setOffers(initialOffers);
        setLoadingStates(false); // Estados cargados
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
  
    fetchStates();
  }, [user]);

  useEffect(() => {
    const fetchOffers = async () => {
      if (!user || !user.id || !user.token) {
        console.error('User information is missing!');
        return;
      }

      if (loadingStates || stages.length === 0) {
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/offers?user_id=${user.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const offersData = await response.json();
        console.log('Fetched offers:', offersData);

        const initialOffers = stages.reduce((acc, stage) => {
          acc[stage] = [];
          return acc;
        }, {});

        offersData.forEach((offer) => {
          let state = offer.state;
          if (!state || !initialOffers[state]) {
            state = 'Applied'; 
          }
          console.log('Offer state:', state);
          if (initialOffers[state]) {
            initialOffers[state].push(offer);
          } else {
            initialOffers[state] = [offer];
            console.warn(`Stage "${state}" not found in initialOffers. Adding manually.`);
          }
        });

        console.log('Initial Offers:', initialOffers);
        setOffers(initialOffers);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, [user, stages, loadingStates]);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn = offers[source.droppableId];
    const destColumn = offers[destination.droppableId];
    const [movedItem] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, movedItem);

    try {
      const response = await fetch(`http://localhost:3000/api/offers/states/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ offer_id: movedItem.offer_id, newState: destination.droppableId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      setOffers({
        ...offers,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn,
      });
    } catch (error) {
      console.error('Error updating offer stage:', error);
      // Revert the changes if the API call fails
      sourceColumn.splice(destination.index, 1);
      sourceColumn.splice(source.index, 0, movedItem);
      setOffers({
        ...offers,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn,
      });
    }
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
          <OfferDialog open={isDialogOpen} handleClose={handleCloseDialog} addOffer={addOffer}  offerToEdit={offerToEdit} updateOffer={updateOffer}/>
        </Grid>
        <DragDropContext onDragEnd={onDragEnd}>
          {stages.map((stage, index) => (
            <Grid item xs={12} sm={6} md key={index} style={styles.fullHeight}>
              <Droppable droppableId={stage}>
                {(provided) => (
                  <Paper elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3, ...getBackgroundColor(stage) }} ref={provided.innerRef} {...provided.droppableProps}>
                    <Typography variant="h6" style={styles.title}>
                      {stage}
                    </Typography>
                    <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                      {offers[stage].map((offer, idx) => (
                        <Draggable key={offer.offer_id} draggableId={String(offer.offer_id)} index={idx}>
                          {(provided) => (
                            <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <OfferCard offer={offer} onDelete={handleDeleteOffer} onEdit={handleEditOffer}/>
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  </Paper>
                )}
              </Droppable>
            </Grid>
          ))}
        </DragDropContext>
      </Grid>
    </Box>
  );
};


export default Dashboard;
