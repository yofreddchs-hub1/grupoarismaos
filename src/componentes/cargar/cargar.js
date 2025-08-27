'use client'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Logo from '../../imagenes/logo.svg'
import Image from 'next/image';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor:'#000', opacity:1, pl:1, pr:1 }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="#fff">{`${
          Number(props.value).toFixed(2).toLocaleLowerCase()
        }%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};


export default function Cargando(props) {
  let {open, Fondo, Config, progreso, height} = props;
  const [alto, setAlto] = useState(0);
  const [ancho, setAncho] = useState(0);

    useEffect(() => {
      if (typeof window !== 'undefined') { // Asegurarse de que window está disponible
        setAlto(window.innerHeight);
        setAncho(window.innerWidth);
      }
    }, []);
  return open ? (
    <div style={{
        height:height ? height :alto, width:ancho, 
        position: 'absolute', top:1,
        display:'flex', alignItems:'center', justifyContent:'center',
        zIndex:100,
        backgroundColor: Fondo ? Fondo : Config ? Config.Estilos.Fondo_pantalla : ' #f09ed8 ', opacity:0.8,
    }}>
        {/* <CircularProgress color="inherit" /> */}
        <div style={{alignItems:'center',  opacity:1,justifyContent:'center', justifyItems:'center', marginTop:20}}> 
            <Image
                        
                src={Logo}
                alt="Grupo Arismaos C.A."
                width={180}
                height={38}
                priority
            />
            <Box sx={{ width: '100%', opacity:1}}>
              {progreso
                ? <LinearProgressWithLabel value={progreso} />
                : <LinearProgress color="inherit"/>
              }
            
            </Box>
        </div>
      
    </div>
  ): null;
}