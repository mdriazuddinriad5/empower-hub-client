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
import { Avatar, Container, useTheme } from '@mui/material';
import { Link as RouterLink, NavLink, Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import useAdmin from '../../../Hooks/useAdmin';
import useHr from '../../../Hooks/useHr';

const drawerWidth = 240;



function Navbar(props) {
    const { logOut, user } = useAuth();
    console.log(user);
    const handleLogOut = () => {
        logOut().then().catch()
    }
    const [isAdmin] = useAdmin();
    const [isHr] = useHr();


    const links = [
        { name: 'Home', link: '/' },
        { name: 'Dashboard', link: `${isAdmin && user ? '/dashboard/allEmployees' : (isHr && user) ? '/dashboard/employee-list' : '/dashboard/payment-history'} ` },
        { name: 'Contact us', link: '/contact' },
    ]

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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {user ? (
                                <>
                                    <Typography variant="body1" color="textPrimary" fontWeight="bold" sx={{ mr: 2 }}>
                                        {user.displayName}
                                    </Typography>
                                    <Avatar alt="User Avatar" src={user.photoURL} sx={{ width: 32, height: 32, marginRight: 2 }} />

                                    <Button
                                        onClick={handleLogOut}
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#ff385c',
                                            color: 'white',
                                            fontWeight: 'medium',
                                            padding: '10px 15px',
                                            borderRadius: '8px',
                                            transition: 'background-color 0.3s ease-in-out',
                                        }}
                                    >
                                        Sign Out
                                    </Button>
                                </>
                            ) : (
                                <Link component={RouterLink} to="/login">
                                    <Button
                                        variant="contained"
                                        sx={{
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
                                </Link>
                            )}
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