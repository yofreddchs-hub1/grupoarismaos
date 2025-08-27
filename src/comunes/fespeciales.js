import moment from "moment";
import { conexiones } from "./conexiones";
import { Ver_Valores } from "./valores";
import Link from '@mui/material/Link';

export default{
    Editores_formapago:(params)=>{
        let editable=true;
        //quitado 'Debito',
        if ((['Credito'].indexOf(params.row.titulo)!==-1 && ['bancod'].indexOf(params.field)!==-1) 
            || ((['Efectivo Bolívar','Efectivo Dolar'].indexOf(params.row.titulo)!==-1) 
                && ['fecha','bancoo','bancod'].indexOf(params.field)!==-1)
            ||  (params.field==='moneda' && params.row.titulo!=='Otro')
            || ((['Zelle'].indexOf(params.row.titulo)!==-1) 
                  && ['bancoo','bancod'].indexOf(params.field)!==-1)
            ){ 
            editable=false;
        } 
        
        return editable; 
    },
    Subtotal_formapago_total:(dato, resultado)=> {
        // console.log(dato.value, dato.moneda, dato.monto, (dato.value==='otro' && dato.moneda==='Bs'))
        let monto = Number(dato.monto ? dato.monto : 0); 
        if (['efectivodolar','zelle','otro'].indexOf(dato.value)===-1 ||(dato.value==='otro' && dato.moneda==='Bs')){
            monto=0;
        }
        // console.log(monto)
        return monto + Number(resultado.total);
    },
    Subtotal_formapago_totalb:(dato, resultado, tasa)=> {
        let monto = Number(dato.monto); 
        if (['efectivodolar','zelle'].indexOf(dato.value)!==-1 ||(dato.value==='otro' && dato.moneda==='$')){
            monto=0;
        }
        return monto + Number(resultado.totalb)
    },
    Subtotal_formapago_restan:(dato,resultado,tasa, externos)=> {
        let Tasa = externos.totales && externos.totales.Tasa ? externos.totales.Tasa : tasa;
        let total = Number(resultado.cancelar); 
        // let totalb = Number(resultado.cancelarb); 
        let cancel= Number(resultado.total ? resultado.total : 0); 
        let cancelb= Number(resultado.totalb ? resultado.totalb : 0);
        let resul = Number((total-cancel).toFixed(2)); 
        // let resulb = Number((totalb-cancelb).toFixed(2)); 
        resul-=Number((cancelb/Tasa).toFixed(2)); 
        // resulb-= Number((cancel*Tasa).toFixed(2)); 
        return resul
    },
    Subtotal_formapago_restanb:(dato,resultado, tasa, externos)=> {
        let Tasa = externos.totales && externos.totales.Tasa ? externos.totales.Tasa : tasa;
        // let total = Number(resultado.cancelar); 
        let totalb = Number(resultado.cancelarb); 
        let cancel= Number(resultado.total ? resultado.total : 0);
        let cancelb= Number(resultado.totalb ? resultado.totalb : 0);
        // let resul = Number((total-cancel).toFixed(2)); 
        let resulb = Number((totalb-cancelb).toFixed(2)); 
        // resul-=Number((cancelb/Tasa).toFixed(2)); 
        resulb-= Number((cancel*Tasa).toFixed(2)); 
        return resulb
    },
    Titulo_fecha:(dato)=> {
        const fecha =moment(dato.valores ? dato.valores.fecha: dato.fecha).format('DD/MM/YYYY');
        return `${fecha}`
    },
    calculo_bolivar:(dato)=>{
        return dato.monto  ? dato.monto : 0
    },
    cantidad:(dato)=>{
        let nuevo = dato.row ? dato.row : dato ;
        return nuevo.cantidad ? nuevo.cantidad : 1;
    },
    total_bolivar_producto:(dato)=>{
        let nuevo = dato.row ? dato.row : dato ;
        let total = Number(nuevo.cantidad) * Number(nuevo.monto);
        return total
    },
    total_bolivar_dolar:(dato)=>{
        let nuevo = dato.row ? dato.row : dato ;
        let totald = Number(nuevo.cantidad) * Number(nuevo.montod);
        return totald
    },
    Monto:(dato)=>{
        // console.log(dato)
        return dato
    },
    Cambio_condicion:(data, form)=>{
        const pos= Buscar_campo('condicion', form);
        
        if (data.value._id===0 && pos!==-1){
            form[pos].value['condicion'].disabled=false
        }else{
            form[pos].value['condicion'].disabled=true;
            form[pos].value['condicione'].disabled=true;
            form[pos].value['condicione'].required=false
            data.resultados.condicion=null;
            data.resultados.condicione=null;
        }
        return {resultados: data.resultados,form}
    },
    Condicion_especial:(data, form)=>{
        
        const pos= Buscar_campo('condicione', form);
        
        if (data.value._id===3 && pos!==-1){
            form[pos].value['condicione'].disabled=false;
            form[pos].value['condicione'].required=true;
        }else{
            form[pos].value['condicione'].disabled=true;
            form[pos].value['condicione'].required=false
            data.resultados.condicione=null;
        }
        
        return {resultados: data.resultados,form}
    },
    Censo_buscar_cedula:async(data, form)=>{
        console.log(data.resultados.periodo)
        let resulta= await conexiones.Leer_C(['uecla_Estudiante','uecla_Censado'],{
            uecla_Estudiante:{'valores.cedula':data.value},
            uecla_Censado:{$and:[{'valores.periodo':data.resultados.periodo}, {'valores.cedula_estu':data.value}]}
        });
        
        if (resulta.Respuesta==='Ok'){
            const estudiante = resulta.datos.uecla_Estudiante;
            const estudiante_censado = resulta.datos.uecla_Censado;
            if (estudiante.length!==0){
                data.resultados['Error-cedula_estu']='Estudiante ya existe en el sistema'
            }else if (estudiante_censado.length!==0){
                data.resultados['Error-cedula_estu']='Estudiante ya se encuentra censado'
            }else{
                data.resultados['Error-cedula_estu']=''
            }
        }  
        return {resultados: data.resultados,form} 
    },
    Censo_buscar_cedula_estudiantil:async(data, form)=>{
        if (data.value===''){
            return {resultados: data.resultados,form}
        }
        let resulta= await conexiones.Leer_C(['uecla_Estudiante','uecla_Censado'],{
            uecla_Estudiante:{'valores.cedula_estudiantil':data.value},
            uecla_Censado:{'valores.cedula_estudiantil':data.value}
        });
        
        if (resulta.Respuesta==='Ok'){
            const estudiante = resulta.datos.uecla_Estudiante;
            const estudiante_censado = resulta.datos.uecla_Censado;
            
            if (estudiante.length!==0){
                data.resultados['Error-cedula_estudiantil']='Estudiante ya existe en el sistema'
            }else if (estudiante_censado.length!==0){
                data.resultados['Error-cedula_estudiantil']='Estudiante ya se encuentra censado'
            }else{
                data.resultados['Error-cedula_estudiantil']=''
            }
        }  
        return {resultados: data.resultados,form} 
    },
    Censo_buscar_cedula_representante:async(data, form)=>{
        
        let resulta= await conexiones.Leer_C(['uecla_Representante'],{
            uecla_Representante:{'valores.cedula':data.value},
            
        });
        
        if (resulta.Respuesta==='Ok'){
            let representante = resulta.datos.uecla_Representante;
            if (representante.length!==0){
                representante = representante[0].valores;
                const {_id,nombres,apellidos,telefono_movil, telefono_fijo, correo, parentesco, profesion, representados}=representante;
                data.resultados={...data.resultados, 
                    _id_representante:_id,
                    nombres,apellidos,telefono_movil, telefono_fijo, correo, parentesco, profesion,
                    representados,
                    existe:{
                        permisos: "",
                        titulo: "SI",
                        value: "si",
                        _id: 0
                    }
                }
            }else{
                data.resultados={...data.resultados, 
                    _id_representante:undefined,
                    nombres:'',
                    apellidos:'',
                    telefono_movil:'',
                    telefono_fijo:'', 
                    correo:'', 
                    parentesco:null, 
                    profesion:'',
                    representados:null,
                    existe:{
                        permisos: "",
                        titulo: "NO",
                        value: "no",
                        _id: 1
                    }
                }
            }
            
        }  
        return {resultados: data.resultados,form} 
    },
    Seleccionar_asignatura: async(data,form)=>{
        let grados = [];
        data.resultados.asignaturas.map(val=>{
            const pos = grados.findIndex(f=> f.value===val.grado.value)
            if (pos==-1){
                grados=[...grados, val.grado];
            }
        })
        grados = grados.sort((a,b) => a._id> b._id ? 1 : -1)
        data.resultados.asignaturas = data.resultados.asignaturas.sort((a,b) => a.grado._id> b.grado._id ? 1 : -1)
        return {resultados: {...data.resultados, grados}, form}
    },
    Mensaje_recomienda:(props, cambiar)=>{
        const {field, mensaje_recomienda}=props;
        
        const pendiente = Ver_Valores().datosActuales && Ver_Valores().datosActuales.pendienteWhatsapp 
                            ? Ver_Valores().datosActuales.pendienteWhatsapp.map(v=>v.valores)
                            :[];
        let mensaje=mensaje_recomienda + '\n';
        pendiente.map(val=>{
            if(val[field]){
                mensaje+=`${val[field]}\n`;
            }else if(val.datos[field]){
                mensaje+=`${val.datos[field]}\n`;
            }
            return val
        })
        return <>
        {pendiente.length!==0 ? mensaje_recomienda  : ''}
        {pendiente.length!==0 ?  <br/> : null}
        {pendiente.map(val=>
            <div key={val._id}>
                <Link  sx={{cursor:'pointer'}} 
                    onClick={()=> cambiar(val)}
                >
                    {` ${val.datos[field]} `}
                </Link>
                <br/>
            </div>
        )}
        </>
        // return mensaje;
    },
    Cambio_categoria:(data, form)=>{
        
        return {resultados: data.resultados,form}
    },
    Seleccionar_personal:(data,form)=>{
        
        data.resultados.nombre=`${data.resultados.personal.nombres} ${data.resultados.personal.apellidos}`
        return {resultados: data.resultados,form}
    },
    Maximo_minimo:(data,form)=>{
        data.resultados[data.name]= data.resultados[data.name]< 0 ? 0 : data.resultados[data.name]>20 ? 20 : data.resultados[data.name]
        return {resultados: data.resultados,form}
    },
    Maximo_minimoR:(data,form)=>{
        data.resultados[data.name]= data.resultados[data.name]< 0 ? 0 : data.resultados[data.name]>2 ? 2 : data.resultados[data.name]
        return {resultados: data.resultados,form}
    },
    Informacion_referencia: (data)=>{
        if (data.referencias && data.referencias.length===0){
            return ['NO ENCONTRADO EN EL SISTEMA']
        }else if(data.referencias ){
            let resultado = data.referencias.map(dato=>{
                return `Referencia: ${dato.referencia}. \nRecibo: ${dato.recibo}. \nFecha: ${dato.fecha}. \nMonto: ${dato.monto}. \nForma de pago: ${dato.titulo}`    
            })
            
            return resultado
        }
        
    },
    Cambio_valordia:(data, form)=>{
        const pos= Buscar_campo('valordia', form);
        
        if (data.value._id===0 && pos!==-1){
            form[pos].value['valordia'].disabled=false
        }else{
            form[pos].value['valordia'].disabled=true;
            data.resultados.valordia=null;
        }
        return {resultados: data.resultados,form}
    },
    Nombre_evaluacion:(data, form)=>{
        let {resultados}=data;
        let notas= resultados.datos.filter(f=>f.lapso.value===data.value.value);
        resultados.nombre=`N${notas.length+1}`;
        return{resultados:resultados, form}
    },
    Cambio_Representante_Pago:(data, form)=>{
        const pos= Buscar_campo('representante_pago', form);
        console.log(data.resultados, pos);
        const resulta = data.value._id===0;
        if (pos!==-1){
            console.log(form[pos].value['rp_cedula']);
            form[pos].value['rp_cedula'].disabled=resulta;
            form[pos].value['rp_cedula'].required=!resulta;
            form[pos].value['rp_nombres'].disabled=resulta;
            form[pos].value['rp_nombres'].required=!resulta;
            form[pos+1].value['rp_apellidos'].disabled=resulta;
            form[pos+1].value['rp_apellidos'].required=!resulta;
            form[pos+1].value['rp_telefono'].disabled=resulta;
            form[pos+1].value['rp_telefono'].required=!resulta;
            form[pos+1].value['rp_correo'].disabled=resulta;
            form[pos+2].value['rp_lugartrabajo'].disabled=resulta;
            form[pos+2].value['rp_telefonot'].disabled=resulta;
            form[pos+3].value['rp_direccion'].disabled=resulta;
            form[pos+3].value['rp_direccion'].required=!resulta;
            // if (resulta){
            //     form[pos].value['rp_cedula'].value=data.resultados.cedula;
            //     data.resultados.rp_cedula=data.resultados.cedula;
            //     form[pos].value['rp_nombres'].value=data.resultados.nombres;
            //     data.resultados.rp_nombres=data.resultados.nombres;
            //     form[pos+1].value['rp_apellidos'].value=data.resultados.apellidos;
            //     data.resultados.rp_apellidos=data.resultados.apellidos;
            //     form[pos+1].value['rp_telefono'].value=data.resultados.telefono;
            //     data.resultados.rp_telefono=data.resultados.telefono;
            //     form[pos+1].value['rp_correo'].value=data.resultados.correo;
            //     data.resultados.rp_correo=data.resultados.correo;
            // }else{
                form[pos].value['rp_cedula'].value="";
                data.resultados.rp_cedula="";
                form[pos].value['rp_nombres'].value="";
                data.resultados.rp_nombres=""
                form[pos+1].value['rp_apellidos'].value="";
                data.resultados.rp_apellidos="";
                form[pos+1].value['rp_telefono'].value="";
                data.resultados.rp_telefono="";
                form[pos+1].value['rp_correo'].value="";
                data.resultados.rp_correo="";
                form[pos+2].value['rp_lugartrabajo'].value="";
                data.resultados.rp_lugartrabajo="";
                form[pos+2].value['rp_telefonot'].value="";
                data.resultados.rp_telefonot="";
                form[pos+3].value['rp_direccion'].value="";
                data.resultados.rp_direccion="";
            // }
        }
        return {resultados: data.resultados,form}
    },
}

const Buscar_campo = (name, form) =>{
    let pos =-1;
    Object.keys(form).map((valor,i)=>{
      if(form[valor].value[name]){
        pos=i;
      }
      return valor
    });
    // console.log(resultado);
    return pos;
}