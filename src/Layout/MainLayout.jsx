import { Outlet } from "react-router-dom";
import Navbar from "../Components/shared/Navbar/Navbar";
import { Box, Button, Grid, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import DarkModeIcon from '@mui/icons-material/DarkMode';

const MainLayout = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            primary: {
                main: isDarkMode ? '#01BDB2' : '#2196F3',
            },
            secondary: {
                main: isDarkMode ? '#142959' : '#ff385c',
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ position: 'relative', fontFamily: 'serif', minHeight: '100vh' }}>
                <Navbar></Navbar>
                <Box
                    sx={{
                        position: 'absolute',
                        top: 20,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        lg: { transform: 'none', top: 2, left: 2 },
                        zIndex: theme.zIndex.drawer + 1,
                    }}
                >
                    <Button onClick={toggleTheme} variant="outlined" >
                        {isDarkMode ? <DarkModeIcon></DarkModeIcon> : <DarkModeIcon sx={{ color: 'black' }}></DarkModeIcon>}
                    </Button>
                </Box>
                <Grid sx={{ mt: 9 }}>
                    <Outlet />
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default MainLayout;
