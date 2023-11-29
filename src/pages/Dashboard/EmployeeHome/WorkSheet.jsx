import { useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TableCell,
    TableRow,
    TextField,
} from '@mui/material';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';


const WorkSheet = () => {
    const [task, setTask] = useState('');
    const [hoursWorked, setHoursWorked] = useState('');
    const [date, setDate] = useState('');
    const [workEntries, setWorkEntries] = useState([]);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const calculateAmount = (task, hours) => {
        const hourlyRates = {
            Sales: 20,
            Support: 15,
            Content: 25,
            'Paper-work': 10,
        };
        return hourlyRates[task] ? hourlyRates[task] * hours : 0;
    };

    const handleAddEntry = async () => {
        if (!task || !hoursWorked || !date) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields.',
            });
            return;
        }

        const hours = parseFloat(hoursWorked);
        if (isNaN(hours) || hours <= 0 || hours > 24) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid hours worked',
                text: 'Hours worked must be a positive number and cannot exceed 24.',
            });
            return;
        }

        const totalHoursOnDay = workEntries
            .filter((entry) => entry.date === date)
            .reduce((total, entry) => total + parseFloat(entry.hoursWorked), 0);

        if (totalHoursOnDay + hours > 24) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid hours worked',
                text: 'Total hours worked on the given day cannot exceed 24.',
            });
            return;
        }

        const amount = calculateAmount(task, hours);
        const newEntry = { task, hoursWorked: hours, date, amount };

        setWorkEntries([newEntry, ...workEntries]);

        setTask('');
        setHoursWorked('');
        setDate('');

        try {
            const response = await axiosSecure.post('/submit-work-entry', { task, hoursWorked: hours, date, email: user?.email });

            if (response.status === 200) {
                console.log('Work entry submitted successfully');
            } else {
                console.error('Failed to submit work entry');
            }
        } catch (error) {
            console.error('Error submitting work entry:', error);
        }
    };

    const fetchWorkEntries = async () => {
        try {
            const response = await axiosSecure.get(`/get-work-entries?email=${user?.email}`);
            if (response.status === 200) {
                setWorkEntries(response.data);
            } else {
                console.error('Failed to fetch work entries');
            }
        } catch (error) {
            console.error('Error fetching work entries:', error);
        }
    };

    useEffect(() => {
        fetchWorkEntries();
    }, []);

    const calculateTotalAmount = () => {
        return workEntries.reduce((total, entry) => total + entry.amount, 0);
    };


    const sortedWorkEntries = workEntries.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div>
            <form>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="task-label">Task</InputLabel>
                    <Select
                        labelId="task-label"
                        id="task"
                        value={task}
                        label="Task"
                        onChange={(e) => setTask(e.target.value)}
                    >
                        <MenuItem value="Sales">Sales</MenuItem>
                        <MenuItem value="Support">Support</MenuItem>
                        <MenuItem value="Content">Content</MenuItem>
                        <MenuItem value="Paper-work">Paper-work</MenuItem>
                        {/* Add more options as needed */}
                    </Select>
                </FormControl>

                <TextField
                    sx={{ m: 1, minWidth: 120 }}
                    label="Hours Worked"
                    type="number"
                    value={hoursWorked}
                    onChange={(e) => setHoursWorked(e.target.value)}
                />

                <TextField
                    sx={{ m: 1, minWidth: 120 }}
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        max: new Date().toISOString().split('T')[0], // Set max date to today
                    }}
                />

                <Button sx={{ m: 1, minWidth: 120 }} variant="contained" onClick={handleAddEntry}>
                    Add / Submit
                </Button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Hours Worked</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedWorkEntries.map((entry, index) => (
                        <TableRow key={index}>
                            <TableCell>{entry.task}</TableCell>
                            <TableCell>{entry.hoursWorked}</TableCell>
                            <TableCell>{entry.date}</TableCell>
                            <TableCell>{entry.amount}</TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </table>

            <div>Total Amount: {calculateTotalAmount()}</div>
        </div>
    );
};

export default WorkSheet;
