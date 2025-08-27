import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Image from 'next/image';
import {imagenes} from '../../tema'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height:window.innerHeight * 0.8,

}));

export default function Sindatos() {
  return (
    <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center'}}>
      
      <Image
                              
        src={imagenes.Sindatos}
        alt="Sin Datos"
        width={180}
        height={180}
        priority
      />
          
    </Box>
  );
}
