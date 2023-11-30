import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import RowList from "./RowList";
import { useState } from "react";
import CardGridComponent from "./CardGridComponent";

const AllEmployeeList = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allEmployees = [], refetch } = useQuery({
        queryKey: ['all-employees'],
        queryFn: async () => {
            const res = await axiosSecure.get('users');
            return res.data;
        }
    })

    const verifiedEmployees = allEmployees.filter(employee => employee?.verified === true);

    console.log(verifiedEmployees);
    console.log(allEmployees);

    const [viewMode, setViewMode] = useState('table');

    const toggleViewMode = () => {
        setViewMode((prevMode) => (prevMode === 'table' ? 'grid' : 'table'));
    };

    return (
        <div>

            <Button onClick={toggleViewMode} sx={{ mb: 2 }}>
                {viewMode === 'table' ? 'Grid View' : 'Table View'}
            </Button>

            {viewMode === 'table' ? (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 325 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" scope="row">#</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Designation</TableCell>
                                <TableCell align="right">Role</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                verifiedEmployees.map((employee, i) => (
                                    <RowList key={i} i={i} refetch={refetch} employee={employee}></RowList>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <CardGridComponent employees={verifiedEmployees} refetch={refetch} />
            )}



        </div>
    );
};

export default AllEmployeeList;