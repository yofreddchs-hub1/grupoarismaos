'use client'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Image from 'next/image';
import Logo from '../../imagenes/logo.svg'

export default function Esperar(props) {
  const [open] = useState(true);
  const [screenHeight, setScreenHeight] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined') { // Asegurarse de que window está disponible
      setScreenHeight(window.innerHeight);
    }
  }, []);
  return (
    <div>
      
      <Backdrop
        sx={{ color: '#f8dcf0 ', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        
      >
        {/* <CircularProgress color="inherit" /> */}
        <div>
          <Image
            
            src={Logo}
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <Box sx={{ width: '100%' }}>
            <LinearProgress color="inherit"/>
            
          </Box>
        </div>
      </Backdrop>
    </div>
  );
}
