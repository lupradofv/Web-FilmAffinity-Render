import { Outlet, NavLink, Form, useNavigation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Footer from './Pie';

export default function App() {
  const navigation = useNavigation();
  const busy = navigation.state === 'submitting' || 
               navigation.state === 'loading';

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Barra de la aplicación fija arriba */}
      <AppBar position="static">
        <Toolbar variant="dense">
          {/* Secciones de la barra alineadas a la izquierda */}
          <Box sx={{ flexGrow: 1 }}>
            {/* Navegación a los hijos conteniendo cada sección */}
            <NavLink to='perfil' end>
              {({ isActive }) => <BotonMenu isActive={isActive}>Inicio</BotonMenu>}
            </NavLink>
            <NavLink to='perfil/editar' end>
              {({ isActive }) => <BotonMenu isActive={isActive}>Perfil</BotonMenu>}
            </NavLink>
          </Box>
          {/* ToDo#8: completa para que se realice el logout (relacionado con ToDo#9) */}
            <Button color="inherit" onClick={handleLogout}>Salir</Button>
        </Toolbar>
        {/* Barra de progreso para cuando se cargan datos o envían acciones */}
        {busy && <LinearProgress color="inherit"/> }
      </AppBar>
      {/* Outlet de React Router para mostrar los hijos */}
      <Outlet/>
      {/* ToDo#6: haz que se muestre el pie de página de la aplicación */}
      <Footer/>

    </Box>
  );
}

function BotonMenu({isActive, children}) {
  return <Button color="inherit" sx={{fontWeight: isActive ? "bolder" : "lighter"}}>{children}</Button>;
}
