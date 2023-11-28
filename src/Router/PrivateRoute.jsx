import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { CircularProgress } from "@mui/material";


const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <CircularProgress color="success" />
    }


    if (user) {
        return children;
    }


    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;