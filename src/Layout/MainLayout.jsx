import { Outlet } from "react-router-dom";
import Navbar from "../Components/shared/Navbar/Navbar";
import { Grid } from "@mui/material";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Grid sx={{mt:9}}>
                <Outlet></Outlet>
            </Grid>
        </div>
    );
};

export default MainLayout;