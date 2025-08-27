import { nuevo_Valores, valores_sistema, Ver_Valores, conexiones, encriptado } from "./index";
import { Manager } from "socket.io-client";

export const const_procesos = {
    dir_user: 'user_GA',
    dir_socket: '/api_socket',
    dir_tasa:'tasa_cambio_GA',
    //Nombre de variable de configuracion
    dir_config: 'config_GA',
    
}

export const Moneda = (valor, moneda='Bs', mostrar=true, digitos=2)=>{
  
  if (moneda==='Bs'){
    const fBolivar = new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'VED',
      minimumFractionDigits: digitos
    })
    let resultado = fBolivar.format(valor);
    resultado = resultado.replace('VED',mostrar ? 'Bs.' : '')
    return resultado
  }else{
    const fDolar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: digitos
    })
    let resultado = fDolar.format(valor);
    resultado = resultado.replace('$', mostrar ? '$' : '');
    return resultado
  }
}
export const formatoBolivar = new Intl.NumberFormat('es-VE', {
  style: 'currency',
  currency: 'VED',
  minimumFractionDigits: 2
})

export const formatoDolar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

export const Inicio = async()=>{
    let tasa = await Tasa_cambio({});
    let valores ={...valores_sistema, tasa};
    // let dir = window.location.protocol;
    // console.log(dir);
    // if (dir==='http:'){
    //   valores.http = valores.http;
    // }else{
    //   valores.http = valores.https
    // }
    const isMobile = () => {
      if (typeof navigator !== 'undefined') {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      }
      return false;
    };

    if (isMobile()) {
      // Aplica estilos o lógica para dispositivos móviles
      console.log("Ejecutando en un dispositivo móvil");
      valores.tipo="movil";
      
    } else {
      // Aplica estilos o lógica para escritorio
      console.log("Ejecutando en un escritorio");
      valores.tipo="web";
    }
    

    const manager = new Manager(valores.http,{
      reconnectionDelayMax: 10000,
      autoConnect: false
    });
    const socket=manager.socket("/");
    socket.on("conectado", async data => {
      const {api}= Ver_Valores();
      // console.log('>>>>>>>>>>>>>>>>>>>>>Conectado',data, api);
      
      nuevo_Valores({conectadoserver:true, userID:data.id , tasa:data.tasa});
      
    });
    
    socket.on("Actualizar_tasa", datos =>{
      console.log('Actualizar tasa',datos);
      Tasa_cambio({dato:datos, status:'Guardar'})
      nuevo_Valores(datos);
    });
    
    socket.io.on("error", (error) => {
      console.log('Error con socket');
      nuevo_Valores({conectadoserver:false});
    });
    socket.connect();
    nuevo_Valores({...valores, socket});
    
    const api= await conexiones.Ver_api(valores.app);
    let User = await Usuario();
    
    nuevo_Valores({...valores, socket, api, User});
    
}

export const Tasa_cambio = async(props)=>{
  let {dato, status}= props;
  status = status===undefined ? 'Leer' : status;
  if (status==='Leer'){
    try{
      let tasa = await localStorage.getItem(const_procesos.dir_tasa);
      if (tasa!==null){
        tasa= JSON.parse(tasa);
        tasa =  tasa.tasa ? tasa.tasa : tasa;
        nuevo_Valores({tasa})
      }
      // console.log('>>>>>>>>Tasa de cambio',tasa)
      return tasa
    }catch(error){
      return null
    }
  }else if (status==='Guardar'){
    localStorage.setItem(const_procesos.dir_tasa, JSON.stringify(dato.tasa));
  }
}

export const Usuario = async(props)=>{
  let {status,dato} = props ? props : {}
  status = status===undefined ? 'Leer' : status;
  
  if (status==='Leer'){
    try{
      let User = await localStorage.getItem(const_procesos.dir_user);
      if (User!==null) 
        User = await encriptado.desencriptado(User);
      User = JSON.parse(User);
      conexiones.Inicio(User);
      nuevo_Valores({User});
      return User
    }catch(error){
      return null
    }
  }else if (status==='Guardar'){
    conexiones.Inicio(dato)
    let User= await encriptado.Encriptado(JSON.stringify(dato));
    localStorage.setItem(const_procesos.dir_user, User);
  }else{
    localStorage.setItem(const_procesos.dir_user,null);
    conexiones.Inicio(null)
  }  
  
}

export const Filtrar_campos = (lista, campos)=>{
  let resultado={};
  Object.keys(lista).map(val=>{
    if (campos.indexOf(val)===-1){
      resultado[val]=lista[val];
    }
    return val
  })
  return resultado

}
export const Titulo_default=(datos)=>{
  return Object.keys(datos).map((valor)=> {
    // if (valor === 'categoria') {
    //   return { title: MaysPrimera(valor), field: valor, lookup: categorias }
    // }else
    if (['createdAt','updatedAt','fecha', 'Fecha'].indexOf(valor)!==-1){
      return { title: MaysPrimera(valor), field: valor , editable: 'never' , fecha:true}
    }else if (['_id','__v','createdAt','updatedAt',
               'actualizado', 'cod_chs', 'seq_chs', 'hash_chs'].indexOf(valor)!==-1){
      return { title: MaysPrimera(valor), field: valor , editable: 'never'}
    }else{
      return { title: MaysPrimera(valor), field: valor }
    }
  })
}

export const Generar_id =(id, numeracion=10, cant=6)=>{
  const id1 = Math.random().toString(numeracion).slice(-cant);
  // console.log('Id con math >>>', id1)
  return `${id ? id+'-' :''}${id1}`
  // return `${id ? id+'-' :''}${moment().format('x')}` 
}

export const Generar_codigo = (valor, id='', cantidad=5)=>{
  let nuevo = String(Number(valor) + 1);
  let cero = cantidad-nuevo.length;
  for (var i=0; i<cero; i++){
    nuevo='0'+nuevo;
  }
  return `${id!=='' ? id+'-' : ''}${nuevo}`
}

export const Paginas = (props) =>{
  let rdatos=[];
  let paginas=[1];
  // let cont=0;
  // let contp=2;
  const {datos,cantp,pagina,buscar, ctotal}=props;
  const inicio=cantp*(pagina-1);
  const fin=inicio+cantp;
  const datosE=Resultado_encontrados(datos,buscar);
  
  for (var i=0;i<datosE.length;i++){
    if (i>inicio-1 && i < fin){
        rdatos.push({...datosE[i],id:i+1});
    }
   
  }
  
  paginas=[1];
  const ttotal= ctotal ? ctotal : datosE.length
  
  if (cantp!==0)
    for ( i=2; i<(ttotal/cantp)+1;i++){
      paginas.push(i);
    }
  
  const comienza=inicio+1;
  const finaliza= ttotal< fin ? ttotal : fin;
  const total='('+comienza+' al '+finaliza+') <> (Total:'+ttotal+')';
  return {datos:rdatos,paginas:paginas,total:total}

}

export const Permiso =  async(accion, api, superadmin=false, Categoria = null) =>{
  let User = api ? await Usuario({api}) : await Usuario()//JSON.parse(localStorage.getItem(const_procesos.dir_user));
  if (User===null) return false
  let categoria = Categoria ? Categoria: api ? Ver_Valores()['config']['Listas'][`lista_${api}_categoria`] : categoria_usuario;
  categoria = categoria.map(val=>{
    return {...val, permisos: typeof val.permisos==='string' ? val.permisos.split(',') : val.permisos}
  })
  User.categoria = typeof User.categoria==='object' ? User.categoria._id : User.categoria;
  let resultado=categoria.filter(lis => String(lis._id)===String(User.categoria));
  if (!superadmin) {
    if (resultado.length!==0 && resultado[0].permisos!==undefined &&
          (resultado[0].permisos.indexOf(accion)!==-1 || resultado[0].permisos.indexOf('*')===0)
        ) {
        
      return true;

    }else {
      return false;
    }
  }else{
    if (resultado.length!==0 && resultado[0].permisos!==undefined && resultado[0].permisos.indexOf('**')===1) {
      return true;
    }else{
      return false;
    }
  }


}
export const Resultado_encontrados = (datos,valor) =>{
  let resultado=[];
  
  if (datos !== undefined && datos.length!==0)
    datos.map((dato)=>{
      
      if (Ver_igualdad(dato,valor)){
        resultado.push(dato);
      }
      return valor;
    })
  return resultado
}


export const Ver_igualdad = (dato, valor)=>{
    
    if (dato=== null || dato ===undefined)
      return false;
    const campos= Object.keys(dato);
    delete dato['$setOnInsert']
    const no=['password','passwordA','token'];
    let resultado=false;
    
    try{
     campos.map((campo)=>{
       if (typeof dato[campo]==='object' && dato[campo]!==null){
          
          if (dato[campo].length){
            dato[campo].map( val=>{
              if (Ver_igualdad(val,valor)){
                resultado=true;
              }
              return val
            })
          }else{
            if (Ver_igualdad(dato[campo],valor)){
              resultado=true;
            }
          }
        }
       const val= '' + dato[campo];
       if ((no.indexOf(campo)===-1 && val.toLowerCase().indexOf(valor.toLowerCase())!==-1)|| valor===''){
         resultado=true;
       }
       return campo
     })
    }catch(error) {
      console.log('Ver_igualdad',error, dato, valor, campos);
      
    }
    return resultado;
}

export const Resultado_encontrados_k = (datos,valor) =>{
  let resultado=[];
  datos.map((dato)=>{
    if (Ver_igualdad_K(dato,valor)){
      resultado.push(dato);
    }
    return valor;
  })
  return resultado
}

export const Resultado_encontrados_k_p = (datos,valor) =>{
  let resultado=-1;
  for(let i=0; i<datos.length;i++){
    if (Ver_igualdad_K(datos[i],valor)){
      resultado=i;
      break;
    }

  }
  return resultado
}

export const Ver_igualdad_K = (dato, valor)=>{
    const campos= Object.keys(valor);
    let resultado=false;
    let cont=0;
     campos.map((campo)=>{
       if (''+dato[campo]===''+valor[campo]){
         cont++;
       }
       return campo
     })

     if (cont>=campos.length){
       resultado=true;
     }
    return resultado;
}

export const Buscar_array = (datos,valor) => {
  let resultado=[];
  datos.map((dato)=>{
    let igual =0;

    valor.map((v,i)=> {
      if (v===dato[i]) {
        igual++;
      }
      return v;
    })
    if (igual===valor.length){
      resultado.push(dato);
    }

    return dato;
  })
  return resultado;
}
export const Buscar_array_posicion = (datos,valor) => {
  let resultado=-1;
  for (let i=0;i < datos.length;i++){

      if (valor===datos[i][0]){
        resultado=i;
        break;
      }
  }
  return resultado;
}

export const crear_campos = async(campos, Form_origen)=>{
  let resultado=[]
  const list=Object.keys(campos)
  // Object.keys(campos).map(async val=>{
  // console.log(Form_origen)
  for (var i=0;i<list.length;i++){
      const val=list[i]
      if (campos[val].multiples){
          const otros= await crear_campos(campos[val].value, Form_origen)
          resultado=[...resultado,...otros.value]
      }else{

          let valor= campos[val]
          const pos= Form_origen.value.findIndex(v=> v.name===valor.name)
          
          if (Form_origen.value[pos] && (Form_origen.value[pos].tipo==='lista_multiuso' || Form_origen.value[pos].tipo==='lista_representados')){
              valor={
                  ...valor,
                  tipo:Form_origen.value[pos].tipo,
                  lista:Form_origen.value[pos].lista,
                  getOptionLabel:Form_origen.value[pos].getOptionLabel
              }
          }
          resultado=[...resultado, valor]
          
      }
      // return val;
  }//)
  
  return {columna:Form_origen.columna, value:resultado}
}

const item_form = async(val, valores, _id)=>{
  let resultado={
    ...val,
    tipo: val.tipo ? val.tipo : '',
    placeholder: val.placeholder ? val.placeholder : val.label ? val.label : '',
    label: val.label ? val.label : val.placeholder ? val.placeholder : '',
    value: valores[val.name] && val.no_mostrar!==true ? valores[val.name] : val.value ? val.value : val.default ? val.default : '', 
    required: val.required,
    mensaje_error: val.mensaje_error ? val.mensaje_error : val.error,
    disabled: val.disabled
              ? val.disabled
              : valores[val.name] && val.no_modificar
              ? true
              : false
  }
  // console.log(',,,,,',resultado )
  if (val.tipo==='Lista'){
    // console.log('En lista',val, valores[val.name], typeof valores[val.name], val.lista[valores[val.name]])

    resultado={
      ...resultado,
      value: typeof valores[val.name]==='object' ? valores[val.name]._id : val.lista[valores[val.name]],
      getOptionLabel: val.tipo==='Lista' ? (option)=> `${option.title ? option.title : option.titulo ? option.titulo : option.label}` : null,
      getOptionSelected: val.tipo==='Lista' ? (option)=> `${option.value ? option.value : option.titulo}` : null

    }
  }else if (val.multiline){
    resultado={
      ...resultado,
      multiline:true,
      maxRows: val.numberOfLines ? val.numberOfLines : val.maxRows ?  val.maxRows : 4,
    }
  }else if (val.tipo==='auto-codigo'){
    let cod = 'S';
    let numeracion = 10;
    let cant = 6;
    
    if (val.mensaje_error){
      let dat = val.mensaje_error.split(';');
      if (dat.length===1){
        cod=dat[0];
      }else if (dat.length===2){
        cod=dat[0];
        numeracion=dat[1];
      }else if (dat.length===3){
        cod=dat[0];
        numeracion=dat[1];
        cant=dat[2];
      }

    }
    resultado={
      ...resultado,
      tipo:'',
      value:valores[val.name] ? valores[val.name] : Generar_id(cod, numeracion, cant)

    }
  }else if (val.tipo==='lista_multiuso'){
    let lista  
    const table=val.lista;
    if (val.cargar){
      if (typeof val.lista==='string' && val.lista.indexOf('lista_')===-1) {  
        const listado = await conexiones.Leer_C([val.lista],{[val.lista]:{}})
        lista= listado.datos[val.lista].map( v=>{
          return {...v.valores ? {_id:v._id, ...v.valores} : v}
        })
      }else 
      if (val.lista.indexOf('lista_')!==-1){
        lista = Ver_Valores()['config']['Listas'][val.lista]
        if (lista===undefined) lista=[]
      }else {
        lista= val.lista
      };
      
      if (val.ordenar){
        let ordenar = eval(val.ordenar);
        lista = ordenar(lista);
      }
    }else{
      lista= val.lista
    }
    resultado={
      ...resultado,
      lista,
      value: typeof valores[val.name]==='object' ? valores[val.name] : lista[valores[val.name]], 
      tipo:'Lista',
      table,
      getOptionLabel:(option) => {
        let mostrar=''
        val.getOptionLabel.map(vl=>{ 
          const datan= vl.indexOf('.')!==-1 ? option[vl.split('.')[0]][vl.split('.')[1]] : option[vl]!==undefined ? option[vl] : option;
          mostrar = mostrar + datan + ' ';
          return vl
        })
        
        return mostrar;
      },
      getOptionSelected:(option) => {
        let mostrar=''
        val.getOptionLabel.map(vl=>{ 
          mostrar = mostrar + option[vl] + ' ';
          return vl
        })
        
        return mostrar;
      },
    }
  }else if (val.tipo==='lista_representados' && val.activar){
    // console.log(val);
    // let listado = await conexiones.Leer_C([val.lista],{
    //   [val.lista]:{$or:[{"valores.representante":undefined},{"valores.representante":null},{"valores.representante":"null"}]}})
    let listado = await conexiones.Leer_C(['uecla_Estudiante'],{
      uecla_Estudiante:{
                        $or:[{"valores.representante":null},{"valores.representante":""},{"valores.representante":null}]
                      }
    })
    // console.log(listado.datos['uecla_Estudiante'])
    const table=val.lista;
    const lista = listado.datos[val.lista].map( v=>{
      return {...v.valores}
    })
    let result=lista;
    
    if (val.filtro){
      const filtrado =eval(val.filtro)
      result=filtrado(lista) 
    }
    // console.log(result)
    resultado={
      ...resultado,
      lista:result, 
      table,
      getOptionLabel:(option) => {
        let mostrar=''
        val.getOptionLabel.map(vl=>{ 
          mostrar = mostrar + option[vl] + ' ';
          return vl
        })
        
        return mostrar;
      },
    }
    
    
  }else if (val.tipo==='Checkbox'){
    let result={}
    Object.keys(resultado).map(v =>{
      if (['getOptionLabel','agregar','Subtotal'].indexOf(v)===-1){
        result[v]=resultado[v]
      }
      return v
    })
    resultado={
      ...result,
      label:val.label.indexOf('/')!==-1 ? val.label :'Seleccionado/No Seleccionado',
      value:valores[val.name]

    }
  }else if (val.tipo==='Fecha'){
    resultado={
      ...resultado,
      type:'date'

    }
  }else if (val.tipo==='Tabla'){
    let Subtotal = Ver_Valores()['config']['Subtotales'][val.Subtotal]
    
    resultado={
      ...resultado,
      value:valores[val.name],
      Subtotal: typeof Subtotal==='object' ? Subtotal : val.Subtotal
    }
  }

  delete resultado.numberOfLines
  return resultado
}

export const genera_formulario = async (datos, columnas=1)=>{
  let {campos, valores,_id} = datos;
  columnas=campos.columna;
  campos=campos.value;
  let titulos={};
  
  // campos.map(async val=>{
  const filas= Math.ceil(campos.length/columnas);
  for (var i=0; i<filas; i++){
    titulos[i]={ multiples:true, listo:false, value:{}}
  }
  
  for (var j=0; j<campos.length; j++){
      const val = campos[j];
      // delete val.numberOfLines
      if (columnas===1){
        titulos[val.name]= await item_form(val, valores, _id)
      }else{
        if (window.innerWidth<650 || val.multiline || val.solo || ['lista_representados',  'Tabla','subtitulo'].indexOf(val.tipo)!==-1){ //'Avatar', 'avatar',
          // col=1;
          // fila=fila+1;
          // titulos[val.name]= await item_form(val, valores, _id);
          let pos= Object.keys(titulos).findIndex(f=> !titulos[f].listo && Object.keys(titulos[f].value).length===0);
          if (pos===-1) {
            titulos[Object.keys(titulos).length]={ multiples:true, listo:false, value:{}}
            pos=Object.keys(titulos).length-1;
          }
          titulos[pos].value[val.name]= await item_form(val, valores, _id);
          
          titulos[pos].listo=true ;
          if (pos!==0)
            titulos[pos-1].listo=true ;
        }else{
          let pos= Object.keys(titulos).findIndex(f=> !titulos[f].listo && Object.keys(titulos[f].value).length<columnas);
          if (pos===-1) {
            titulos[Object.keys(titulos).length]={ multiples:true, listo:false, value:{}}
            pos=Object.keys(titulos).length-1;
          }
          
          titulos[pos].value[val.name]= await item_form(val, valores, _id);
          if (titulos[pos].value[val.name].length===columnas) titulos[pos].listo=true ;
        } 
        
        // if(col<columnas){
          
        //   if (!titulos[fila]) titulos[fila]={ multiples:true,value:{}}
        //   titulos[fila].value[val.name]= await item_form(val, valores, _id);
        //   // console.log(val.name)
        //   col=col+1
        // }else{
          
        //   fila=fila+1;
        //   col=1;
        //   titulos[fila]={ multiples:true,value:{}}
        //   titulos[fila].value[val.name]=await item_form(val, valores, _id);
        // }
      }
      
      // return val
  }//)
  
  titulos= Filtar_vacios(titulos);
  
  // console.log(titulos, valores)
  return {titulos, datos:{_id,...valores}}
}

const Filtar_vacios = (titulos) =>{
  let nuevotitulo={}
  Object.keys(titulos).map(val=>{
    if ((titulos[val].multiples && Object.keys(titulos[val].value).length!==0)||(!titulos[val].multiples)){
      nuevotitulo[val]=titulos[val]
    }
    return val
  })

  return nuevotitulo
}