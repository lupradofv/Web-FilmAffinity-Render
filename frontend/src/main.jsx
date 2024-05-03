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
import App from "./components/App.jsx";

// Configuración de rutas y componentes
const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
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