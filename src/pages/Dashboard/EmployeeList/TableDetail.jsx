import { Button, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const TableDetail = ({ employee, i }) => {
    const { bank_account_no, designation, email, name, role, _id, salary, verified } = employee;
    const axiosSecure = useAxiosSecure();
    const [isVerified, setIsVerified] = useState(verified);


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
            <TableCell align="right"><Button>Pay</Button></TableCell>
            <TableCell align="right">  <Button component={Link} to={`/dashboard/user-detail/${_id}`}>
                Details
            </Button></TableCell>
        </TableRow>
    );
};

export default TableDetail;