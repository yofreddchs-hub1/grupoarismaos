'use client'
import {  useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Usuarios from './usuarios';
import Login from '../login';
import HomePage from './inicio';
import Inventario from './inventario';
import Entradas from './entradas';
import Salidas from './salidas';
import Proveedor from './proveedores';
import Cliente from './clientes';
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
            :   activo && activo==="salida"
            ?   <Salidas />
            :   activo && activo==="inventario"
            ?   <Inventario />
            :   activo && activo==="usuarios"
            ?   <Usuarios />
            :   activo && activo==="proveedor"
            ?   <Proveedor />
            :   activo && activo==="cliente"
            ?   <Cliente />
            :   activo && activo==="salir"
            ?   <Login alto={'100hp'} {...props}/>
            :activo
        }
    </div>
  );
    
  
}
