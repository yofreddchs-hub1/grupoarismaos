'use client'
import {  useState, useEffect } from 'react'

import TablaMultiple from '../herramientas/tabla/tabla_multiple';
import { Titulos_todos, Ver_Valores, Form_todos } from '@/src/comunes';
import Cargando from '../cargar/cargaajustable';



export default function Usuarios(props) {
    
    const [state, setState] = useState({cargando:true});
    const [alto, setAlto] = useState(0);
    useEffect(() => {
      const cargar = async()=>{
          let titulos = await Titulos_todos(`Titulos_User_api`);
          setState({...state, titulos, cargando:false});
      }
      if (alto!==0){
          console.log('cargando',alto)
          cargar();
      }
    },[alto]);
    useEffect(() => {
        
      if (typeof window !== 'undefined') { // Asegurarse de que window está disponible
          setAlto(window.innerHeight);
      }
    }, [props]);
    const Condiciones = async(crear_campos,datos)=>{
        let {valores}= datos;
        if (valores.passwordn!==''){
          valores.newpassword=valores.passwordn;
        }
        
        delete valores.passwordn
        delete valores.passwordc
        
        
        valores.username = valores.username.toLowerCase();
        return valores;
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
            Form_origen = {Form_todos(`Form_User_api`)}
            Titulo_tabla={"Usuarios"}
            Table={Ver_Valores().database.usuario}
            cargaporparte={{condicion:{}}}
            Titulos_tabla = {state.titulos}
            Titulo_dialogo ={(dato)=> dato._id  ?  `Usuario ${dato.username}`: `Nuevo Usuario`}
        />
    ) 
    
  ;
}
