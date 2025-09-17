import {  useState, useEffect } from 'react'
import { Titulos_todos, Ver_Valores, Form_todos } from '@/src/comunes';
import Cargando from '../cargar/cargaajustable';
import { conexiones, genera_formulario } from '../../comunes';
import Formulario from '../herramientas/formulario';
import moment from 'moment';
import Scrollbars from '../herramientas/scrolbars';
import { Buscar_campo } from '../../comunes/fespeciales';


export default function Entradas(props) {
  //============================================
    const tabla=Ver_Valores().database.ingreso; // tabla de ingresos
    const tablad=Ver_Valores().database.movimiento; // tabla de detalle de dentrada o salida
  //============================================
    const {menus, Egresar} = props;
    const [state, setState] = useState({cargando:true});
    const [alto, setAlto] = useState(0);
    const [cambiar, setCambiar] = useState(0);
    
    const Guardar = async(valores) =>{
      let {fecha, numero, tipo,movimiento}= valores;
      let referencia = await conexiones.Serial({tabla:tabla,id:'EP', cantidad:8})
      referencia= referencia.Recibo;
      
      fecha= fecha==="" ? moment() : moment(fecha);
      let entradas = [];
      const respuesta = await conexiones.Guardar({valores:{referencia, fecha, numero, tipo,movimiento}, multiples_valores:true}, tabla)
      
      if (respuesta.Respuesta==='Ok'){
        const _id_ingreso=respuesta.resultado[respuesta.resultado.length-1]._id;
        for (var i=0; i< movimiento.length;i++){
          const movimi= movimiento[i];
          let {monto, montob, costou, costoub, cantidad, tasa} = movimi;
          monto = Number(monto);
          cantidad= Number(cantidad);
          costou = Number(costou);
          costou= monto/cantidad; 
          montob=Number(montob);
          montob= monto * tasa;
          costoub= montob / cantidad;
          
          const entrada={
            _id_ingreso,
            _id_producto:movimi._id,
            fecha,
            numerocontrol:numero,
            tipo:tipo,
            descripcion:`Entrada por ${tipo.titulo}${tipo._id===3 ? '' : `, numero de control ${numero}`}, de ${movimi.nombre}, cantidad: ${movimi.cantidad}`,
            cantidad:Number(movimi.cantidad!==null ? movimi.cantidad : 1),
            monto,
            // montob,
            // costou,
            // costoub,
            tasa,
            referencia:referencia,

          }
          await conexiones.Guardar({valores:{...entrada}, multiples_valores:true}, tablad)
          entradas=[...entradas,entrada]
        }
      }
      
      setCambiar(cambiar+1);
      
      return valores
    }

    useEffect(() => {
      const cargar = async()=>{
        let nuevo = await genera_formulario({valores:{},campos:Form_todos('Form_Ingresos')});
        const pos = Buscar_campo('movimiento',nuevo.titulos)
        nuevo.titulos[pos].value.movimiento.style={
          height: alto ? alto * 0.3 : "100%"
        }
        nuevo.botones=[
          {
            name:'ingresar', label:Egresar ? 'Egresar' : 'Ingresar', title: Egresar ? 'Egresar datos al sistema' : 'Ingresar datos al sistema',
            variant:"contained", color:"success", 
            onClick: Guardar, validar:'true', 
            sx:{...Ver_Valores().Estilos.Botones.Aceptar},
          }
        ]
        
        setState({...state, formulario:nuevo, cargando:false});
      }
      if (alto!==0)
        cargar();
      
    },[alto, cambiar])

    useEffect(() => {
      if (typeof window !== 'undefined') { // Asegurarse de que window está disponible
        setAlto(window.innerHeight);
      }
        
    }, []);
    
    
    return state.cargando ? <Cargando open={true} height={alto *0.8}/> :(
      <Scrollbars sx={{ height:alto ? alto * 0.8 : 300, flexGrow: 1, padding:0.5, ...Ver_Valores().Estilos.Dialogo_cuerpo ? Ver_Valores().Estilos.Dialogo_cuerpo :{}}}>
        <Formulario {...state.formulario} Config={Ver_Valores()} />
      </Scrollbars>
    ) 
    
  ;
}
