import { useState } from 'react';
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
    Grid,
} from '@mui/material';
import { FaBars, FaCalendar, FaEnvelope, FaHome, FaUsers } from 'react-icons/fa';
import Navbar from '../Components/shared/Navbar/Navbar';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useHr from '../Hooks/useHr';

const DashBoard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer);
    };

    const [isAdmin] = useAdmin();
    const [isHr] = useHr();

    const drawerContent = (
        <List>

            {isAdmin ? (
                <>
                    <ListItem component={NavLink} to="/dashboard/allEmployees" onClick={handleDrawerToggle}>
                        <ListItemIcon>
                            <FaHome />
                        </ListItemIcon>
                        <ListItemText primary="All Employees" />
                    </ListItem>

                </>
            ) : isHr ?

                (
                    <>
                        <ListItem component={NavLink} to="/dashboard/employee-list" onClick={handleDrawerToggle}>
                            <ListItemIcon>
                                <FaHome />
                            </ListItemIcon>
                            <ListItemText primary="Employee List" />
                        </ListItem>
                        <ListItem component={NavLink} to="/dashboard/progress" onClick={handleDrawerToggle}>
                            <ListItemIcon>
                                <FaHome />
                            </ListItemIcon>
                            <ListItemText primary="Progress" />
                        </ListItem>
                    </>
                )

                : (
                    <>

                        <ListItem component={NavLink} to="/dashboard/payment-history" onClick={handleDrawerToggle}>
                            <ListItemIcon>
                                <FaHome />
                            </ListItemIcon>
                            <ListItemText primary="Payment History" />
                        </ListItem>
                        <ListItem component={NavLink} to="/dashboard/workSheet" onClick={handleDrawerToggle}>
                            <ListItemIcon>
                                <FaHome />
                            </ListItemIcon>
                            <ListItemText primary="Work Sheet" />
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
        <Grid>
            {/* <Navbar></Navbar> */}
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
        </Grid>

    );
};

export default DashBoard;
