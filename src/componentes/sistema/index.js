'use client'
import {  useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { letramenu,colores} from '../tema';
import { Typography } from '@mui/material';
import Usuarios from './usuarios';
import Login from '../login';
import HomePage from './inicio';
import Inventario from './inventario';
import Entradas from './entradas';

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

export default function Sistema(props) {
    const {menus} = props;
    const [activo, setActivo] = useState(null);
    
    useEffect(() => {
        console.log("Nuevo")
        let nuevo=null
        menus.map(val=>{
            if (val.activo){
                nuevo= val.value;
            }
        })
        setActivo(nuevo);
    }, [props]);
    
  return (
    <div>{
            activo && activo==="inicio"
            ?   <HomePage />
            :   activo && activo==="entrada"
            ?   <Entradas />
            :   activo && activo==="inventario"
            ?   <Inventario />
            :   activo && activo==="usuarios"
            ?   <Usuarios />
            :   activo && activo==="salir"
            ?   <Login alto={'100hp'} {...props}/>
            :activo
        }
    </div>
  );
    
  
}
