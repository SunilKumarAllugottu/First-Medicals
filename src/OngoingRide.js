import React from 'react'
import SideBar from './Components/SideBar';
import NavBar from './Components/NavBar';
import { Box } from '@mui/material';


const OngoingRaide = () => {
  return (
    <>
    <NavBar/>
    <div style={{marginTop:'60px'}}/>
    <div style={{ display: 'flex' }}>
    <SideBar/>
    <Box component="main" sx={{ flexGrow: 1, p:10  }}>

    <h1 style={{fontWeight:"900"}}>Ongoing Raide </h1>

    </Box>
    </div>
    </>
  )
}

export default OngoingRaide;