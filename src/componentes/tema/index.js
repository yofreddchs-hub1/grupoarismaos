'use client'
//imagenes y temas
import { createTheme } from '@mui/material/styles';

//imagenes
import Logo from '../../../public/imagenes/logo.svg';//'../../imagenes/logo.svg';
import Usuarios from '../../../public/imagenes/usuarios.svg';//'../../imagenes/usuarios.svg';
import Home from '../../../public/imagenes/home.svg';//'../../imagenes/usuarios.svg';
import Sindatos from '../../../public/imagenes/sindatos.svg';
import Encontruccion from '../../../public/imagenes/enconstruccion.png';
import Salir from '../../../public/imagenes/salir.svg';
import Inventario from '../../../public/imagenes/inventario.svg';
export const imagenes={
  Logo,
  Usuarios,
  Home,
  Sindatos,
  Encontruccion,
  Inventario,
  Salir
}
const fondo = "#f8dcf0";
const letra = "#E309FA";
export const colores={
  fondo : "#f8dcf0",
  letra : "#E309FA",
  //menu
  letraboton:"#fff",
  fondoactivo:'#871341',
  fondonoactivo:'#ef9fd8',
  fondosobreponer:'#e533a8',
}

export const themeCircular = createTheme({
  palette: {
    primary: {
      main: "#E309FA",
      // light: will be calculated from palette.primary.main,
       dark: "#E309FA",
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#83113e',
      light: '#83113e',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
  },
});

export const menu1=(alto)=>{
  return {
    width:'100%', 
    height: {xs: alto * 0.11,md: alto * 0.12},
    display:'flex',
    alignItems: "center",
    justifyContent: "center",
    p:1
  }
}

export const menutasa=(alto)=>{
  
  return {
    width:'100%', 
    height: {xs: alto * 0.11,md: alto * 0.12},
    alignItems: "center",
    justifyContent: "center",
    
  }
}
export const letratasa={
    fontSize:{xs:12, md:18}, 
    color:colores.letra, 
    fontWeight:'bold' 
}

export const letramenu={
    fontSize:{xs:9, md:12}, 
    color:colores.letraboton, 
    fontWeight:'bold',
    textTransform:'uppercase'
}