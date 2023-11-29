import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import ContactUs from "../pages/ContactUs/ContactUs";
import DashBoard from "../Layout/Dashboard";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import EmployeeList from "../pages/Dashboard/EmployeeList/EmployeeList";
import HrHome from "../pages/Dashboard/HrHome/HrHome";
import UserDetail from "../pages/Dashboard/EmployeeList/UserDetail";
import WorkSheet from "../pages/Dashboard/EmployeeHome/WorkSheet";
import PaymentHistory from "../pages/Dashboard/EmployeeHome/PaymentHistory";
import EmployeeHome from "../pages/Dashboard/EmployeeHome/EmployeeHome";
import Payment from "../pages/Dashboard/Payment/Payment";



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
            {
                path: '',
                element: <EmployeeHome></EmployeeHome>
            },
            {
                path: '',
                element: <HrHome></HrHome>
            },
            {
                path: 'employee-list',
                element: <EmployeeList></EmployeeList>
            },
            {
                path: 'user-detail/:id', // Define a route parameter ':id'
                element: <UserDetail></UserDetail>
            },
            {
                path: 'workSheet',
                element: <WorkSheet></WorkSheet>
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            }
        ])
    }
]);

export default Router;