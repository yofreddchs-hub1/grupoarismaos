'use client'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { letramenu,colores} from '../tema';
import { Typography } from '@mui/material';
import Scrollbars from '../herramientas/scrolbars';

import usuario from '../../../public/file.svg'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));
// const menus=[
//   {
//     imagen: imagenes.Home,
//     label:"Inicio",
//     value:'incio'
//   },
//   {
//     imagen: imagenes.Usuarios,
//     label:"Usuarios",
//     value:'usuarios'
//   },
//   {
//     imagen: imagenes.Usuarios,
//     label:"Usuarios",
//     value:'usuarios'
//   },
// ]
export default function MenuBontones(props) {
  const {menus} = props;
  return (
    
      <Grid container spacing={{ xs: 0.5, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
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
              height:{xs: 60,md: 75},
              width: {xs: 70,md: 90}
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
    
    
  );
}
