import { AppBar, Button, Link, Paper, Toolbar, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link as RouterLink, Outlet } from 'react-router-dom';

export default function PaginaBaseAdmin() {
    return(
        <>
            <AppBar position='static'>
                <Container maxWidth='xl'>
                    <Toolbar>
                        <Typography variant='h6'>
                            Administração
                        </Typography>
                        <Box sx={{display:'flex', flexGrow: 1}}>
                            <Link component={RouterLink} to='/admin/restaurantes'>
                                <Button sx={{my:2, color: 'white'}}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to='/admin/pratos'>
                                <Button sx={{my:2, color: 'white'}}>
                                    Pratos
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box>
                <Container maxWidth='lg' sx={{mt:1}}>
                    <Paper sx={{p:2}}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}