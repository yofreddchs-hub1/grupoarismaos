'use client'
import {  useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import TablaMultiple from '../herramientas/tabla/tabla_multiple';
import { Titulos_todos, Ver_Valores, Form_todos, conexiones } from '@/src/comunes';
import Cargando from '../cargar/cargaajustable';
import { EntradasSalidas } from '../../comunes/delsistema';

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

export default function Cliente(props) {
    const {menus} = props;
    const [activo, setActivo] = useState(null);
    const [state, setState] = useState({cargando:true});
    const [alto, setAlto] = useState(0);
    useEffect(() => {
        const cargar = async()=>{
            let titulos = await Titulos_todos(`Titulos_Cliente`);
            setState({...state, titulos, cargando:false});
        }
        console.log("Refresca usuarios")
        cargar();
        if (typeof window !== 'undefined') { // Asegurarse de que window está disponible
            setAlto(window.innerHeight);
        }
    }, [props]);
    const Condiciones = async(crear_campos,datos)=>{
        let {valores}= datos;
        
        return valores;
    }
    const Actualizar_valores = async(valores)=>{
        return valores
    }
   
    return state.cargando ? <Cargando open={true}/> :(
        <TablaMultiple
            alto={'82%'}
            altoCuerpo={ alto * 0.8 }
            multiples_valores={true}
            Agregar_mas={false}
            Condiciones={Condiciones}
            Columnas={2}
            Config={Ver_Valores()}
            Form_origen = {Form_todos(`Form_Cliente`)}
            Titulo_tabla={"Clientes"}
            Table={Ver_Valores().database.cliente}
            cargaporparte={{condicion:{}}}
            Titulos_tabla = {state.titulos}
            Titulo_dialogo ={(dato)=> dato._id  ?  `Cliente "${dato.nombre}"`: `Nuevo Cliente`}
            Actualizar_valores ={Actualizar_valores}
            Eliminar={"nombre"}
            Eliminar_props={"Desea eliminar el Cliente: "}
        />
    ) 
    
  ;
}
