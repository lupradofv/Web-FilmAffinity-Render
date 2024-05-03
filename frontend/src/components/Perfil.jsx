import { Form } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import { Chip, TableBody } from "@mui/material";

export default function Perfil() {
  const usuario = useLoaderData();

  return (
    <Stack direction="row" justifyContent="center" alignItems="center"
      sx={{ width: 1, p: 4 }}>
      {/* Tarjeta centrada horizontalmente */} 
      <Card variant="outlined" sx={{minWidth: '15%'}}>
        <CardContent>
          {/* Textos bienvenida */} 
          <Typography sx={{ fontSize: 14 }}>
            Bienvenido,
          </Typography>
          <Typography variant="h5" component="div">
            {usuario.nombre}
          </Typography>
          {/* Línea horizontal */}
          <Divider><Chip label="Datos contacto" size="small" sx={{ my: 2 }}/></Divider>
          {/* Tabla con los datos de contacto del usuario */}
          <TableContainer component={Card}>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell>Teléfono</TableCell>
                  <TableCell align="right">{usuario.tel}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Correo-e</TableCell>
                  <TableCell align="right">{usuario.email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <Divider/>
        <CardActions sx={{justifyContent: "center"}}>
          {/* Acción de React Router para eliminar el usuario por completo */}
          <Form method="delete" onSubmit={
            (event) => !confirm("Esto borrará tu usuario, ¿estás seguro?") && event.preventDefault()
          }>
            <Button type="submit" variant="outlined" color="error" size="small">Darse de baja</Button>
          </Form>
        </CardActions>
      </Card>
    </Stack>
  );
}