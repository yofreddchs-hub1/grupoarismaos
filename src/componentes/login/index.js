import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Form_todos, genera_formulario, Ver_Valores, conexiones, nuevo_Valores, Usuario } from '@/src/comunes';
import { colores, imagenes } from '../tema';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Formulario from '../herramientas/formulario';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

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

export default function Login(props) {
    const [state, setState] = useState({cargando:true});
    const [alto, setAlto] = useState(0);
    
    const Iniciar = async(datos)=>{
        const respuesta= await conexiones.Login(datos);
        
        if (respuesta.Respuesta==='OK'){
            console.log(respuesta)
            await Usuario({status:'Guardar', dato:respuesta.user})
            nuevo_Valores({User:respuesta.user})
            
            if (props.Verificar){
                props.Verificar();
            }
        }
        return respuesta
        
    }
    const Salir = async()=>{
        await Usuario({status:'Eliminar'})
        nuevo_Valores({User:null})
        if (props.Verificar){
            props.Verificar();
        }
    }
    useEffect(() => {
        if (typeof window !== 'undefined') { // Asegurarse de que window está disponible
          setAlto(window.innerHeight);
        }
        
        const Inicio = async()=>{
            let nuevos = await genera_formulario({valores:{}, campos:Form_todos('Form_login')});
            if (Ver_Valores().User!==null){
                nuevos.titulos= {username:{...nuevos.titulos['username'], value:Ver_Valores().User.username, disabled:true}}
            }else {
                nuevos.titulos.password.onKeyPress=Iniciar
                nuevos.titulos.password.pos=0;
                nuevos.titulos.password.validar='true';
            }
            const formulario ={
                ...nuevos,
                botones:[
                    {
                        name:'iniciar', label: Ver_Valores().User===null ? 'Iniciar' : 'Salir', title:'Iniciar',
                        variant:"contained", color: "success", icono: Ver_Valores().User===null ? 'check' : 'cancel',
                        onClick: Ver_Valores().User===null ? Iniciar : Salir, validar:'true', 
                        sx:{...Ver_Valores().Estilos.Botones ? Ver_Valores().User===null ? Ver_Valores().Estilos.Botones.Aceptar : Ver_Valores().Estilos.Botones.Eliminar : {}},
                    },
                ]
            }
            setState({...state,formulario:formulario, cargando:false})
        }
        Inicio();
      }, []);
  return (
    <Box sx={{height:props.alto ? props.alto : alto, bgcolor:colores.fondo }}>
      <Grid container 
        direction="row"
         sx={{
            justifyContent: "center",
            alignItems: "center",
            height:'100%'
        }}
      >
        
        <Grid size={{ xs: 1, md: 4 }}>
          
        </Grid>
        <Grid size={{ xs: 10, md: 4 }}>
            <Item sx={{}} elevation={24}>
                <Stack
                    spacing={{ xs: 1, sm: 2 }}
                    direction="row"
                    useFlexGap
                    sx={{ 
                        flexWrap: 'wrap', 
                        justifyContent: "center",
                        alignItems: "center",
                        mb:1
                    }}
                >
                    <Image
                        src={imagenes.Logo}
                        alt="Grupo Arismaos C.A."
                        width={90}
                        
                        priority
                    />
                    <Typography variant="h5" gutterBottom>
                        {Ver_Valores().User===null ? 'INICIO DE SESION' : ''}
                    </Typography>
                </Stack>
                <Divider />
            
       
                    
                       <Formulario {...state.formulario} Agregar={false} config={Ver_Valores()}/>
                
                
            </Item>
        </Grid>
        <Grid size={{ xs: 1, md: 4 }}>
          
        </Grid>
        
      </Grid>
    </Box>
  );
}
