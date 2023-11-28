import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Button, Container, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';

import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAuth from '../../Hooks/useAuth';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { handleSubmit, control } = useForm();
    const [success, setSuccess] = useState('');
    const [loginError, setLoginError] = useState('');
    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    useEffect(() => {
        if (loginError) {
            Swal.close();
            Swal.fire(
                'Sorry!',
                `${loginError}`,
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
    }, [loginError, success]);


    const onSubmit = async (data) => {
        const { email, password } = data;

        setSuccess('');
        setLoginError('');

        try {
            await signIn(email, password);
            setSuccess('Logged in successfully');

            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            console.log("Error code:", error.code);

            switch (error.code) {
                case "auth/invalid-email":
                    setLoginError('email doesn\'t match');
                    break;
                case "auth/invalid-login-credentials":
                    setLoginError('Password doesn\'t match');
                    break;
                default:
                    setLoginError('An unexpected error occurred while signing in');
                    break;
            }
        }
    };

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    return (
        <>
            <Container sx={{ my: 16 }} component="main" maxWidth="xs">
                <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                        Login now!
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
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
                                <Controller
                                    name="captcha"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <>
                                            <LoadCanvasTemplate />
                                            <TextField
                                                {...field}
                                                fullWidth
                                                onBlur={handleValidateCaptcha}
                                                label="Write the captcha"
                                                variant="outlined"
                                                required
                                            />
                                        </>
                                    )}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={disabled}
                            sx={{ mt: 3 }}
                        >
                            Login
                        </Button>
                    </form>
                    <Grid container justifyContent="center" sx={{ mt: 3 }}>
                        <Grid item>
                            <Link component={RouterLink} to="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" sx={{ mt: 3 }}>
                        <Grid item>
                            <h4>Don&apos;t have an account? <Link component={RouterLink} to="/register" variant="body2">
                                {" Sign Up"}
                            </Link></h4>

                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
};

export default Login;
