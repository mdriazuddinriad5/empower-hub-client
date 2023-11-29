
import { useForm, Controller } from 'react-hook-form';
import { Button, Container, Grid, TextField, Typography, MenuItem, FormControl, InputLabel, Select, Input } from '@mui/material';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';


const Register = () => {
    const { handleSubmit, control, reset } = useForm();
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const axiosPublic = useAxiosPublic();
    const [image, setImage] = useState(null);

    const { createUser, updateUserProfile, logOut } = useAuth();
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if (registerError) {
            Swal.close();
            Swal.fire(
                'Sorry!',
                `${registerError}`,
                'error'
            );
        }

        if (success) {
            Swal.close();
            Swal.fire(
                'Good Job!',
                `${success}`,
                'success'
            );
        }
    }, [registerError, success]);



    const onSubmit = async (data) => {

        console.log(data);

        setRegisterError('')
        setSuccess('')

        const password = data.password;

        if (password.length < 6) {
            setRegisterError('Password is less than 6 characters')
            return
        } else if (!/[A-Z]/.test(password)) {
            setRegisterError('Password don\'t have a capital letter')
            return
        } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|'"`]/.test(password)) {
            setRegisterError('Password don\'t have a special character')
            return
        }


        const formData = new FormData();
        formData.append('image', image);

        const res = await axiosPublic.post(image_hosting_api, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }

        });
        console.log('Image uploaded successfully:', res.data);

        if (res.data.success) {
            const userDetail = {
                name: data.name,
                email: data.email,
                bank_account_no: data.bank_account_no,
                designation: data.designation,
                role: data.role,
                salary: parseFloat(data.salary),
                image: res.data.data.display_url,
                verified: false
            }

            // create user

            createUser(data.email, data.password)
                .then(result => {
                    const loggedUser = result.user;
                    console.log(loggedUser);

                    updateUserProfile(data.name, res.data.data.display_url)
                        .then(() => {
                            console.log("Profile updated");
                            reset();
                            // posting user data to server

                            axiosPublic.post('/users', userDetail)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        setSuccess('Successfully Registered')
                                    }
                                })

                            // navigate('/')
                            logOut()
                                .then(() => {
                                    navigate('/login')
                                })


                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
                .catch(error => {
                    console.log(error);
                    if (error.code === 'auth/email-already-in-use') {
                        setRegisterError('Email is already in use. Please use a different email.');
                    } else {
                        console.error(error);
                    }
                });



        }




    }
    const handleFileChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };




    return (
        <Container sx={{ mt: 12, mb: 6 }} component="main" maxWidth="sm">
            <div>
                <Typography variant="h5" component="div" sx={{ textAlign: 'center', my: 2 }}>
                    Registration Form
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Name"
                                        variant="outlined"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        type="email"
                                        label="Email"
                                        variant="outlined"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        type="password"
                                        label="Password"
                                        variant="outlined"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="role-label">Role</InputLabel>
                                <Controller
                                    name="role"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Role"
                                            labelId="role-label"
                                            required
                                        >
                                            <MenuItem value="" disabled>Select a role</MenuItem>
                                            <MenuItem value="employee">Employee</MenuItem>
                                            <MenuItem value="hr">HR</MenuItem>
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="bank_account_no"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Bank Account Number"
                                        variant="outlined"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="salary"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        type="number"
                                        label="Salary"
                                        variant="outlined"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="designation"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Designation"
                                        variant="outlined"
                                        required
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="image"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="image-input"></InputLabel>
                                        <Input
                                            {...field}
                                            type="file"
                                            inputProps={{
                                                accept: 'image/*',
                                                onChange: (e) => {
                                                    field.onChange(e);
                                                    handleFileChange(e);
                                                }
                                            }}
                                            id="image-input"
                                            required
                                        />
                                    </FormControl>
                                )}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                    >
                        Register
                    </Button>
                    <Grid container justifyContent="center" sx={{ mt: 3 }}>
                        <Grid item>
                            <h4>Already have an account? <Link component={RouterLink} to="/login" variant="body2">
                                {"Login"}
                            </Link></h4>

                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Register;
