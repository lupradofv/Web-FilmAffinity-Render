import { useState } from 'react';
import { useLoaderData, useNavigation, Form, useActionData } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function EditarPerfil() {
  // Datos del usuario
  const responseError = useActionData();
  const usuario = useLoaderData();
  const navigation = useNavigation();
  const busy = navigation.state === 'submitting' || 
               navigation.state === 'loading';
  // Muestra el error a menos que estemos enviando algo
  const errorUpdate = !busy && responseError;
  // Validación contraseña
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const passDiferentes = newPassword !== confirmNewPassword;
  
  return (
    <Stack direction="row" justifyContent="center" alignItems="center"
      sx={{ width: 1, p: 4 }}>
      {/* Tarjeta centrada horizontalmente */} 
      <Card variant="outlined" sx={{minWidth: '15%'}}>
        {/* Acción de React Router para actualizar el perfil */}
        <Form method="put">
          <CardContent>
            {/* Elementos del formulario apilados verticalmente */} 
            <Stack direction="column" justifyContent="center" alignItems="center">
              <AccountBoxIcon color="action" sx={{ fontSize: 40, mb: 2 }}/>
              {/* Campos del perfil: nombre, teléfono, password, password2 */}
              <TextField margin="dense" size="small" required fullWidth disabled={busy}
                label="Nombre"
                name="nombre"
                defaultValue={usuario.nombre}
              />
              <TextField margin="dense" size="small" required fullWidth disabled={busy}
                label="Teléfono"
                name="tel"
                type="tel"
                defaultValue={usuario.tel}
              />
              {/* ToDo#10: añade los campos necesarios para implementar el cambio de contraseña */}
              <TextField margin="dense" size="small" required fullWidth disabled={busy}
                label="Nueva Contraseña"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <TextField margin="dense" size="small" required fullWidth disabled={busy}
                label="Repetir Nueva Contraseña"
                name="confirmNewPassword"
                type="password"
                error={passDiferentes}
                value={confirmNewPassword}
                helperText={passDiferentes && "Las contraseñas no coinciden"}
                onChange={e => setConfirmNewPassword(e.target.value)}
              />
              <Alert variant="outlined" severity="error" sx={{
              mt:1, width:'100%', py:0, visibility: errorUpdate ? 'visible' : 'hidden'}}>
              {errorUpdate && errorUpdate.message}  
            </Alert>
            </Stack>
          </CardContent>
          <Divider/>
          <CardActions sx={{justifyContent: "center"}}>
            {/* Botón para enviar los datos del usuario */}
            <LoadingButton type="submit" variant="outlined" color="warning" size="small" 
              loading={busy} disabled={busy || passDiferentes}>
                Actualizar
            </LoadingButton>
          </CardActions>
        </Form>
      </Card>
    </Stack>
  );
}