
'use client'
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import {colores, imagenes, letratasa, menu1, menutasa} from '../src/componentes/tema';
import {Inicio} from '../src/comunes';
import Cargando from '../src/componentes/cargar/cargar'
import { Ver_Valores } from '@/src/comunes/valores';
import { Typography } from '@mui/material';
import MenuBotones from '../src/componentes/menubotones';
import Tabla from '../src/componentes/herramientas/tabla';
import Sistema from '../src/componentes/sistema'
import Login from '../src/componentes/login';
import Image from 'next/image';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


export default function Home() {
  const [cargando, setCargando] = useState(true);
  const [menus, setMenus] = useState([]);
  const [alto, setAlto] = useState(0);
  const [ancho, setAncho] = useState(0);
  
  const SeleccionMenu = (seleccion, lista)=>{
    const nuevo = lista.map((val)=>{
      return {...val, activo: val.value===seleccion.value}
    })
    setMenus(nuevo);
  }
  const Verificar = ()=>{
    setCargando(true);
    setTimeout(()=>{ 
      inicio();
      setCargando(false);
    }, 3 * 1000)
      
  }
  const inicio = ()=>{
    const nuevo=[
          {
            imagen: imagenes.Home,
            label:"Inicio",
            value:'inicio',
            activo:true
          },
          {
            imagen: imagenes.Entrada,
            label:"Entrada",
            value:'entrada',
          },
          {
            imagen: imagenes.Salida,
            label:"Salida",
            value:'salida',
          },
          {
            imagen: imagenes.Inventario,
            label:"Productos",
            value:'inventario',
          },
          {
            imagen: imagenes.Libro,
            label:"Libro",
            value:'libro',
          },
          {
            imagen: imagenes.Proveedores,
            label:"Proveedor",
            value:'proveedor',
          },
          {
            imagen: imagenes.Clientes,
            label:"Cliente",
            value:'cliente',
          },
          {
            imagen: imagenes.Usuarios,
            label:"Usuarios",
            value:'usuarios'
          },
          {
            imagen: imagenes.Salir,
            label:"Salir",
            value:'salir'
          },
          
        ]
        setMenus(nuevo)
  }
  useEffect(() => {
    if (typeof window !== 'undefined') { // Asegurarse de que window está disponible
      setAlto(window.innerHeight);
      setAncho(window.innerWidth);
    }
    const Iniciar= async()=>{
      await Inicio();
      setTimeout(()=>{
        inicio();
        setCargando(false);
      }, 2 * 1000)
      
    }
    Iniciar();

  }, []);
  return cargando ? <Cargando open={true} /> : 
    Ver_Valores().User 
    ?(
    <Box sx={{  bgcolor:colores.fondo, p:1 }}>
      <Grid container spacing={1}>
        <Grid size={12}>
          <Item sx={{...menu1(alto), display:'flex'}} >
            <Grid container direction="row" spacing={0.5} size={12} 
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid size={{ xs: 2.5, md: "auto" }}>
                <div style={{width:70, }}>
                <Image                      
                    src={imagenes.Logo}
                    alt="Grupo Arismaos C.A."
                    
                    priority
                />
                </div>
              </Grid>
              <Grid size={{ xs: 6, md: 7 }}>
                  <Typography variant="h5" 
                    noWrap
                    
                  >
                    GRUPO ARISMAOS
                  </Typography>
                
              </Grid>
              <Grid size={{ xs: 3.5, md: 3 }} sx={{textAlign:'right'}}>
                
                  <Typography variant="subtitle1" 
                    component="a"
                    noWrap
                    sx={{textDecoration:'none',...letratasa, textAlign:'right'}}
                    href={'https://www.bcv.org.ve/'}
                    target='_blank'
                    title="Ir a https://www.bcv.org.ve"
                  >
                    USD {Ver_Valores() && Ver_Valores().tasa ? Ver_Valores().tasa.USD : "?"}
                  </Typography>
                
              </Grid>
              
            </Grid>
          </Item>
          
        </Grid>
        
        <Grid size={{ xs: 3, md: 1.5 }}>
          <Item sx={{height:alto * 0.84}} >
            <MenuBotones menus={menus} onChange={SeleccionMenu}/>
          </Item>
        </Grid>
        <Grid size={{ xs: 9, md: 10.5 }}>
          <Item sx={{height:alto * 0.84}}>
           
            <Sistema menus={menus} Verificar={Verificar}/>
          </Item>
        </Grid>
      </Grid>
    </Box>
  ): <Login Verificar={Verificar}/>
}
