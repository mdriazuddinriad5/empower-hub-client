import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Container, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;
const links = [
    { name: 'Home', link: '/' },
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Contact us', link: '/contact' },
]


function Navbar(props) {
    const { window } = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Empower<span style={{ color: 'secondary' }}>Hub</span>
            </Typography>
            <Divider />
            <List>
                {links.map((link, i) => (
                    <ListItem key={i} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <NavLink to={link.link} className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-[#008080] underline" : ""
                            }><ListItemText sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#272727', fontWeight: 600 }} primary={link.name} /></NavLink>

                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar sx={{
                background: theme.palette.mode === 'dark' ? '#333' : 'white', py: 1,
            }} component="nav">
                <Container maxWidth="lg">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon sx={{ color: 'red' }} />
                        </IconButton>
                        <Typography
                            color={'primary'}
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Empower<span style={{ color: 'secondary' }}>Hub</span>
                        </Typography>

                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {
                                links.map((link, idx) => (

                                    <NavLink key={idx} to={link.link} className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-[#803700] underline" : ""
                                    }>
                                        <Button sx={{ color: theme.palette.mode === 'dark' ? '#fff' : '#272727', fontWeight: 600 }}>
                                            {link.name}
                                        </Button>
                                    </NavLink>
                                ))
                            }
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mx: 2 }}
                            >
                            </IconButton>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                style={{
                                    backgroundColor: '#ff385c',
                                    color: 'white',
                                    fontWeight: 'medium',
                                    padding: '10px 15px',
                                    borderRadius: '8px',
                                    transition: 'background-color 0.3s ease-in-out',
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>


            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}

Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Navbar;