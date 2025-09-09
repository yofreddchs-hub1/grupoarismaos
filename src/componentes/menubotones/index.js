'use client'
import {  useState, useEffect } from 'react'

import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { letramenu,colores} from '../tema';
import { Typography } from '@mui/material';
import Scrollbars from '../herramientas/scrolbars';
import { Ver_Valores } from '../../comunes';


export default function MenuBontones(props) {
  const {menus} = props;
  const [alto, setAlto] = useState(0);
  useEffect(() => {      
    if (typeof window !== 'undefined') { // Asegurarse de que window está disponible
        setAlto(window.innerHeight);
    }
  }, [props]);
  return (
    <Scrollbars sx={{ height:alto * 0.8, flexGrow: 1, padding:0.5, ...Ver_Valores().Estilos.Dialogo_cuerpo ? Ver_Valores().Estilos.Dialogo_cuerpo :{}}}>
      <Grid container spacing={{ xs: 0.5, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
      >
        {menus ? menus.map((val, index) => (
          <Grid key={index} 
            sx={{
              alignItems: "center",
              justifyContent: "center",
              cursor:'pointer',
              p:1,
              borderRadius:5,
              bgcolor: val.activo ? colores.fondoactivo : colores.fondonoactivo,
              '&:hover': {
                bgcolor: colores.fondosobreponer,
              },
              height:{xs: 65,md: 75},
              width: {xs: 70,md: 95}
            }}
            onClick={()=>{
              if (props.onChange){
                props.onChange(val, menus)
              }
            }}
          >

            <Image                      
              src={val.imagen}
              alt={val.label}
              width={35}
              // height={35}
              loading="lazy"
              
              style={{margin:'auto'}}
              // layout="responsive" // Enables responsive layout
              // sizes="(max-width: 700px) 10vw, 5px"
             
            />
           
            <Typography variant="subtitle1" 
              noWrap  
              sx={letramenu}
            >
              {val.label}
            </Typography>
            
          </Grid>
        ))
        :null
        }
        
      </Grid>
    </Scrollbars>
    
  );
}
