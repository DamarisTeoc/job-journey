import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const AboutJobJourney = () => {
  return (
    
      <Box sx={{ display:'flex',flexDirection:'column', justifyConten: 'center', alignItems:'left', mt: 4, margin: '30px', fontFamily:'Roboto' }}>
        <Typography variant="h4" gutterBottom>
          About Job Journey
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to Job Journey, the dedicated application designed to assist job seekers in managing their application processes effectively. Our platform provides a user-friendly environment where you can track each job offer you apply for by noting down the details and updating the status as your application progresses.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Purpose and Benefits
        </Typography>
        <Typography variant="body1" paragraph>
          Job Journey was created with the intention of simplifying the job search process. As a job seeker, you face the challenge of keeping track of multiple job applications and remembering the specific details and statuses of each. Job Journey solves this problem by allowing you to:
        </Typography>
        <ul style={{ textAlign: 'left', listStylePosition: 'inside', fontFamily:'Roboto' }}>
          <li>Record Details: Easily enter and store information about job offers, including company name, job title, location, and more.</li>
          <li>Track Progress: Update the status of each application as it moves through various stages such as 'Applied', 'Under Review', 'Interview', 'Offer Extended', and 'Rejected'.</li>
          <li>Organize Applications: View all your job applications in one place and manage them efficiently to focus on your next steps.</li>
        </ul>
      </Box>
  );
};

export default AboutJobJourney;