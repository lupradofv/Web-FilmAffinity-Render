import { useState } from 'react';
import { Form, NavLink, useNavigation, useActionData } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Registro() {
  // Errores del intento de registro previo
  const responseError = useActionData();
  const navigation = useNavigation();
  const busy = navigation.state === 'submitting' || 
               navigation.state === 'loading';
  // Muestra el error a menos que estemos enviando algo
  const errorRegistro = !busy && responseError;
  // Validación contraseña
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const passDiferentes = password !== password2;

  return (
    <Stack direction="row" justifyContent="center" alignItems="center"
      sx={{ width: 1, height: "100vh" }}>
      {/* Tarjeta centrada vertical y horizontalmente */} 
      <Paper elevation={4} sx={{ p: 2, borderRadius: 2 }}>
        {/* Acción de React Router para enviar el registro */}
        <Form method="post">
          {/* Elementos del formulario apilados verticalmente */} 
          <Stack direction="column" justifyContent="center" alignItems="center">
            {/* Icono de registro */}
            <AccountBoxIcon color="action" sx={{ fontSize: 40, mb: 2 }}/>
            {/* Campos de registro: nombre, teléfono, email, password, password2 */} 
            <TextField margin="dense" size="small" required fullWidth disabled={busy}
              label="Nombre"
              name="nombre"
            />
            <TextField margin="dense" size="small" required fullWidth disabled={busy}
              label="Teléfono"
              name="tel"
              type="tel"
            />
            <TextField margin="dense" size="small" required fullWidth disabled={busy}
              label="Correo electrónico"
              name="email"
              type="email"
            />
            {/* ToDo#3: completa las props value y onChange para validar que coinciden los passwords */}
            <TextField  margin="dense" size="small" required fullWidth disabled={busy}
              label="Contraseña"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <TextField  margin="dense" size="small" required fullWidth
              label="Repetir contraseña"
              name="password2"
              type="password"
              error={passDiferentes}
              helperText={passDiferentes && "Las contraseñas deben coincidir"}
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
            {/* Mensaje para errores durante el registro */}
            <Alert variant="outlined" severity="error" sx={{
              mt:1, width:'100%', py:0, visibility: errorRegistro ? 'visible' : 'hidden'}}>
              {errorRegistro && errorRegistro.status === 409 ? 'Usuario ya registrado' : 'Error en el registro' }
            </Alert>
            {/* ToDo#4: deshabilita el botón también si los passwords no coinciden */}
            <LoadingButton type="submit" variant="contained" fullWidth sx={{mt:2,mb:1}} 
              loading={busy} disabled={busy || passDiferentes}>
                Registrarse
            </LoadingButton>
            {/* Botón para navegar al login */} 
            <NavLink to='/' style={{width: '100%'}}>
              <Button fullWidth disabled={busy}>Entrar</Button>
            </NavLink>
          </Stack>
        </Form>
      </Paper>
    </Stack>
  )
}


