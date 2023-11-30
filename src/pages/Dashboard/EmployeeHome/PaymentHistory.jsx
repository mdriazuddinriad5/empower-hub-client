import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@mui/material";
import moment from "moment";

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: history = [] } = useQuery({
        queryKey: ['payment-history'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/person-payments/${user?.email}`);
            return res.data;
        }
    });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const sortedHistory = [...history].sort((a, b) => b.date - a.date);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 325 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row">#</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Transaction Id</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {sortedHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry, i) => (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">{i + 1}</TableCell>
                                <TableCell align="right">{moment(parseInt(entry.date, 10)).format('YYYY-MM')}</TableCell>
                                <TableCell align="right">{entry.salary}</TableCell>
                                <TableCell align="right">{entry.transactionId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={sortedHistory.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Grid>
    );
};

export default PaymentHistory;
