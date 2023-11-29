import { Grid } from "@mui/material";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { QueryClient, useQuery } from "@tanstack/react-query";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableDetail from "./TableDetail";


const EmployeeList = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: employees = [], isLoading } = useQuery({
        queryKey: ['employee-list'],
        queryFn: async () => {
            const res = await axiosSecure.get('/employee-list');
            return res.data;
        }
    })
    console.log(employees);



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 325 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell component="th" scope="row">#</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Verified</TableCell>
                        <TableCell align="right">Bank Account</TableCell>
                        <TableCell align="right">Salary</TableCell>
                        <TableCell align="right">Pay</TableCell>
                        <TableCell align="right">Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        employees.map((employee, i) => (
                            <TableDetail
                                key={i}
                                employee={employee}
                                i={i}></TableDetail>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmployeeList;