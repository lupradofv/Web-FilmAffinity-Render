import { Form, NavLink, useNavigation, useActionData, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import LockIcon from '@mui/icons-material/Lock';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Login() {
  // Errores del intento de login previo
  const responseError = useActionData();
  const navigation = useNavigation();
  const busy = navigation.state === 'submitting' || 
               navigation.state === 'loading';
  // Muestra el error de login a menos que estemos enviando algo
  const credIncorrectas = !busy && responseError;
  // Si el registro tuvo éxito, nos redirigieron a login con este query param
  const registrado = useLocation().search === '?registrado';

  return (
    <Stack direction="row" justifyContent="center" alignItems="center"
      sx={{ width: 1, height: "100vh" }}>
      {/* Tarjeta centrada vertical y horizontalmente */} 
      <Paper elevation={4} sx={{ p: 2, borderRadius: 2 }}>
        {/* Acción de React Router para enviar las credenciales */}
        <Form method="post">
          {/* Elementos del formulario apilados verticalmente */} 
          <Stack direction="column" justifyContent="center" alignItems="center">
            {/* Icono de login */} 
            <LockIcon color="action" sx={{ fontSize: 40, mb: 2 }}/>
            {/* Campos de login: email y password */} 
            <TextField margin="dense" size="small" required fullWidth disabled={busy}
              label="Correo electrónico"
              name="email"
              type="email"
            />
            <TextField margin="dense" size="small" required fullWidth disabled={busy}
              label="Contraseña"
              name="password"
              type="password"
            />
            {/* Avisos durante el login */}
            {/* ToDo#1: añade un aviso cuando las credenciales sean incorrectas usando Material UI */}
            {credIncorrectas && (
              <Alert variant="outlined" severity="error" sx={{ mt: 1, width: '100%', py:0 }}>
              Credenciales incorrectas
            </Alert>
            )}

            {registrado && <Alert variant="outlined" sx={{ mt: 1, width: '100%', py:0 }}>
              ¡Registrado! Prueba a entrar
            </Alert>}
            {/* Botón para enviar las credenciales de login */}
            <LoadingButton type="submit" variant="contained" fullWidth sx={{ mt: 2, mb: 1 }} 
              loading={busy} disabled={busy}>
                Entrar
            </LoadingButton>
            {/* ToDo#2: completa para que se navegue al componente de registro utilizando React Router */}
            <NavLink to="/registro" sx={{width: '100%'}}>
              <Button fullWidth disabled={busy}>Registrarse</Button>
            </NavLink>

          </Stack>
        </Form>
      </Paper>
    </Stack>
  )
}


