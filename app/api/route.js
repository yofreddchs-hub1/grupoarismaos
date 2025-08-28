import { NextResponse } from "next/server";
import axios from 'axios';

export const GET = async () => {
    console.log('por aqui')
    try {
        
        return NextResponse.json({data:"resultado"}, {status:200})
    } catch (error) {
        return NextResponse.json({data: null}, {status:500})
    }

}

export const POST = async (req, res) => {
    
    try {
        const options = await req.json()
        
        const respuesta= await axios(options)
          .then((res) => {
            
            if (res.data.Respuesta==='Error' && res.data.mensaje==="no autorizado"){
              Usuario('Eliminar')
              
            }
            // this.setState({cargando:false, progreso:0})
            
              return res.data
            
            
          })
          .catch(err => {
            console.log('Error en ',options);
            // this.setState({cargando:false, progreso:0})
            return {Respuesta:'Error_c', mensaje:'Error en conexión, intente nuevamente'}
          } );
          
        return NextResponse.json(respuesta, {status:201})
    } catch (error) {
        return NextResponse.json({data: null}, {status:500})
    }
}