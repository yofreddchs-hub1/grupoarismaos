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
                monto: val.valores.monto,
                tasa:Number(Number(val.valores.tasa).toFixed(2))
            }]
            montop+=val.valores.monto;
            return val
        })
    }

    return {entradasalida, entradas, salidas, montop, cantidad:entradas+salidas,pormedio: montop/entradas}
}

export const LibroMes = async(fecha)=>{
    fecha = new Date(fecha);
    let fechaa = new Date();
    let mes = fecha.getMonth() + 1;
    let ano = fecha.getFullYear();
    let mesa = fecha.getMonth() + 1;
    let anoa = fecha.getFullYear();
    let ultimodia= new Date(ano,mes,0);
    ultimodia= ultimodia.getDate();
    let periodo = `${ano}-${mes}`;
    let periodoa = `${ano}-${mes-1}`;
    const resulta= await conexiones.Leer_C([Ver_Valores().database.movimiento, Ver_Valores().database.producto, Ver_Valores().database.libro],{
        [Ver_Valores().database.movimiento]:{$and:[{"valores.fecha":{$gte:new Date(`${ano}-${mes}-1`), $lte:new Date(`${ano}-${mes}-${ultimodia}`)}}]},
        [Ver_Valores().database.producto]:{},
        [Ver_Valores().database.libro]:{$or:[{"valores.periodo":periodoa},{"valores.periodo":periodo}]}
    })
    
    if (resulta.Respuesta==='Ok'){
        const productos = resulta.datos[Ver_Valores().database.producto].map(val=>{
            return {...val.valores, _id:val._id}
        });
        const movimientos = resulta.datos[Ver_Valores().database.movimiento].map(val=>{
            return {...val.valores, _id:val._id}
        }).sort((a,b)=> a.fecha>b.fecha ? -1 : 1);
        let libros = resulta.datos[Ver_Valores().database.libro].map(val=>{
            return {...val.valores, _id:val._id}
        });
        let _id;
        let tasal = Number(Number(Ver_Valores().tasa.USD).toFixed(2))
        
        let libro = productos.map(val=>{
            return {
                _id:val._id, 
                codigo:val.codigo, 
                precio:val.precio ? Number(val.precio): 0, 
                nombre:val.nombre, descripcion:val.descripcion,
                stock:Number(val.stock),
                cantidadI:0, costouniI:0, montoI:0,
                //entradas, todas
                cantidadE:0, montoE:0,
                // salidas
                //venta
                cantidadSV:0, montoSV:0,
                //autoconsumo
                cantidadSA:0, montoSA:0,
                //muestra
                cantidadSM:0, montoSM:0,
                //Obsequio
                cantidadSO:0, montoSO:0,
                //deterioro
                cantidadSD:0, montoSD:0,
                //Fin de mes
                cantidadF:0, costouniF:0, montoF:0,
            }
        })

        if (libros.length!==0){
            let pos = libros.findIndex(f=> f.periodo===periodo);
            if (pos!==-1){
                _id = libros[pos]._id;
                if (mesa===mes && ano===anoa){
                    tasal= tasal;               
                }else{
                    tasal= libros[pos].tasa ? libros[pos].tasa : movimientos.length!==0 ? Number(Number(movimientos[0].tasa).toFixed(2)) : 0;               
                }
            }
            pos = libros.findIndex(f=> f.periodo===periodoa);
            if (pos!==-1){
                
                libros[pos].libro.map(val=>{
                    const pos = libro.findIndex(f=> f._id===val._id);
                    libro[pos].cantidadI= val.cantidadF;
                    libro[pos].cantidadF= val.cantidadF;
                    libro[pos].montoI=val.montoF;
                    libro[pos].montouniI=val.montoF/val.cantidadF;
                })
            }
        }
        
        movimientos.map(val=>{
            const pos = libro.findIndex(f=> f._id===val._id_producto);
            let monto=Number(Number(val.monto).toFixed(2));
            let tasa = Number(Number(val.tasa).toFixed(2));
            let montob= monto * tasa; // monto sumado en Bs
            montob= Number(Number(montob).toFixed(2));
            libro[pos].cantidadF+=Number(val.cantidad);
            libro[pos].montoF=libro[pos].cantidadF * libro[pos].precio ;

            if (Number(val.cantidad)>0){
                libro[pos].cantidadE+=Number(val.cantidad);
                libro[pos].montoE+=montob;
            }else if (Number(val.cantidad)<0){
                if (val.tipo.value==='venta'){
                    libro[pos].cantidadSV+=(-1 * Number(val.cantidad));
                    libro[pos].montoSV+=montob;
                }else if (val.tipo.value==='autoconsumo'){
                    libro[pos].cantidadSA+=(-1 * Number(val.cantidad));
                    libro[pos].montoSA+=montob;
                }else if (val.tipo.value==='muestra'){
                    libro[pos].cantidadSM+=(-1 * Number(val.cantidad));
                    libro[pos].montoSM+=montob;
                }else if (val.tipo.value==='obsequio'){
                    libro[pos].cantidadSO+=(-1 * Number(val.cantidad));
                    libro[pos].montoSO+=montob;
                }else if (val.tipo.value==='deterioro'){
                    libro[pos].cantidadSD+=(-1 * Number(val.cantidad));
                    libro[pos].montoSD+=montob;
                }
            }
            return val
        })
        
        await conexiones.Guardar({_id, valores:{periodo, libro, tasa:tasal}, multiples_valores:true}, Ver_Valores().database.libro)
        
        return libro
    }
    
}