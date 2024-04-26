import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function Pie() {
  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%'}}>
      {/* El pie está fijado abajo */}
      <Divider />
      <Typography variant="body2" color="text.secondary" align="center" sx={{p:1}}>
        {'Copyright © '}
        <Link color="inherit" href="https://apicai.github.io/web-ejercicios-das/">
          Práctica React
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}
