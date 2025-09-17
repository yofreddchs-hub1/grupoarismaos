import {  useState, useEffect, useRef } from 'react'
import { Titulos_todos, Ver_Valores, Form_todos } from '@/src/comunes';
import Cargando from '../cargar/cargaajustable';
import { conexiones, genera_formulario } from '../../comunes';
import Formulario from '../herramientas/formulario';
import moment from 'moment';
import Scrollbars from '../herramientas/scrolbars';
import { Buscar_campo } from '../../comunes/fespeciales';
import { LibroMes } from '../../comunes/delsistema';
import Tabla from '../herramientas/tabla';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { Imprimir_detalles } from '../../comunes/imprimir';
import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'
import { right } from '@cloudinary/url-gen/qualifiers/textAlignment';
import Dialogo from '../herramientas/dialogo';

const paginaancho=612;
export default function Libro(props) {
    const reportRef = useRef(null);
    const [state, setState] = useState({cargando:true, dialogo:{open:false}});
    const [alto, setAlto] = useState(0);
    const [pdf, setPDF] = useState();
    const [cambiar, setCambiar] = useState(0);
    const [estilo, setEstilo]=useState({width:paginaancho, height:500, padding:10, backgroudcolor:'#f0f'})

    const cambiarState = (nuevostate)=>{
        setState({...state, ...nuevostate})
    }

    

    useEffect(() => {
        const Cambio_fecha=async(valores)=>{
            const fecha = valores.resultados.fecha.split('-');
            cargar(new Date(`${fecha[0]}-${Number(fecha[1])}`));
        }
        const cargar = async(fecha = new Date())=>{
            cambiarState({...state, cargando:true});
            let titulos = await Titulos_todos(`Titulos_libroES`, Ver_Valores());
            let fila1=[
                {
                    "title": "PRODUCTOS",
                    "fija":true,
                    "field": "nombre",
                    "tipo": "",
                    "formato": "",
                    "default": "",
                    "type": "",
                    "minWidth": 280
                },
                {
                    "title": "EXISTENCIA INICIAL",
                    "colSpan":3,
                    "field": "cantidadI",
                    "tipo": "",
                    "formato": "",
                    "default": "",
                    "type": "number",
                    //   "editable": false,
                    //   "modificar":false,
                    "align":"center",
                    "width": 100,
                },
          
                {
                    "title": "ENTRADAS",
                    "field": "cantidadE",
                    "colSpan":2,
                    "tipo": "",
                    "formato": "",
                    "default": "",
                    "type": "number",
                    "width": 100,
                    "align":"center",
                },
                {
                    "title": "SALIDAS POR VENTA",
                    "colSpan":2,
                    "field": "cantidadSV",
                    "tipo": "",
                    "formato": "",
                    "default": "",
                    "type": "number",
                    //   "editable": false,
                    //   "modificar":false,
                    "flex": 1.5,
                    "width": 100,
                    "align":"center",
                },
                {
                    "title": "SALIDAS POR AUTOCONSUMO",
                    "colSpan":2,
                    "field": "cantidadSA",
                    "tipo": "",
                    "formato": "",
                    "default": "",
                    "type": "number",
                    //   "editable": false,
                    //   "modificar":false,
                    "flex": 1.5,
                    "width": 100,
                    "align":"center",
                },
                {
                    "title": "SALIDAS POR MUESTRA",
                    "colSpan":2,
                    "field": "cantidadSM",
                    "tipo": "",
                    "formato": "",
                    "default": "",
                    "type": "number",
                    //   "editable": false,
                    //   "modificar":false,
                    "flex": 1.5,
                    "width": 100,
                    "align":"center",
                },
          
                {
                    "title": "SALIDAS POR OBSEQUIO",
                    "colSpan":2,
                    "field": "cantidadSO",
                    "tipo": "",
                    "formato": "",
                    "default": "",
                    "type": "number",
                    //   "editable": false,
                    //   "modificar":false,
                    "flex": 1.5,
                    "width": 100,
                    "align":"center",
                },
                {
                    "title": "SALIDA POR DETERIORO",
                    "colSpan":2,
                    "field": "cantidadSD",
                    "tipo": "",
                    "formato": "",
                    "default": "",
                    "type": "number",
                    //   "editable": false,
                    //   "modificar":false,
                    "flex": 1.5,
                    "width": 100,
                    "align":"center",
                },
                {
                    "title": "EXISTENCIA FINAL",
                    "colSpan":3,
                    "field": "cantidadF",
                    "tipo": "",
                    "formato": "",
                    "default": "",
                    "type": "number",
                    //   "editable": false,
                    //   "modificar":false,
                    "align":"center",
                    "width": 100,
                },
          
            ]
            
            titulos={filas:2, datos:[fila1, titulos], values:[...titulos]};
            let nuevo = await genera_formulario({valores:{},campos:Form_todos('Form_LibroM')});
            let pos = Buscar_campo('fecha',nuevo.titulos)
            // const fecha = new Date();
            nuevo.titulos[pos].value.fecha.value= moment(fecha).format("YYYY-MM");
            console.log(nuevo.titulos[pos].value.fecha.value)
            nuevo.titulos[pos].value.fecha.onChange=Cambio_fecha
            nuevo.datos.fecha=moment(fecha).format("YYYY-MM");

            const resultado=await LibroMes(fecha);
            // pos = Buscar_campo('movimiento',nuevo.titulos)
            // nuevo.titulos[pos].value.movimiento.style={
            //     height: alto ? alto * 0.3 : "100%"
            // }
            // nuevo.datos.movimiento=resultado;
            // nuevo.titulos[pos].value.movimiento.value=resultado;
            cambiarState({...state, formulario:nuevo, datos:resultado,fecha, titulos, cargando:false});
        }
        if (alto!==0)
            cargar();
      
    },[alto, cambiar])

    const generarPdf = ()=>{
        // console.log(state.datos, state.fecha);
        
        var doc = new jsPDF( 'l','mm', 'legal');
        const totalPagesExp = '{total_pages_count_string}'
        // generate the above data table
        var columns1 = [
            {header: 'PRODUCTOS', dataKey:'nombre'},
            {header: 'EXISTENCIA INCIAL', dataKey:'cantidadI'},
            {header: 'ENTRADAS', dataKey:'entradas'},
            {header: 'SALIDAS POR VENTA', dataKey:'salidasv'},
            {header: 'SALIDAS POR AUTOCONSUMO', dataKey:'salidasa'},
            {header: 'SALIDAS POR MUESTRA', dataKey:'salidasm'},
            {header: 'SALIDAS POR OBSEQUIO', dataKey:'salidaso'},
            {header: 'SALIDAS POR DETERIORO', dataKey:'salidasd'},
            {header: 'EXISTENCIA FINAL', dataKey:'final'},
            
        ]
        var columns = [
                {header: 'NOMBRE', dataKey:'nombre'},
                {header: 'CANT', dataKey:'cantidadI'},
                {header: 'COSTO', dataKey:'costouniI'},
                {header: 'MONTO', dataKey:'montoI'},
                {header: 'CANT', dataKey:'cantidadE'},
                {header: 'MONTO', dataKey:'montoE'},
                {header: 'CANT', dataKey:'cantidadSV'},
                {header: 'MONTO', dataKey:'montoSV'},
                {header: 'CANT', dataKey:'cantidadSA'},
                {header: 'MONTO', dataKey:'montoSA'},
                {header: 'CANT', dataKey:'cantidadSM'},
                {header: 'MONTO', dataKey:'montoSM'},
                {header: 'CANT', dataKey:'cantidadSO'},
                {header: 'MONTO', dataKey:'montoSO'},
                {header: 'CANT', dataKey:'cantidadSD'},
                {header: 'MONTO', dataKey:'montoSD'},
                {header: 'CANT', dataKey:'cantidadF'},
                {header: 'MONTO', dataKey:'montoF'},
        ]
        var head = [
            [
                {
                    content: 'PRODUCTO',
                    rowSpan:2,
                    styles: { halign: 'center', fillColor: 0 },
                },
                {
                    content: 'EXISTENCIA INICIAL',
                    colSpan:3,
                    styles: { halign: 'center', fillColor: 0 },
                },
                {
                    content: 'ENTRADAS',
                    colSpan:2,
                    styles: { halign: 'center', fillColor: 0 },
                },
                {
                    content: 'VENTA',
                    colSpan:2,
                    styles: { halign: 'center', fillColor: 0 },
                },
                {
                    content: 'AUTOCONSUMO',
                    colSpan:2,
                    styles: { halign: 'center', fillColor: 0 },
                },
                {
                    content: 'MUESTRA',
                    colSpan:2,
                    styles: { halign: 'center', fillColor: 0 },
                },
                {
                    content: 'OBSEQUIO',
                    colSpan:2,
                    styles: { halign: 'center', fillColor: 0 },
                },
                {
                    content: 'DETERIORO',
                    colSpan:2,
                    styles: { halign: 'center', fillColor: 0 },
                },
                {
                    content: 'EXISTENCIA FINAL',
                    colSpan:2,
                    styles: { halign: 'center', fillColor: 0 },
                },
            ],
            [
               
                {
                    content: 'CANT',
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'COSTO',
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'MONTO',
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'CANT',
                    colSpan:1,
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'MONTO',
                    colSpan:1,
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'CANT',
                    colSpan:1,
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'MONTO',
                    colSpan:1,
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'CANT',
                    colSpan:1,
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'MONTO',
                    colSpan:1,
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'CANT',
                    colSpan:1,
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'MONTO',
                    colSpan:1,
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'CANT',
                    colSpan:1,
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'MONTO',
                    colSpan:1,
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'CANT',
                    colSpan:1,
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'MONTO',
                    colSpan:1,
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'CANT',
                    colSpan:1,
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
                {
                    content: 'MONTO',
                    colSpan:1,
                    styles: { halign: 'center', fillColor: 0 },
                    
                },
            ]
        ]
        var body = state.datos;
        // New Header and Footer Data Include the table
        var y = 5;
        doc.setLineWidth(2);
        doc.setFontSize(11)
        doc.text(15, y = y + 10, "NOMBRE: GRUPO ARISMAOS C.A.");
        doc.text(15, y = y +6 , "RIF: J316037207");
        const pageSize = doc.internal.pageSize
        const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
        const text = doc.splitTextToSize("DIRECCIÓN: CALLE 20 DE FEBRERO CON AVENIDDA MANAURE Y BOLIVAR CASA NRO S/N SECTOR CENTRO, CORO EDO FALCÓN SANTA ANA DE CORO FALCÓN ZONA POSTAL 4101", pageWidth - 30, {})
        doc.text(15, y = y + 6, text);
        doc.setFontSize(15)
        doc.text(95, y = y + 16, "REGISTRO DETALLADO DE ENTRADA Y SALIDA DE MERCANCIA");
        doc.text(15, y, `Período: ${moment(state.fecha).format('MM/YYYY')}`);
        
        autoTable(doc,{
            startY: y+10,
            columns: columns1,
            tableLineColor: [44, 62, 80],
            tableLineWidth: 1,
            styles: {
                lineColor: [44, 62, 80],
                lineWidth: 1,
            },
            body:[
                {
                    nombre:'PRODUCTOS', cantidadI:'EXISTENCIA INCIAL', entradas:'ENTRADAS',
                    salidasv:'SALIDAS POR VENTA', salidasa:'SALIDAS POR AUTOCONSUMO',
                    salidasm: 'SALIDAS POR MUESTRA', salidaso:'SALIDAS POR OBSEQUIO',
                    salidasd:'SALIDAS POR DETERIORO', final:'EXISTENCIA FINAL'
                }
            ],
            showHead: false,
            columnStyles: {
                nombre:{halign:'center', valign:'bottom', fillColor: 0, textColor: 255, fontStyle: 'bold' },
                cantidadI:{halign:'center', valign:'bottom', fillColor: 0, textColor: 255, fontStyle: 'bold', cellWidth: 13+17+16 }, 
                entradas:{halign:'center', valign:'bottom', fillColor: 0, textColor: 255, fontStyle: 'bold', cellWidth: 13+17 },
                salidasv:{halign:'center', valign:'bottom', fillColor: 0, textColor: 255, fontStyle: 'bold', cellWidth:13+17 },
                salidasa:{halign:'center', valign:'bottom', fillColor: 0, textColor: 255, fontStyle: 'bold', cellWidth:13+18 },
                salidasm:{halign:'center', valign:'bottom', fillColor: 0, textColor: 255, fontStyle: 'bold', cellWidth:13+17 },
                salidaso:{halign:'center', valign:'bottom', fillColor: 0, textColor: 255, fontStyle: 'bold', cellWidth:13+17 },
                salidasd:{halign:'center', valign:'bottom', fillColor: 0, textColor: 255, fontStyle: 'bold', cellWidth:13+17 },
                final:{halign:'center', valign:'bottom', fillColor: 0, textColor: 255, fontStyle: 'bold', cellWidth:13+17 },
            },
            
            rowPageBreak: 'auto',
        })
        autoTable(doc, {
            body: body,
            startY: doc.lastAutoTable.finalY,
            columns,
            // foot:[[' ', 'Price total', '130000', '  ']],
            headStyles :{textColor: [255, 255, 255], 
                fillColor:0, 
                halign:'center',
                lineColor: [44, 62, 80],
                lineWidth: 1,
            },
            bodyStyles :{textColor: [0, 0, 0], valign: 'top'},
            // footStyles :{textColor: [255, 255, 255],},
            
            columnStyles: {
                cantidadI:{halign:'center', cellWidth:13},
                cantidadE:{halign:'center', cellWidth:13},
                cantidadSV:{halign:'center', cellWidth:13},
                cantidadSA:{halign:'center', cellWidth:13},
                cantidadSM:{halign:'center', cellWidth:13},
                cantidadSO:{halign:'center', cellWidth:13},
                cantidadSD:{halign:'center', cellWidth:13},
                cantidadF:{halign:'center', cellWidth:13},

                costouniI:{halign:'right', cellWidth:16},
                montoI:{halign:'right', cellWidth:17},
                montoE:{halign:'right', cellWidth:17},
                montoSV:{halign:'right', cellWidth:17},
                montoSA:{halign:'right', cellWidth:18},
                montoSM:{halign:'right', cellWidth:17},
                montoSO:{halign:'right', cellWidth:17},
                montoSD:{halign:'right', cellWidth:17},
                montoF:{halign:'right', cellWidth:17},
            },
            
            //  rowPageBreak: 'auto',
            
            horizontalPageBreak: true,
            // repeat this column in split pages
            theme: 'grid',
            // horizontalPageBreakRepeat: 0,
            didDrawPage: function (data) {
                // Footer
                let str = 'Pagina ' + doc.internal.getNumberOfPages()
                // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    str = str + ' de ' + totalPagesExp
                }
                doc.setFontSize(10)

                // jsPDF 1.4+ uses getHeight, <1.4 uses .height
                const pageSize = doc.internal.pageSize
                const pageHeight = pageSize.height
                    ? pageSize.height
                    : pageSize.getHeight()
                doc.text(str, data.settings.margin.left, pageHeight - 10)
            },
		})
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp)
        }
        setPDF(doc);
        cambiarState({
            dialogo:{
                open:true,
                Titulo:'Imprimir',
                tam:'xl',
                Cuerpo:<div style={{height:alto * 0.9}}>
                                    <embed src={`${doc.output('bloburl')}#view=Fit=1&toolbar=1&navpanes=0&scrollbar=1`} type="application/pdf" width="100%" height={'100%' } />
                            </div>,
                Cerrar:()=>{
                    cambiarState({dialogo:{open:false}})
                }
            }
        })
    }
    useEffect(() => {
      if (typeof window !== 'undefined') { // Asegurarse de que window está disponible
        setAlto(window.innerHeight);
      }
        
    }, []);
    
    
    return state.cargando ? <Cargando open={true} height={alto *0.8}/> :(
        <div>
            <Tabla Titulo={'Detalles entradas salidas'}
                alto={alto *0.65}
                Config={Ver_Valores()}
                titulos={state.titulos}
                table={Ver_Valores().database.libro}
                cantidad={state.datos ? state.datos.length : 0}
                datos={state.datos}
                Noactualizar
                cargaporparte={true}
                sinpaginacion
                acciones={
                    <Stack direction="row" spacing={1}>
                        <IconButton size="large" sx={{color:'#FFF'}} title={'Imprimir'} onClick={generarPdf}>
                            <Icon>print</Icon>
                        </IconButton>

                        <Formulario {...state.formulario} 
                            config={{...Ver_Valores(),
                                Estilos:{
                                    Input_label:{color:'#fff'}
                                }
                            }}
                        />
                    </Stack>
                }

            />
            
            <Dialogo {...state.dialogo} config={Ver_Valores()}/>
        </div>
    //   <Scrollbars sx={{ height:alto ? alto * 0.8 : 300, flexGrow: 1, padding:0.5, ...Ver_Valores().Estilos.Dialogo_cuerpo ? Ver_Valores().Estilos.Dialogo_cuerpo :{}}}>
    //     <Formulario {...state.formulario} Config={Ver_Valores()} />
    //   </Scrollbars>
    ) 
    
  ;
}
