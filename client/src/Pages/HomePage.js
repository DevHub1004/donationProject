// src/pages/HomePage.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import HomeScreen from './HomeScreen/HomeScreen';

const HomePage = () => {
  return (
    <Box style={{ padding: '20px' }}>
      <Typography>Home Page</Typography>
      <Button>Donate</Button>
    </Box>
  );
};

export default HomePage;
