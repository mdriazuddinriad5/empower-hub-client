import { Box, Button, Modal, Paper, Stack, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Payment from "../Payment/Payment";
import Swal from "sweetalert2";

const TableDetail = ({ employee, i }) => {
    const { bank_account_no, designation, email, name, role, _id, salary, verified } = employee;
    const axiosSecure = useAxiosSecure();
    const [isVerified, setIsVerified] = useState(verified);
    const [openModal, setOpenModal] = useState(false);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');


    const handleVerify = async () => {
        try {
            const response = await axiosSecure.patch(`/user-verify/${_id}`, { verified: !isVerified })
            console.log(response);
            if (response.status === 200) {
                setIsVerified(!isVerified);
            } else {
                console.error("Failed to update verification status");
            }
        } catch (error) {
            console.error("Error updating verification status:", error);
        }
    };

    const handlePayClick = () => {
        if (!isVerified) {
            return; // Do not proceed for unverified employees
        }
        setOpenModal(true);
    };


    const handleModalClose = () => {
        setOpenModal(false);
    };


    const handleModalSubmit = async () => {
        try {

            const checkExistingPayment = await axiosSecure.get(`/payments?employeeId=${_id}&month=${month}&year=${year}`);

            console.log(checkExistingPayment);

            if (checkExistingPayment.data.error) {

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Payment already exists for this employee, month, and year.',
                });
            } else {

                const dataToSend = {
                    employeeId: _id,
                    month,
                    year,
                    salary,
                };


                const response = await axiosSecure.post('/payments', dataToSend);


                console.log('Data saved successfully:', response.data);
                if (response.data.paymentResult.acknowledged) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Data saved successfully',
                    });
                }


                handleModalClose();
            }
        } catch (error) {
            console.error('Error saving data:', error.message);
        }
    };




    return (
        <TableRow

            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">{i + 1}</TableCell>
            <TableCell align="right">{name}</TableCell>
            <TableCell align="right">{email}</TableCell>
            <TableCell align="right">
                <Button onClick={handleVerify}>
                    {isVerified === true ? '✅' : '❌'}
                </Button>
            </TableCell>
            <TableCell align="right">{bank_account_no}</TableCell>
            <TableCell align="right">{salary}</TableCell>
            <TableCell align="right">
                <Button onClick={handlePayClick} disabled={!isVerified}>
                    Pay
                </Button>
            </TableCell>

            <TableCell align="right">  <Button component={Link} to={`/dashboard/user-detail/${_id}`}>
                Details
            </Button></TableCell>

            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Payment Details
                    </Typography>

                    {/* Display the salary in the modal */}
                    <Typography variant="body1" gutterBottom>
                        Salary: {salary}
                    </Typography>

                    <Paper elevation={0} sx={{ mt: 2, mb: 2, p: 2 }}>
                        <Stack spacing={2}>
                            <TextField
                                label="Month"
                                variant="outlined"
                                fullWidth
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                            />
                            <TextField
                                label="Year"
                                variant="outlined"
                                fullWidth
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </Stack>
                    </Paper>
                    <Button onClick={handleModalSubmit} variant="contained" color="primary">
                        Submit
                    </Button>
                    {/* <Payment employeeId={_id} month={month} year={year} onClose={handleModalClose} /> */}
                </Box>
            </Modal>
        </TableRow>
    );
};

export default TableDetail;