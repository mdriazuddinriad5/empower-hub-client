// CardGridComponent.jsx
import React, { useState } from 'react';
import { Box, Card, CardContent, Button, Typography, Modal } from '@mui/material';
import { FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const CardGridComponent = ({ employees, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleMakeHr = () => {
    if (selectedEmployee) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, make HR!',
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/users/admin/${selectedEmployee._id}`).then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${selectedEmployee.name} is a HR now`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
    }
  };

  const handleFireConfirmation = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleConfirmFire = () => {
    if (selectedEmployee) {
      axiosSecure.delete(`/users/${selectedEmployee._id}`).then((res) => {
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: 'Deleted!',
            text: `${selectedEmployee.name} is fired`,
            icon: 'success',
          });
        }
      });
      setOpen(false);
    }
  };

  const handleCancelFire = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" flexWrap="wrap">
      {employees.map((employee, index) => (
        <Card key={index} sx={{ minWidth: 275, margin: 2 }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {employee.name}
            </Typography>
            <Typography color="text.secondary">{employee.designation}</Typography>
            <Button onClick={() => handleFireConfirmation(employee)}>Fire</Button>
            <FaUsers onClick={handleMakeHr} />
          </CardContent>
        </Card>
      ))}

      <Modal open={open} onClose={handleCancelFire}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="div">
            Confirm Fire
          </Typography>
          <Typography sx={{ mt: 2 }}>Are you sure you want to fire this employee?</Typography>
          <Button onClick={handleConfirmFire} sx={{ mt: 2, mr: 2 }}>
            Yes
          </Button>
          <Button onClick={handleCancelFire} sx={{ mt: 2 }}>
            No
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CardGridComponent;
