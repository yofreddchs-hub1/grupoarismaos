let Valores={}
export const Ver_Valores = ()=>{
    return Valores
}
  
export const nuevo_Valores = (nuevo)=>{
    Valores={...Valores, ...nuevo}
}

export const valores_sistema={
    app:"grupoarismaos",
    http1:"http://192.168.10.13:5005",
    http:"http://205.209.116.101:5005",
    "Estilos": {
      "Logo": {
          "height": 50,
          "width": 50
      },
      "Fondo_pantalla": {
          "backgroundColor": "rgba(255, 255, 255,1)"
      },
      "Input_label": {
          "color": "#000",
          "textAlign": "left"
      },
      "Input_helper": {
          "color": "#F92C2C",
          "textAlign": "left"
      },
      "Input_fondo": {
          "backgroundColor": "rgba(218, 201, 197,1)"
      },
      "Input_input": {
          "color": "#000"
      },
      "Input_input_disabled": {
          "color": "#A39C79"
      },
      "Input_icono": {
          "color": "#000"
      },
      "Input_icono_t": {
        "color": "#fff"
      },
      "Icon_lista": {
          "color": "#000"
      },
      "Barra_menu": {
          //"backgroundImage": "linear-gradient(180deg, #00ffff 0, #00e5ff 12.5%, #10a6f8 25%, #10a6fa 37.5%, #1e6ca3 50%, #1e6ca5 62.5%, #153959 75%, #15395b 87.5%, #000000 100%)",
          "backgroundImage": "linear-gradient(180deg, #83113E 0, #83113E 12.5%, #A31A51 25%, #A31A51 37.5%, #E30F9A 50%, #E30F9A 62.5%, #E64DB2 75%, #E64DB2 87.5%, #000000 100%)",
          "color": "#ffffff"
      },
      "Lista_menu_fondo": {
          "bgcolor": "#7ABC32",
          "padding": 0.2,
          "height": "100%"
      },
      "Lista_menu_cuerpo": {
          "primary": {
              "main": "rgb(102, 157, 246)"
          },
          "background": {
              "paper": "rgb(5, 30, 52)"
          }
      },
      "Dialogo_cuerpo": {
          "backgroundColor": "rgb(255, 255, 250)"
      },
      "Tabla_titulo": {
          "color": "#ffffff"
      },
      "Tabla_cabezera": {
          "backgroundImage": "linear-gradient(180deg, #83113E 0, #83113E 12.5%, #A31A51 25%, #A31A51 37.5%, #E30F9A 50%, #E30F9A 62.5%, #E64DB2 75%, #E64DB2 87.5%, #000000 100%)"
      },
      "Tabla_buscar_fondo": {
          "backgroundColor": "rgba(0, 0, 0,1)"
      },
      "Tabla_buscar_input": {
          "color": "#ffffff"
      },
      "Tabla_buscar_icono": {
          "color": "#ffffff"
      },
      "Tabla_titulos1": {
          "backgroundImage": "linear-gradient(0deg, rgba(0,0,0,1) 2%, rgba(2,57,80,1) 97%)",
          "color": "#ffffff"
      },
      "Tabla_columna": {
          "backgroundColor": "#9dfc74"
          
      },
      "Tabla_titulos": {
          "backgroundColor": "rgba(0, 0, 0,1)",
          "color": "#ffffff"
      },
      "Tabla_subtotal": {
          "backgroundColor": "rgba(251, 252, 252, 1)"
      },
      "Botones": {
          "Aceptar": {
              "backgroundImage": "linear-gradient(0deg, #19A203 0, #0E5003 50% )"
          },
          "Cancelar": {
              "backgroundImage": "linear-gradient(0deg, #524D4D 0, #080303 50% )"
          },
          "Eliminar": {
              "backgroundImage": "linear-gradient(0deg, #DB1007 0, #880904 50% )"
          }
      },
      "barra_menu": {
          "backgroundImage": "linear-gradient(180deg, #00ffff 0, #00e5ff 12.5%, #10a6f8 25%, #10a6fa 37.5%, #1e6ca3 50%, #1e6ca5 62.5%, #153959 75%, #15395b 87.5%, #000000 100%)"
      }
    },
    "Formularios": {

        "Form_User_api": {
            "columna": 2,
            "value": [
                
                {
                    "key": "username",
                    "name": "username",
                    "placeholder": "Usuario",
                    "mensaje_error": "Indique username",
                    "required": true,
                    "no_modificar": true
                },
                {
                    "key": "categoria",
                    "name": "categoria",
                    "label": "Categoria Usuario",
                    "tipo": "lista_multiuso",
                    "lista": "lista_categoria",
                    "multiple": false,
                    "getOptionLabel": [
                        "titulo"
                    ],
                    "modificar": "Cambio_categoria"
                },
                {
                    "key": "passwordn",
                    "name": "passwordn",
                    "label": "Contraseña",
                    "tipo": "password",
                    "comparar": "true",
                    "con": "passwordc",
                    "mensaje_error": "Contraseñas no son iguales",
                    "no_mostrar": true
                },
                {
                    "key": "passwordc",
                    "name": "passwordc",
                    "label": "Contraseña Confirmar",
                    "tipo": "password",
                    "comparar": "true",
                    "con": "passwordn",
                    "mensaje_error": "Contraseñas no son iguales"
                },
                
                {
                    "key": "nombre",
                    "name": "nombre",
                    "placeholder": "Nombre y Apellido"
                },
                {
                    "key": "permisos",
                    "name": "permisos",
                    "placeholder": "Permisos Adicionales Ejempo, guardar"
                }
            ]
        },
        "Form_login": {
        "columna": 1,
        "value": [
            {
            "key": "username",
            "name": "username",
            "placeholder": "Usuario",
            "mensaje_error": "Indique usuario",
            "required": true
            },
            {
            "key": "password",
            "name": "password",
            "label": "Contraseña",
            "tipo": "password",
            "mensaje_error": "Indique contraseña",
            "required": true
            }
        ]
        },  
        "Form_Inventario": {
            "columna": 2,
            "value": [
                {
                    "key": "codigo",
                    "name": "codigo",
                    "tipo": "input",
                    "placeholder": "Código del Producto",
                    "title": "Código del Producto",
                    "mensaje_error": "Indique el código del producto",
                    "required": true
                },
                {
                    "key": "nombre",
                    "name": "nombre",
                    "tipo": "input",
                    "placeholder": "Nombre del Producto",
                    "title": "Nombre del Producto",
                    "mensaje_error": "Indique nombre del producto",
                    "required": true
                },
                {
                    "key": "descripcion",
                    "nombre": "descripcion",
                    "tipo": "multiline",
                    "label": "Descripción",
                    "placeholder": "Descripción del Producto",
                    "title": "Descripción del Producto",
                    "disabled": false,
                    "getOptionLabel": [
                        "titulo"
                    ],
                    "agregar": false,
                    "name": "descripcion",
                    "multiline": true,
                    "maxRows": "3"
                },
                {
                    "nombre": "entradasalida",
                    "tipo": "Tabla",
                    "label": "Entradas / Salidas",
                    "placeholder": "Entradas / Salidas",
                    "title": "Entradas / Salidas",
                    "mensaje_error": "",
                    "disabled": true,
                    "numberOfLines": "",
                    "getOptionLabel": [
                        "titulo"
                    ],
                    "key": "entradasalida",
                    "name": "entradasalida",
                    "multiline": false,
                    "titulos": "Titulos_entrada_salida",
                    "Subtotal": "Subtotal_entrada_salida",
                    "nopaginar":true,
                    "noeliminar":true,
                    "style":{height:300}
                }
            ]
        },  
    
    },
    "Listas": {
        "lista_categoria": [
            {
                "_id": 0,
                "titulo": "AdministradorCHS",
                "permisos": [
                "*",
                "**",
                "*CHS"
                ]
            },
            {
                "_id": 1,
                "titulo": "Administrador",
                "permisos": [
                "*"
                ]
            },
            {
                "_id": 2,
                "titulo": "Personal",
                "permisos": ["Cobranza", "Pagar", "Administrativo", "Representantes","Estudiantes"]
            },
            {
                "_id": 3,
                "titulo": "Contador",
                "permisos": ["Sistema","/sistema","recibos", "Recibos"]
            }
        ],
    
        "lista_Forma_Pago": [
            {
                "_id": 0,
                "titulo": "Transferencia",
                "value": "transferencia",
                "permisos": ""
            },
            {
                "_id": 1,
                "titulo": "Debito",
                "value": "debito",
                "permisos": ""
            },
            {
                "_id": 7,
                "titulo": "Credito",
                "value": "credito",
                "permisos": ""
            },
            {
                "_id": 2,
                "titulo": "Efectivo Bolívar",
                "value": "efectivobolivar",
                "permisos": ""
            },
            {
                "_id": 3,
                "titulo": "Efectivo Dolar",
                "value": "efectivodolar",
                "permisos": ""
            },
            {
                "_id": 4,
                "titulo": "Zelle",
                "value": "zelle",
                "permisos": ""
            },
            {
                "_id": 5,
                "titulo": "Pago Móvil",
                "value": "pagomovil",
                "permisos": ""
            },
            {
                "_id": 6,
                "titulo": "Otro",
                "value": "otro",
                "permisos": ""
            }
        ],
        "lista_bancos":[
            {
                "_id": "0175",
                "titulo": "BANCO BICENTENARIO",
                "value": "0175",
                "permisos": "",
                "id": 1,
                "otro": "VED"
            },
            {
                "_id": "0128",
                "titulo": "BANCO CARONI, C.A. BANCO UNIVERSAL",
                "value": "0128",
                "permisos": "",
                "id": 2,
                "otro": "VED"
            },
            {
                "_id": "0102",
                "titulo": "BANCO DE VENEZUELA",
                "value": "0102",
                "id": 3,
                "permisos": "",
                "otro": "VED"
            },
            {
                "_id": "0114",
                "titulo": "BANCO DEL CARIBE",
                "value": "0114",
                "id": 4,
                "permisos": "",
                "otro": "VED"
            },
            {
                "_id": "0163",
                "titulo": "BANCO DEL TESORO",
                "value": "0163",
                "id": 5,
                "permisos": "",
                "otro": "VED"
            },
            {
                "_id": "0105",
                "titulo": "BANCO MERCANTIL",
                "value": "0105",
                "id": 6,
                "permisos": "",
                "otro": "VED"
            },
            {
                "_id": "0191",
                "titulo": "BANCO NACIONAL DE CREDITO",
                "value": "0191",
                "id": 7,
                "permisos": "",
                "otro": "VED"
            },
            {
                "_id": "0116",
                "titulo": "BANCO OCCIDENTAL DE DESCUENTO.",
                "value": "0116",
                "id": 8,
                "permisos": "",
                "otro": "VED"
            },
            {
                "_id": "0108",
                "titulo": "BANCO PROVINCIAL BBVA",
                "value": "0108",
                "id": 9,
                "permisos": "",
                "otro": "VED"
            },
            {
                "_id": "0134",
                "titulo": "BANESCO BANCO UNIVERSAL",
                "value": "0134",
                "id": 10,
                "permisos": "",
                "otro": "VED"
            },
            {
                "_id": "0177",
                "titulo": "BANFANB",
                "value": "0177"
            },
            {
                "_id": "0190",
                "titulo": "CITIBANK.",
                "value": "0190",
                "id": 12,
                "permisos": "",
                "otro": "VED"
            },
            {
                "_id": "0121",
                "titulo": "CORP BANCA.",
                "value": "0121",
                "id": 13,
                "permisos": "",
                "otro": "VED"
            },
            {
                "_id": "0157",
                "titulo": "DELSUR BANCO UNIVERSAL",
                "value": "0157",
                "id": 14,
                "permisos": "",
                "otro": "VED"
            },
            {
                "_id": "0151",
                "titulo": "FONDO COMUN",
                "value": "0151",
                "id": 15,
                "permisos": "",
                "otro": "VED"
            },
            {
                "_id": "BOA",
                "titulo": "BANK OF AMERICA",
                "value": "BOA",
                "permisos": "",
                "id": 16,
                "otro": "USD"
            },
            {
                "_id": "0172",
                "titulo": "BANCAMIGA BANCO MICROFINANCIERO, C.A.",
                "value": "0172",
                "permisos": "",
                "id": 17,
                "otro": "VED"
            }
        ],
    
    },
    "Titulos": {
      
        "Titulos_Formaspago": [
            {
                "title": "Forma de Pago",
                "field": "titulo",
                "tipo": "",
                "formato": "",
                "default": "",
                "type": ""
            },
            {
                "title": "Moneda",
                "field": "moneda",
                "tipo": "",
                "default": "Bs",
                "formato": "(dato)=>{let valor = dato.field && dato.row && ['efectivodolar','zelle'].indexOf(dato.row.value)!==-1 ? '$' : 'Bs'; if(dato.field && dato.row && dato.row.value==='otro'){valor=dato.row.moneda}; return valor}",
                "type": "singleSelect1",
                "valueOptions": ["Bs", "$"],
                "editable": true,
                "modificar":true
            },            
            {
                "title": "Banco Origen",
                "field": "bancoo",
                "tipo": "",
                "formato": "",
                "default": "",
                "type": "singleSelect1",
                "valueOptions": "lista_bancos",
                "getOptionLabel": [
                    "titulo"
                ],
                "editable": true,
                "modificar":true
            },
            {
                "title": "Banco Destino",
                "field": "bancod",
                "tipo": "",
                "formato": "",
                "default": "",
                "type": "singleSelect1",
                "valueOptions": "uecla_Cuenta",
                "getOptionLabel": [
                    "banco.titulo"
                ],
                "editable": true,
                "modificar":true
            },
            {
                "title": "Referencia",
                "field": "referencia",
                "tipo": "",
                "formato": "",
                "default": "",
                "type": "",
                "editable": true,
                "modificar":true,
                "verificar":true,
                "tabla_verificar":"uecla_Referencia",
                "campo_verificar":"valores.referencia",
                "mensaje_verificar":"Verifica si se encuentra registrada la referencia",
                "mensaje_verificar_error": "Referecia utilizada en recibo: ",
                "mensaje_verificar_ok":"Referencia no se encuentra registrada",
                "mensaje_recomienda":"Enviado por WhatsApp",
                "formato_mensaje_recomienda":"Mensaje_recomienda"
            },
            {
                "title": "Fecha",
                "field": "fecha",
                "tipo": "Fecha",
                "formato": "",
                "default": "actual",
                "type": "",
                "editable": true,
                "modificar":true
            },
            {
                "title": "Monto",
                "field": "monto",
                "tipo": "moneda",
                "formato": "",
                "default": "",
                "type": "number",
                "editable": true,
                "modificar":true,
                "mensaje_recomienda":"Enviado por WhatsApp",
                "formato_mensaje_recomienda":"Mensaje_recomienda"
            }
        ],
        
        "Titulos_User_api": [
            {
                "title": "Usuario",
                "field": "username",
                "tipo": "",
                "formato": "(dato)=> {\nreturn `${dato.valores && dato.valores.username ? dato.valores.username : ''}`\n}",
                "default": "",
                "type": ""
            },
            {
                "title": "Categoria",
                "field": "categoria",
                "tipo": "lista_categoria"
            },
            {
                "title": "Nombres",
                "field": "nombres",
                "tipo": "",
                "formato": "(dato)=> {\nreturn `${dato.valores && dato.valores.nombre ? dato.valores.nombre : ''}`\n}",
                "default": "",
                "type": ""
            }
        ],

        "Titulos_Inventario": [
            {
                "title": "Código",
                "field": "codigo",
                "tipo": "",
                "formato": "(dato)=> {\nreturn `${dato.valores && dato.valores.codigo ? dato.valores.codigo : ''}`\n}",
                "default": "",
                "type": ""
            },
            {
                "title": "Nombre",
                "field": "nombre",
                "tipo": "",
                "formato": "(dato)=> {\nreturn `${dato.valores && dato.valores.nombre ? dato.valores.nombre : ''}`\n}",
                "default": "",
                "type": ""
            },
            {
                "title": "Descripción",
                "field": "descripcion",
                "tipo": "",
                "formato": "(dato)=> {\nreturn `${dato.valores && dato.valores.descripcion ? dato.valores.descripcion : ''}`\n}",
                "default": "",
                "type": ""
            },
            {
                "title": "Cantidad Total",
                "field": "cantidad",
                "tipo": "",
                "formato": "(dato)=> {\nreturn `${dato.valores && dato.valores.cantidad ? dato.valores.cantidad : ''}`\n}",
                "default": "",
                "type": ""
            }
        ],
        "Titulos_entrada_salida": [
            {
                "title": "Id",
                "field": "id",
                "tipo": "",
                "formato": "",
                "default": "",
                "type": "",
                "width": 50,
                "flex": 1
            },
            {
                "title": "Fecha",
                "field": "fecha",
                "tipo": "",
                "formato": "",
                "default": "",
                "type": "",
                "width": 170,
                "flex": 2
            },
            {
                "title": "Descripción",
                "field": "descripcion",
                "tipo": "",
                "formato": "",
                "default": "",
                "type": "",
                "width": 340,
                "flex": 7
            },
            {
                "title": "Cantidad",
                "field": "cantidad",
                "tipo": "",
                "formato": "",
                "default": "",
                "type": "number",
                "flex": 2
            }
        ],
    },
    "Subtotales":{
        "Subtotal_entrada_salida":[
            [
                {"title":"Entradas"},
                {
                    "title": "",
                    "field": "entradas",
                    "default": 0,
                    "formato": "Subtotal_entrada",
                    "formato_anterior": "(dato, resultado)=> {console.log('...', dato, resultado) return (dato.value==='cantidad' ? dato.cantidad + Number(resultado.cantidad) : Number(resultado.cantidad))}"
                },
                {"title":"Salidas"},
                {
                    "title": "",
                    "field": "salidas",
                    "default": 0,
                    "formato": "Subtotal_salida",
                },
                {"title":"Total"},
                {
                    "title": "",
                    "field": "total",
                    "default": 0,
                    "formato": "Subtotal_entrada_salida",
                }
            ]
        ]
    }
}