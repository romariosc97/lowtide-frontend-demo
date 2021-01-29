import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';

const LoadingScreen = () => {
  return (
    <Box width="100%" display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="100vh" textAlign="center"><CircularProgress color="primary" style={{width:"50px", height:"50px"}}></CircularProgress></Box>
  );
};

export default LoadingScreen;
