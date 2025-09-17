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
import { conexiones, genera_formulario } from '../../comunes';
import Formulario from '../herramientas/formulario';
import moment from 'moment';
import Scrollbars from '../herramientas/scrolbars';
import { Buscar_campo } from '../../comunes/fespeciales';

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


export default function Salidas(props) {
  //============================================
    const tabla=Ver_Valores().database.ingreso; // tabla de ingresos
    const tablad=Ver_Valores().database.movimiento; // tabla de detalle de dentrada o salida
  //============================================
    const {menus, Egresar} = props;
    const [activo, setActivo] = useState(null);
    const [state, setState] = useState({cargando:true});
    const [alto, setAlto] = useState(0);
    const [cambiar, setCambiar] = useState(0);
    
    const Guardar = async(valores) =>{
      let {fecha, numero, tipo,movimiento}= valores;
      let referencia = await conexiones.Serial({tabla:tabla,id:'SP', cantidad:8})
      referencia= referencia.Recibo;
      fecha= fecha==="" ? moment() : moment(fecha);

      let entradas = [];
      const respuesta = await conexiones.Guardar({valores:{referencia, fecha, numero, tipo,movimiento}, multiples_valores:true}, tabla)

      if (respuesta.Respuesta==='Ok'){
        const _id_ingreso=respuesta.resultado[respuesta.resultado.length-1]._id;
        for (var i=0; i< movimiento.length;i++){
          const movimi= movimiento[i];
          let {precio, cantidad, tasa, monto, montob} = movimi;
          console.log(movimi);
          cantidad = cantidad ? Number(cantidad) : 1
          precio=Number(precio);
          monto = precio * cantidad;
          tasa= tasa ? tasa : Ver_Valores().tasa.USD;
          montob = monto * tasa;

          const salida={
            _id_ingreso,
            _id_producto:movimi._id,
            fecha,
            numerocontrol:numero,
            tipo:tipo,
            descripcion:`Salida por ${tipo.titulo}${tipo._id===0 ? `, numero de control ${numero}` : ''}, de ${movimi.nombre}, cantidad: ${movimi.cantidad}`,
            cantidad:-1 * cantidad,
            monto,
            montob,
            tasa,
            referencia:referencia,

          }
          await conexiones.Guardar({valores:{...salida}, multiples_valores:true}, tablad)
          entradas=[...entradas,salida]
        }
      }
      
      setCambiar(cambiar+1);
      
      return valores
    }

    useEffect(() => {
      const cargar = async()=>{
            let titulos = await Titulos_todos(`Titulos_Inventario`);
            let nuevo = await genera_formulario({valores:{},campos:Form_todos('Form_Salidas')});
            const pos = Buscar_campo('movimiento', nuevo.titulos);
            nuevo.titulos[pos].value.movimiento.style={
              height: alto * 0.3
            }
            nuevo.botones=[
              {
                name:'ingresar', label:'Egresar', title: 'Egresar producto de inventario' ,
                variant:"contained", color:"success", 
                onClick: Guardar, validar:'true', 
                sx:{...Ver_Valores().Estilos.Botones.Aceptar},
              }
            ]
            setState({...state, titulos, formulario:nuevo, cargando:false});
      }
      if (alto!==0)
        cargar();
    },[alto,cambiar])
    useEffect(() => {
      if (typeof window !== 'undefined') { // Asegurarse de que window está disponible
        setAlto(window.innerHeight);
      }  
    }, [props]);
    
    return state.cargando ? <Cargando open={true} height={alto *0.8}/> :(
        <Scrollbars sx={{ height:alto * 0.8, flexGrow: 1, padding:0.5, ...Ver_Valores().Estilos.Dialogo_cuerpo ? Ver_Valores().Estilos.Dialogo_cuerpo :{}}}>
            <Formulario {...state.formulario} Config={Ver_Valores()} />
        </Scrollbars>
        
    ) 
    
  ;
}
