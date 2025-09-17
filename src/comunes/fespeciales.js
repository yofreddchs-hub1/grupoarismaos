import moment from "moment";
import { conexiones } from "./conexiones";
import { Ver_Valores } from "./valores";
import Link from '@mui/material/Link';
import { EntradasSalidas } from "./delsistema";

export default{
    Subtotal_entrada:(dato,resultado)=>{
        if (Number(dato.cantidad)>0)
                return Number(dato.cantidad)+ resultado.entradas
        return resultado.entradas;
    },
    Subtotal_salida:(dato,resultado)=>{
        if (Number(dato.cantidad)<0)
                return (-1* Number(dato.cantidad))+ resultado.salidas
        return resultado.salidas;
    },
    Subtotal_entrada_salida:(dato,resultado)=>{
        
        return Number(dato.cantidad)+ resultado.total
        
    },
    Buscar_productos:async(value, valor )=>{
        let resulta= await conexiones.Leer_C([valor.table],{
            [`${valor.table}`]:{'valores.codigo':value}
        });
        
        let resultado=null;
        if (resulta.Respuesta==='Ok'){
            let resul= resulta.datos[valor.table].filter(f=> f.valores.codigo===value).map(val=>{
                delete val.valores['entradasalida-subtotal']
                return {_id:val._id, ...val.valores}
            })
            if (resul.length!==0){
                resultado = resul[0];
            }
            
        }
        return resultado; 
    },
    Editores_productos:(params)=>{
        let editable=true;
        
        if ((['cantidad'].indexOf(params.row.titulo)!==-1) 
            
            ){ 
            editable=false;
        } 
        
        return editable; 
    },
    Cambio_tipo:(data, form)=>{
        const pos= Buscar_campo('tipo', form);
        
        if (data.value._id===3 && pos!==-1){
            form[pos].value['numero'].disabled=true
            form[pos].value['numero'].required=false
            data.resultados['Error-numero']='';
        }else{
            form[pos].value['numero'].disabled=false
            form[pos].value['numero'].required=true
            data.resultados.numero=null;
            data.resultados['Error-numero']='';
            
        }
        
        return {resultados: data.resultados,form}
    },
    Cambio_tipo_s:(data, form)=>{
        const pos= Buscar_campo('tipo', form);
        
        if (data.value._id!==0 && pos!==-1){
            form[pos].value['numero'].disabled=true
            form[pos].value['numero'].required=false
            data.resultados['Error-numero']='';
        }else{
            form[pos].value['numero'].disabled=false
            form[pos].value['numero'].required=true
            data.resultados.numero=null;
            data.resultados['Error-numero']='';
            
        }
        
        return {resultados: data.resultados,form}
    },
    Tasa:(valor,resultado,tasa)=>{
        if (typeof valor==='object' && !valor.tasa){
            return tasa ? tasa : 0;
        }else if(typeof valor==='number' && valor===0 && tasa){
            return tasa
        }
        return valor && valor.tasa ? valor.tasa : valor!==0 ? valor : 0;
    },
    CostoUnitario:(valor, resultado)=>{
        
        if (!resultado) return 0
        
        let costou=0;
        if (typeof resultado === 'object'){
            costou =resultado.monto && resultado.cantidad ? Number(resultado.monto) / Number(resultado.cantidad) :  0; 
        }else{
            costou = resultado ? resultado : 0; 
        }
        
        return costou
    },
    CostoUnitariob:(valor, resultado, tasa)=>{
        
        if (!resultado) return 0
        
        let costou=0;
        if (typeof resultado === 'object'){
            costou =resultado.monto && resultado.cantidad ? Number(resultado.monto) / Number(resultado.cantidad) :  0; 
        }else{
            costou = resultado ? resultado : 0; 
        }
        
        return tasa ? costou * tasa : 0
    },
    MontoBs:(valor,resultado,tasa)=>{
        if (!resultado) return 0
        
        let costou=0;
        if (typeof resultado === 'object'){
            costou =resultado.monto ? Number(resultado.monto):  0; 
        }else{
            costou = resultado ? resultado : 0; 
        }
        
        return tasa ? costou * tasa : 0
    },
    Cantidad:(valor,resultado,tasa)=>{
        
        if (typeof valor==='object'){
            return valor.cantidad!==undefined ? valor.cantidad : 1
        }else if (typeof valor==="number"){
            return valor
        }else if (resultado && resultado.cantidad!==undefined){
            return resultado.cantidad
        }
        
        return   1;
    },
    Subtotal_bolivar:(dato, resultado)=> {
        return Number(Number(dato.montob).toFixed(2))+Number(resultado.subtotalb)
    },
    Monto_Venta:(valor,resultado,tasa)=>{
        if (!resultado) return 0
        
        let monto;
        if (typeof resultado === 'object'){
            monto =resultado.precio && resultado.cantidad ? Number(resultado.precio) * Number(resultado.cantidad) :  0; 
        }else{
            monto = resultado ? resultado : 0; 
        }
        
        return monto;
        
    },
    Monto_VentaBs:(valor,resultado,tasa)=>{
        if (!resultado) return 0
        
        let monto;
        if (typeof resultado === 'object'){
            monto =resultado.precio && resultado.cantidad ? Number(resultado.precio) * Number(resultado.cantidad) :  0; 
        }else{
            monto = resultado ? resultado : 0; 
        }
        
        return tasa ? monto * tasa : 0;
        
    },
    Buscar_producto:async(data,form)=>{
        let resulta= await conexiones.Leer_C([Ver_Valores().database.producto],{
            [Ver_Valores().database.producto]:{'valores.codigo':data.value ? data.value : data}
        })
        console.log(resulta, data);
        if(resulta.Respuesta==='Ok'){
            let producto= resulta.datos[Ver_Valores().database.producto];
            if (producto.length!==0){
                data.resultados[`Error-${data.name}`]=`Este código ya se encuentra en el sistema`
            }else{
                data.resultados[`Error-${data.name}`]=``;
            }
        }
        return {resultados: data.resultados,form} 
    },
    Verifica_cantidad:async(valores)=>{
        const {tabla_verificar, campo_verificar, datos, resultado, mensaje_verificar_error}= valores;
        const resul = await conexiones.Leer_C([tabla_verificar],{
            [tabla_verificar]:{[campo_verificar]:datos.codigo}
        })
        if (resul.Respuesta==='Ok'){
            const producto=resul.datos[tabla_verificar];
            if (producto.length!==0){        
                let datos = await EntradasSalidas(producto[0]._id);
                if (datos.cantidad< Number(resultado)){
                   return {Respuesta:'Error', Mensaje:mensaje_verificar_error ? mensaje_verificar_error + datos.cantidad : ''}
                }
            } 
        }
    },
    //////////////////
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

export const Buscar_campo = (name, form) =>{
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