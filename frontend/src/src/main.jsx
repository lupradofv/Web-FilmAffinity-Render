import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  redirect, createBrowserRouter, RouterProvider
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './common/theme.js';
import CssBaseline from '@mui/material/CssBaseline';
import { login, logout, registro, perfil, baja } from "./common/api.js";
import Login from "./components/Login.jsx";
import App from "./components/App.jsx";
import Registro from "./components/Registro.jsx";
import Perfil from "./components/Perfil.jsx";
import EditarPerfil from "./components/EditarPerfil.jsx";

// Configuración de rutas y componentes
const router = createBrowserRouter([{
  path: "/",
  element: <Login/>,
  action: entrar
},{
  path: "/registro",
  element: <Registro/>,
  action: registrarUsuario
},{
  path: "/app",
  element: <App/>,
  action: salir,
  children: [{
    path: "perfil",
    element: <Perfil/>,
    loader: cargarUsuario,
    action: darBajaUsuario
  }, {
    path: "perfil/editar",
    element: <EditarPerfil/>,
    loader: cargarUsuario,
    action: actualizarUsuario
  }]
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Para poder personalizar el tema por defecto de MaterialUI */}
    <ThemeProvider theme={theme}>
      {/* Para establecer unos estilos globales por defecto seguros */}
      <CssBaseline />
      {/* El router de React Router */}
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// Acciones y carga de datos de las rutas y elementos

async function entrar({ request }) {
  const formData = await request.formData();
  const {email, password} = Object.fromEntries(formData);
  const loginRes = await login(email, password);
  // ToDo#5: si el login es correcto redirigir al componente de perfil con React Router
  if (loginRes.ok) return redirect('/app/perfil');
  return {status: loginRes.status};
}

async function registrarUsuario({ request }) {
  const formData = await request.formData();
  const usuario = Object.fromEntries(formData);
  const registroRes = await registro(usuario);
  if (registroRes.ok) return redirect('/?registrado');
  return {status: registroRes.status};
}

async function salir() {
  // ToDo#9: completa el logout en el servidor y redirige al usuario al login
  await logout();
  return redirect('/');
}

async function cargarUsuario() {
  const perfilRes = await perfil();
  if (perfilRes.ok) return perfilRes;
  return redirect('/');
}

async function darBajaUsuario() {
  await baja();
  return redirect('/');
}

async function actualizarUsuario({ request }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const actPerfilRes = await perfil(datos);
  if (actPerfilRes.ok) return redirect('/app/perfil');
  return redirect('/');
}