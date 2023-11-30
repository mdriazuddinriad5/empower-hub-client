import { Box, Button, Modal, TableCell, TableRow, Typography } from "@mui/material";
import { FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";


const RowList = ({ employee, i, refetch }) => {
    const { designation, name, role, _id } = employee;
    const [open, setOpen] = useState(false);
    const axiosSecure = useAxiosSecure();



    const handleMakeHr = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${_id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${name} is a hr now`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });
    }


    const handleFireConfirmation = () => {
        setOpen(true);
    };

    const handleConfirmFire = () => {

        axiosSecure.delete(`/users/${_id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${name} is fired`,
                        icon: "success"
                    });
                }

            })


        setOpen(false);
    };

    const handleCancelFire = () => {
        setOpen(false);
    };




    return (
        <>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{i + 1}</TableCell>
                <TableCell align="right">{name}</TableCell>
                <TableCell align="right">{designation}</TableCell>
                <TableCell align="right">
                    {role === 'hr' ? 'hr' : <button onClick={handleMakeHr}><FaUsers></FaUsers></button>}
                </TableCell>
                <TableCell align="right">
                    <Button onClick={handleFireConfirmation}>
                        Fire
                    </Button>
                </TableCell>
            </TableRow>


            <Modal open={open} onClose={handleCancelFire}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="div">
                        Confirm Fire
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Are you sure you want to fire this employee?
                    </Typography>
                    <Button onClick={handleConfirmFire} sx={{ mt: 2, mr: 2 }}>Yes</Button>
                    <Button onClick={handleCancelFire} sx={{ mt: 2 }}>No</Button>
                </Box>
            </Modal>
        </>
    );
};

export default RowList;