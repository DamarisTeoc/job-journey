import React from 'react';
import { Box, Typography, Container, ListItem, List,  } from '@mui/material';

const AboutJobJourney = () => {
  return (
    
      <Container sx={{ display:'flex',flexDirection:'column', justifyContent: 'center', alignItems:'left', mt: 4, margin: '60px', fontFamily:'Roboto', width:"800px" }}>
        <Typography variant="h4" gutterBottom>
          About Job Journey
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to Job Journey, the dedicated application designed to assist job seekers in managing their application processes effectively. Our platform provides a user-friendly environment where you can track each job offer you apply for by noting down the details and updating the status as your application progresses.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Purpose and Benefits
        </Typography>
        <Typography variant="body1" paragraph>
          Job Journey was created with the intention of simplifying the job search process. As a job seeker, you face the challenge of keeping track of multiple job applications and remembering the specific details and statuses of each. Job Journey solves this problem by allowing you to:
        </Typography>
        <List sx={{ textAlign: 'left', fontFamily: 'Roboto' }}>
      <ListItem>
        <Typography variant="body1">
          Record Details: Easily enter and store information about job offers, including company name, job title, location, and more.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography variant="body1">
          Track Progress: Update the status of each application as it moves through various stages such as 'Applied', 'Under Review', 'Interview', 'Offer Extended', and 'Rejected'.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography variant="body1">
          Organize Applications: View all your job applications in one place and manage them efficiently to focus on your next steps.
        </Typography>
      </ListItem>
    </List>
      </Container>
  );
};

export default AboutJobJourney;