import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem, TablePagination, Typography } from "@mui/material";

const Progress = () => {
    const axiosSecure = useAxiosSecure();

    const { data: workSheet = [] } = useQuery({
        queryKey: ['work-sheet'],
        queryFn: async () => {
            const res = await axiosSecure.get('/work-progress');
            return res.data;
        }
    });

    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const employees = [...new Set(workSheet.map(entry => entry.name))];

    const filteredWorkSheet = workSheet.filter(entry => {
        const entryMonth = new Date(entry.date).getMonth() + 1;
        return (!selectedEmployee || entry.name === selectedEmployee) &&
            (!selectedMonth || entryMonth === parseInt(selectedMonth, 10));
    });

    const sumWorkHours = filteredWorkSheet.reduce((sum, entry) => sum + entry.hoursWorked, 0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="employee-select-label">Employee</InputLabel>
                <Select
                    labelId="employee-select-label"
                    id="employee-select"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                    <MenuItem value="">All Employees</MenuItem>
                    {employees.map((employee, index) => (
                        <MenuItem key={index} value={employee}>{employee}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="month-select-label">Month</InputLabel>
                <Select
                    labelId="month-select-label"
                    id="month-select"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <MenuItem value="">All Months</MenuItem>
                    <MenuItem value="1">January</MenuItem>
                    <MenuItem value="2">February</MenuItem>
                    <MenuItem value="3">March</MenuItem>
                    <MenuItem value="4">April</MenuItem>
                    <MenuItem value="5">May</MenuItem>
                    <MenuItem value="6">June</MenuItem>
                    <MenuItem value="7">July</MenuItem>
                    <MenuItem value="8">August</MenuItem>
                    <MenuItem value="9">September</MenuItem>
                    <MenuItem value="10">October</MenuItem>
                    <MenuItem value="11">November</MenuItem>
                    <MenuItem value="12">December</MenuItem>
                </Select>
            </FormControl>

            <Typography variant="h6" gutterBottom>
                Total Work Hours: {sumWorkHours}
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 325 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row">#</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Task</TableCell>
                            <TableCell align="right">Hours Worked</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredWorkSheet.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">{index + 1}</TableCell>
                                <TableCell align="right">{entry.name}</TableCell>
                                <TableCell align="right">{entry.task}</TableCell>
                                <TableCell align="right">{entry.hoursWorked}</TableCell>
                                <TableCell align="right">{entry.date}</TableCell>
                                <TableCell align="right">{entry.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredWorkSheet.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
};

export default Progress;
