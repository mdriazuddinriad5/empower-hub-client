import  { useState } from 'react';
import {
    Box,
    Drawer,
    Typography,
    IconButton,
    useMediaQuery,
    useTheme,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import { FaBars, FaCalendar, FaEnvelope, FaHome, FaUsers } from 'react-icons/fa';
import Navbar from '../Components/shared/Navbar/Navbar';
import { NavLink, Outlet } from 'react-router-dom';

const DashBoard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    const isAdmin = true;

    const drawerContent = (
        <List>
            <Navbar></Navbar>
            {isAdmin ? (
                <>
                    <ListItem component={NavLink} to="/dashboard/adminHome" onClick={handleDrawerToggle}>
                        <ListItemIcon>
                            <FaHome />
                        </ListItemIcon>
                        <ListItemText primary="Admin Home" />
                    </ListItem>
                    <ListItem component={NavLink} to="/dashboard/users" onClick={handleDrawerToggle}>
                        <ListItemIcon>
                            <FaUsers />
                        </ListItemIcon>
                        <ListItemText primary="All Users" />
                    </ListItem>
                    <ListItem component={NavLink} to="/dashboard/contact" onClick={handleDrawerToggle}>
                        <ListItemIcon>
                            <FaEnvelope />
                        </ListItemIcon>
                        <ListItemText primary="Contact" />
                    </ListItem>
                </>
            ) : (
                <>
                    <ListItem component={NavLink} to="/dashboard/userHome" onClick={handleDrawerToggle}>
                        <ListItemIcon>
                            <FaHome />
                        </ListItemIcon>
                        <ListItemText primary="User Home" />
                    </ListItem>
                    <ListItem component={NavLink} to="/dashboard/history" onClick={handleDrawerToggle}>
                        <ListItemIcon>
                            <FaCalendar />
                        </ListItemIcon>
                        <ListItemText primary="Not History" />
                    </ListItem>
                </>
            )}

            <Divider />
            {/* Shared nav link */}
            <ListItem component={NavLink} to="/" onClick={handleDrawerToggle}>
                <ListItemIcon>
                    <FaHome />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem component={NavLink} to="/contact" onClick={handleDrawerToggle}>
                <ListItemIcon>
                    <FaEnvelope />
                </ListItemIcon>
                <ListItemText primary="Contact" />
            </ListItem>
        </List>
    );



    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}>
            {isMobile && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { lg: 'none' } }}
                >
                    <FaBars />
                </IconButton>
            )}

            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={isMobile ? openDrawer : true}
                onClose={handleDrawerToggle}
                sx={{
                    width: '240px',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width: '240px', boxSizing: 'border-box' },
                    ...(isMobile && {
                        '& .MuiDrawer-paper': { width: '100%' },
                    }),
                }}
            >
                <Typography variant="h6" component="div" sx={{ p: 2, fontWeight: 'bold' }}>
                    Dashboard
                </Typography>
                {drawerContent}
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashBoard;
