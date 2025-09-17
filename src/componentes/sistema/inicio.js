import React ,{  useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Cargando from '../cargar/cargaajustable';
import { LibroMes } from '../../comunes/delsistema';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Scrollbars from '../herramientas/scrolbars';
import { Ver_Valores, conexiones } from '../../comunes';
import { Stack } from '@mui/material';

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

const HomePage = () => {
  const [state, setState] = useState({cargando:true, dialogo:{open:false}});
  const [alto, setAlto] = useState(0);
  const [cambiar, setCambiar] = useState(0);

  const cambiarState = (nuevostate)=>{
    setState({...state, ...nuevostate})
  }

  useEffect(() => {
    const Cargar = async()=>{
      let fecha = new Date();
      let mes = fecha.getMonth() + 1;
      let ano = fecha.getFullYear();
      let dia = fecha.getDate();
      let resultado = await LibroMes(fecha);
      resultado= resultado.sort((a,b)=> (a.cantidadF>b.cantidadF && a.cantidadF>a.stock) ? 1 : -1 )
      const resulta= await conexiones.Leer_C([Ver_Valores().database.movimiento],{
          [Ver_Valores().database.movimiento]:{$and:[{"valores.fecha":{$gte:new Date(`${ano}-${mes}-${dia}`)}}]},        
      })
      
      if(resulta.Respuesta==='Ok'){
        const movimientos = resulta.datos[Ver_Valores().database.movimiento].map(val=>{
            return {...val.valores, _id:val._id}
        }).sort((a,b)=> a.fecha>b.fecha ? -1 : 1);
        console.log(movimientos);
        movimientos.map(val=>{
          const pos = resultado.findIndex(f=> f._id===val._id_producto);
          console.log(pos)
          if (Number(val.cantidad)>0){
            resultado[pos].entradas= resultado[pos].entradas ? resultado[pos].entradas+ Number(val.cantidad) : Number(val.cantidad); 
          }else{
            const cantidad= -1* Number(val.cantidad);
            resultado[pos].salidas= resultado[pos].salidas ? resultado[pos].salidas+ cantidad : cantidad; 
          }
          
          return val;
        })
      }
      
      cambiarState({cargando:false, stock:resultado});

    }
    if (alto!==0)
      Cargar();
  },[alto, cambiar]);

  useEffect(() => {
      if (typeof window !== 'undefined') { // Asegurarse de que window está disponible
        setAlto(window.innerHeight);
      }
        
  }, []);
  return state.cargando ? <Cargando open={true} height={alto *0.8}/> :(
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        
        <Grid size={{ xs: 12, md: 12 }}>
          <Item sx={{height: alto * 0.82}} elevation={8}>
            <h2>STOCK</h2>
            <Divider />
            <Scrollbars sx={{ height:alto ? alto * 0.73 : 300, flexGrow: 1, padding:0.5, ...Ver_Valores().Estilos.Dialogo_cuerpo ? Ver_Valores().Estilos.Dialogo_cuerpo :{}}}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {state.stock
                ? state.stock.map(val=>
                  <Item key={val._id} elevation={3} sx={{width:'100%', mb:1, bgcolor: val.stock>val.cantidadF ? "#f06262ff" :""}}>
                    <ListItem key={val._id} alignItems="flex-start">
                      <ListItemText
                        primary={
                          <React.Fragment>
                          <Stack direction="row" spacing={1}>
                            <Typography
                              component="span"
                              variant="h5"
                              sx={{ width:'50%',textTransform:'uppercase', color: 'text.primary', display: 'inline' }}
                            >
                             Producto: {val.nombre}
                            </Typography>
                            <Typography
                              component="span"
                              variant="h6"
                              sx={{ width:'30%',color: 'text.primary', display: 'inline' }}
                            >
                             Codigó: {val.codigo}
                            </Typography>
                            <Typography
                                component="span"
                                variant="h6"
                                sx={{ textAlign:'center', color: 'text.primary', display: 'inline' }}
                                
                              >
                               Stock 
                              </Typography>
                            <Typography
                                component="span"
                                variant="h6"
                                sx={{ textAlign:'center', color: 'text.primary', display: 'inline' }}
                                
                              >
                                Actual: {val.cantidadF}
                                
                              </Typography>
                              <Typography
                                component="span"
                                variant="h6"
                                sx={{ textAlign:'center',color: 'text.primary', display: 'inline' }}
                              >
                                Minimo: {val.stock}
                                
                              </Typography>
                          </Stack>
                          </React.Fragment>
                        }
                        secondary={
                          <div>
                          <Stack direction="row" spacing={2}>
                              
                              <Typography
                                component="span"
                                variant="h6"
                                sx={{ textAlign:'center', color: '#000', display: 'inline', width:'100%' }}
                              >
                                ENTRADAS / SALIDAS
                                
                              </Typography>
                              <Typography
                                component="span"
                                variant="h6"
                                sx={{ textAlign:'center', color: 'text.primary', display: 'inline', width:'50%' }}
                                
                              >
                                Entradas: {val.entradas ? val.entradas : 0}
                                
                              </Typography>
                              <Typography
                                component="span"
                                variant="h6"
                                sx={{ textAlign:'center',color: 'text.primary', display: 'inline', width:'50%' }}
                              >
                                Salidas: {val.salidas ? val.salidas : 0}
                                
                              </Typography>
                              
                            
                          </Stack>
                          </div>
                        }
                      />
                    </ListItem>
                  </Item>

                ) : null
              }
            </List>
            </Scrollbars>
          </Item>
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default HomePage;