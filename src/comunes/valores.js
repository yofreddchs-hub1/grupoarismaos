let Valores={}
export const Ver_Valores = ()=>{
    return Valores
}
  
export const nuevo_Valores = (nuevo)=>{
    Valores={...Valores, ...nuevo}
}
const app = 'grupoarismaos';
export const valores_sistema={
    app,
    http1:"http://192.168.10.13:5005",
    http2:"http://205.209.116.101:5005",
    http:"https://dev.raqlan.com",
    database:{
        usuario:`${app}_User_api`,
        producto:`${app}_Mercancia`,
        ingreso:`${app}_Ingreso`,
        movimiento:`${app}_Movimiento`,
        proveedor:`${app}_Proveedor`,
        cliente:`${app}_Cliente`,
    },
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
                    "tipo": "codigo",
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
                    "key": "categoria",
                    "name": "categoria",
                    "label": "Categoria Producto",
                    "tipo": "lista_multiuso",
                    "lista": "lista_categoria_productos",
                    "multiple": false,
                    "getOptionLabel": [
                        "titulo"
                    ],
                    
                },
                {
                    "key": "stock",
                    "name": "stock",
                    "tipo": "number",
                    "placeholder": "Stock Minimo",
                    "title": "Stock Minimo",
                    "mensaje_error": "Indique nombre del producto",
                    "default":1,
                    "required": false
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
        "Form_Ingresos": {
            "columna": 3,
            "value": [
                {
                    "nombre": "titulo1",
                    "tipo": "subtitulo",
                    "label": "ENTRADAS",
                    "title": "ENTRADAS",
                    "name": "titulo1"
                },
                {
                    "key": "tipo",
                    "name": "tipo",
                    "label": "Forma de Entrada",
                    "placeholder": "Forma de Entrada",
                    "title": "Forma de Entrada",
                    "tipo": "lista_multiuso",
                    "lista": "lista_tipo",
                    "multiple": false,
                    "getOptionLabel": [
                        "titulo"
                    ],
                    "required": true,
                    "mensaje_error": "Indique forma de ingresar producto",
                    "modificar": "Cambio_tipo"
                },
                {
                    "key": "numero",
                    "name": "numero",
                    "tipo": "input",
                    "placeholder": "Numero de Control (Factura / Recibo)",
                    "title": "Numero de control Factura o recibo",
                    "mensaje_error": "Indique el numero de control",
                    "required": true,
                    "disabled": true,
                },
                {
                    "nombre": "fecha",
                    "tipo": "",
                    "label": "Fecha",
                    "placeholder": "Fecha: dia/mes/año",
                    "title": "Dia",
                    "type":"date",
                    "mensaje_error": "",
                    "disabled": false,
                    "numberOfLines": "",
                    "getOptionLabel": [
                        "titulo"
                    ],
                    "key": "fecha",
                    "name": "fecha",
                    "multiline": false
                },
                {
                  "nombre": "proveedor",
                  "tipo": "lista_multiuso",
                  "label": "Proveedor",
                  "placeholder": "Proveedor",
                  "title": "Proveedor",
                  "required": false,
                  "mensaje_error": "Debe seleccionar proveedor",
                  "disabled": false,
                  "numberOfLines": "",
                  "lista": `${app}_Proveedor`,
                  "getOptionLabel": [
                      "rif",
                      "nombre"
                  ],
                  "agregar": true,
                  "key": "proveedor",
                  "name": "proveedor",
                  "form": "Form_Proveedor"
                },
                {
                    "key": "movimietno",
                    "name": "movimiento",
                    "label": " ",
                    "tipo": "Tabla",
                    "titulos": "Titulos_es_producto",
                    "form":"Form_es_productos",
                    "nopaginar": true,
                    "style": {
                        "height": 300
                    },
                    "editables": "Editores_productos",
                    "required": true,
                }
            ]
        },
        "Form_Salidas": {
            "columna": 3,
            "value": [
                {
                    "nombre": "titulo1",
                    "tipo": "subtitulo",
                    "label": "SALIDAS",
                    "title": "SALIDAS",
                    "name": "titulo1"
                },
                {
                    "key": "tipo",
                    "name": "tipo",
                    "label": "Forma de Salida",
                    "placeholder": "Forma de Salida",
                    "title": "Forma de Salida",
                    "tipo": "lista_multiuso",
                    "lista": "lista_tipo_S",
                    "multiple": false,
                    "getOptionLabel": [
                        "titulo"
                    ],
                    "required": true,
                    "mensaje_error": "Indique forma de retirar producto",
                    "modificar": "Cambio_tipo_s"
                },
                {
                    "key": "numero",
                    "name": "numero",
                    "tipo": "input",
                    "placeholder": "Numero de Control (Factura / Recibo)",
                    "title": "Numero de control Factura o recibo",
                    "mensaje_error": "Indique el numero de control",
                    "required": true,
                    "disabled": true,
                },
                {
                    "nombre": "fecha",
                    "tipo": "",
                    "label": "Fecha",
                    "placeholder": "Fecha: dia/mes/año",
                    "title": "Dia",
                    "type":"date",
                    "mensaje_error": "",
                    "disabled": false,
                    "numberOfLines": "",
                    "getOptionLabel": [
                        "titulo"
                    ],
                    "key": "fecha",
                    "name": "fecha",
                    "multiline": false
                },
                {
                    "nombre": "cliente",
                    "tipo": "lista_multiuso",
                    "label": "Cliente",
                    "placeholder": "Cliente",
                    "title": "Cliente",
                    "required": true,
                    "mensaje_error": "Debe seleccionar cliente",
                    "disabled": false,
                    "numberOfLines": "",
                    "lista": `${app}_Cliente`,
                    "getOptionLabel": [
                        "rif",
                        "nombre"
                    ],
                    "agregar": true,
                    "key": "cliente",
                    "name": "cliente",
                    "form": "Form_Cliente"
                },
                {
                    "key": "movimietno",
                    "name": "movimiento",
                    "label": " ",
                    "tipo": "Tabla",
                    "titulos": "Titulos_es_producto",
                    "form":"Form_es_productos",
                    "nopaginar": true,
                    "style": {
                        "height": 300
                    },
                    "editables": "Editores_productos",
                    "required": true,
                }
            ]
        },
        "Form_es_productos": {
          "columna": 1,
          "value": [
              {
                  "nombre": "select_a",
                  "tipo": "lista_multiuso",
                  "label": "Seleccione Producto",
                  "placeholder": "Seleccione Producto",
                  "title": "Seleccione Producto",
                  "mensaje_error": "",
                  "disabled": false,
                  "numberOfLines": "",
                  "lista": `${app}_Mercancia`,
                  "getOptionLabel": [
                      "codigo",
                      "descripcion"
                  ],
                  "key": "select_a",
                  "name": "select_a",
                  "onKeyDown":"Buscar_producto",
                  "agregar":"codebar"
              }
          ]
        },
        "Form_Proveedor": {
          "columna": 2,
          "value": [
              {
                  "key": "rif",
                  "name": "rif",
                  "label": "Cedula / Rif",
                  "tipo": "input",
                  "mensaje_error": "Indique documento de identidad",
                  "required": true
              },
              {
                  "key": "nombre",
                  "name": "nombre",
                  "label": "Nombre",
                  "mensaje_error": "Indique nombre del proveedor ",
                  "required": true
              },
              {
                  "key": "telefono",
                  "name": "telefono",
                  "label": "Telefono de contacto"
              },
              {
                  "key": "email",
                  "name": "email",
                  "label": "Correo electronico"
              },
              {
                  "key": "direcion",
                  "name": "direccion",
                  "label": "Dirección",
                  "multiline": true,
                  "numberOfLines": 4
              },
              {
                  "key": "descripcion",
                  "name": "descripcion",
                  "label": "Descripción",
                  "multiline": true,
                  "numberOfLines": 4
              },
              {
                  "nombre": "codigo",
                  "tipo": "auto-codigo",
                  "label": "Código",
                  "placeholder": "Código",
                  "title": "Código",
                  "mensaje_error": "P",
                  "disabled": true,
                  "numberOfLines": "",
                  "getOptionLabel": [
                      "titulo"
                  ],
                  "key": "codigo",
                  "name": "codigo",
                  "multiline": false
              }
          ]
        },
        "Form_Cliente": {
          "columna": 2,
          "value": [
              {
                  "key": "rif",
                  "name": "rif",
                  "label": "Cedula / Rif",
                  "tipo": "input",
                  "mensaje_error": "Indique documento de identidad",
                  "required": true
              },
              {
                  "key": "nombre",
                  "name": "nombre",
                  "label": "Nombre",
                  "mensaje_error": "Indique nombre del proveedor ",
                  "required": true
              },
              {
                  "key": "telefono",
                  "name": "telefono",
                  "label": "Telefono de contacto"
              },
              {
                  "key": "email",
                  "name": "email",
                  "label": "Correo electronico"
              },
              {
                  "key": "direcion",
                  "name": "direccion",
                  "label": "Dirección",
                  "multiline": true,
                  "numberOfLines": 4
              },
              {
                  "key": "contacto",
                  "name": "contacto",
                  "label": "Contactos",
                  "multiline": true,
                  "numberOfLines": 2
              },
              {
                  "nombre": "codigo",
                  "tipo": "auto-codigo",
                  "label": "Código",
                  "placeholder": "Código",
                  "title": "Código",
                  "mensaje_error": "C",
                  "disabled": true,
                  "numberOfLines": "",
                  "getOptionLabel": [
                      "titulo"
                  ],
                  "key": "codigo",
                  "name": "codigo",
                  "multiline": false
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
        "lista_categoria_productos": [
            {
                "_id": 0,
                "titulo": "Peluqueria",
                "value": "peluqueria",
            },
            {
                "_id": 1,
                "titulo": "Barberia",
                "value": "barberia",
            },
            {
                "_id": 2,
                "titulo": "Uñas",
                "value": "unas",
            },
            {
                "_id": 3,
                "titulo": "Cosméticos",
                "value": "cosmeticos",
            },
            {
                "_id": 4,
                "titulo": "Hidrataciones",
                "value": "hidrataciones",
            },
            {
                "_id": 5,
                "titulo": "Keratinas",
                "value": "keratinas",
            },
            {
                "_id": 6,
                "titulo": "Varios",
                "value": "varios",
            },
        ],
        "lista_tipo": [
            {
                "_id": 0,
                "titulo": "Factura",
                "value": "factura",
            },
            {
                "_id": 1,
                "titulo": "Recibo",
                "value": "recibo",
            },
            {
                "_id": 2,
                "titulo": "Nota de Entrega",
                "value": "nota",
            },
            {
                "_id": 3,
                "titulo": "Producción interna",
                "value": "produccion",
            },
            {
                "_id": 4,
                "titulo": "Otro",
                "value": "otro",
            }
        ],
        "lista_tipo_S": [
            {
                "_id": 0,
                "titulo": "Venta",
                "value": "venta",
            },
            {
                "_id": 1,
                "titulo": "Autoconsumo",
                "value": "autoconsumo",
            },
            {
                "_id": 2,
                "titulo": "Muestra",
                "value": "muestra",
            },
            {
                "_id": 3,
                "titulo": "Obsequio",
                "value": "obsequio",
            },
            {
                "_id": 4,
                "titulo": "Deterioro",
                "value": "deterioro",
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
                "title": "Categoria",
                "field": "categoria",
                "tipo": "lista_categoria_productos"
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
                "title": "Entradas",
                "field": "entradas",
                "tipo": "number",
                "formato": "(dato)=> {\nreturn `${dato.valores && dato.valores.entradas ? dato.valores.entradas : '0'}`\n}",
                "default": "",
                "type": ""
            },
            {
                "title": "Salidas",
                "field": "salidas",
                "tipo": "number",
                "formato": "(dato)=> {\nreturn `${dato.valores && dato.valores.salidas ? dato.valores.salidas : '0'}`\n}",
                "default": "",
                "type": ""
            },
            {
                "title": "Cantidad Total",
                "field": "cantidad",
                "tipo": "number",
                "formato": "(dato)=> {\nreturn `${dato.valores && dato.valores.cantidad ? dato.valores.cantidad : 0}`\n}",
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
                "width": 300,
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
            },
            {
              "title": "Monto",
              "field": "monto",
              "tipo": "monto",
              "formato": "",
              "default": "",
              "type": "number",    
            }
        ],
        "Titulos_es_producto": [
          {
              "title": "Código",
              "field": "codigo",
              "tipo": "",
              "formato": "",
              "default": "",
              "type": "",
              "flex": 0.25 
          },
          {
              "title": "Descripción",
              "field": "descripcion",
              "tipo": "",
              "formato": "",
              "default": "",
              "type": "",
              "flex": 3 
          },
          {
              "title": "Cantidad",
              "field": "cantidad",
              "tipo": "number",
              "formato": "",
              "default": "",
              "type": "number",
              "editable": true,
              "modificar":true
          },
          {
              "title": "Monto",
              "field": "monto",
              "tipo": "monto",
              "formato": "",
              "default": "",
              "type": "number",
              "editable": true,
              "modificar":true
          },
          {
              "title": "Costo Unitario",
              "field": "costou",
              "tipo": "",
              "formato": (resultado)=>{
                
                if (!resultado) return 0
                
                let costou =resultado.monto && resultado.cantidad ? resultado.monto / resultado.cantidad : 0; 
                return costou
              },
              "default": "",
              "type": "number",
              "editable": false,
              "modificar":false
          }
        ],
        "Titulos_Proveedor": [
          {
              "title": "Cedula / Rif",
              "field": "rif",
              "formato": "(dato)=> `${dato.valores.rif}`"
          },
          {
              "title": "Nombre",
              "field": "nombre",
              "formato": "(dato)=> `${dato.valores.nombre}`"
          },
          {
              "title": "Telefono",
              "field": "telefono",
              "formato": "(dato)=> `${dato.valores.telefono}`"
          },
          {
              "title": "Correo electronico",
              "field": "email",
              "formato": "(dato)=> `${dato.valores.email}`"
          }
        ],
        "Titulos_Cliente": [
          {
              "title": "Cedula / Rif",
              "field": "rif",
              "formato": "(dato)=> `${dato.valores.rif}`"
          },
          {
              "title": "Nombre",
              "field": "nombre",
              "formato": "(dato)=> `${dato.valores.nombre}`"
          },
          {
              "title": "Telefono",
              "field": "telefono",
              "formato": "(dato)=> `${dato.valores.telefono}`"
          },
          {
              "title": "Correo electronico",
              "field": "email",
              "formato": "(dato)=> `${dato.valores.email}`"
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