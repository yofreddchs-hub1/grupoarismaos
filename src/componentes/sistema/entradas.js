import {  useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { letramenu,colores} from '../tema';
import { Typography } from '@mui/material';
import TablaMultiple from '../herramientas/tabla/tabla_multiple';
import { Titulos_todos, Ver_Valores, Form_todos } from '@/src/comunes';
import Cargando from '../cargar/cargaajustable';
import { genera_formulario } from '../../comunes';
import Formulario from '../herramientas/formulario';

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

export default function Entradas(props) {
    const {menus, Egresar} = props;
    const [activo, setActivo] = useState(null);
    const [state, setState] = useState({cargando:true});
    const [alto, setAlto] = useState(0);
    
    const Guardar = (valores) =>{
      console.log(valores);
      return valores
    }

    useEffect(() => {
      const cargar = async()=>{
            let titulos = await Titulos_todos(`Titulos_Inventario`);
            let nuevo = await genera_formulario({valores:{},campos:Form_todos('Form_Ingresos')});
            console.log(nuevo, alto);
            nuevo.titulos[1].value.movimiento.style={
              height: alto * 0.45
            }
            nuevo.botones=[
              {
                name:'ingresar', label:Egresar ? 'Egresar' : 'Ingresar', title: Egresar ? 'Egresar datos al sistema' : 'Ingresar datos al sistema',
                variant:"contained", color:"success", 
                onClick: Guardar, validar:'true', 
                sx:{...Ver_Valores().Estilos.Botones.Aceptar},
              }
            ]
            setState({...state, titulos, formulario:nuevo, cargando:false});
      }
      if (alto!==0)
        cargar();
      console.log('por aqui')
    },[alto])
    useEffect(() => {
      if (typeof window !== 'undefined') { // Asegurarse de que window está disponible
        setAlto(window.innerHeight);
      }  
    }, [props]);
    
    const Actualizar_valores = async(valores)=>{
        console.log(valores);
        
        return valores
    }
    return state.cargando ? <Cargando open={true}/> :(
        <Formulario {...state.formulario} Config={Ver_Valores()} />
    ) 
    
  ;
}
