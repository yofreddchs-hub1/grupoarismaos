import { conexiones } from "./conexiones"
import { Ver_Valores } from "./valores"
import moment from "moment";

export const EntradasSalidas= async(id)=>{
    let entradasalida = [];
    let entradas=0;
    let salidas=0;
    let montop=0;
    
    const resulta= await conexiones.Leer_C([Ver_Valores().database.movimiento],{
        [Ver_Valores().database.movimiento]:{'valores._id_producto':String(id)}
    })
    if (resulta.Respuesta==='Ok'){
        resulta.datos[Ver_Valores().database.movimiento].sort((a,b)=>a.valores.fecha>b.valores.fecha ? -1:1).map((val,i)=>{
            if (val.valores.cantidad>0){
                entradas+=val.valores.cantidad;
            }else if (val.valores.cantidad<0){
                salidas+=val.valores.cantidad;
            }

            entradasalida=[...entradasalida,{
                id:i+1,
                fecha:moment(val.valores.fecha).format("DD/MM/YYYY"),
                descripcion:val.valores.descripcion,
                cantidad:val.valores.cantidad,
                monto: val.valores.monto
            }]
            montop+=val.valores.monto;
            return val
        })
    }

    return {entradasalida, entradas, salidas, montop, cantidad:entradas+salidas,pormedio: montop/entradas}
}