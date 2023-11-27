import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        py: 2,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="body2" color="text.secondary">
          &copy; 2023 Your Company. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
