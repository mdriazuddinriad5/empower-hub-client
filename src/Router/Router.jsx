import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import ContactUs from "../pages/ContactUs/ContactUs";
import DashBoard from "../Layout/Dashboard";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import EmployeeList from "../pages/Dashboard/EmployeeList/EmployeeList";
import UserDetail from "../pages/Dashboard/EmployeeList/UserDetail";
import WorkSheet from "../pages/Dashboard/EmployeeHome/WorkSheet";
import PaymentHistory from "../pages/Dashboard/EmployeeHome/PaymentHistory";
import Payment from "../pages/Dashboard/Payment/Payment";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import Progress from "../pages/Dashboard/EmployeeList/Progress";



const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: ([
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'contact',
                element: <ContactUs></ContactUs>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            }
        ])
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: ([

            // employee section
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'workSheet',
                element: <WorkSheet></WorkSheet>
            },

            // hr section
            {
                path: 'employee-list',
                element: <EmployeeList></EmployeeList>
            },
            {
                path: 'user-detail/:id', // Define a route parameter ':id'
                element: <UserDetail></UserDetail>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'progress',
                element: <Progress></Progress>
            },

            // admin section
            {
                path: 'adminHome',
                element: <AdminHome></AdminHome>
            }
        ])
    }
]);

export default Router;