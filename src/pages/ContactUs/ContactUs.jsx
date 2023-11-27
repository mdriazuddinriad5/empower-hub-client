import { Container, Typography, Grid, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        const userQuery = {
            name: data.name,
            email: data.email,
            message: data.message
        }


        const res = await axiosPublic.post('/user-query', userQuery, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
      
        if (res.status === 200) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Thanks for your query",
                showConfirmButton: false,
                timer: 1500
            });

            reset();
        }

    };

    return (
        <Container maxWidth="lg">
            <div>
                <Typography variant="h5" sx={{ fontSize: '3xl', fontWeight: 'bold', mt: 16 }}>
                    Contact Us
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
                    We would love to hear from you! Feel free to reach out to us for any inquiries or assistance.
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Your Name"
                                variant="outlined"
                                fullWidth
                                {...register('name', { required: 'This field is required' })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                sx={{ mb: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Your Email"
                                variant="outlined"
                                fullWidth
                                {...register('email', {
                                    required: 'This field is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                sx={{ mb: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Message"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                {...register('message', { required: 'This field is required' })}
                                error={!!errors.message}
                                helperText={errors.message?.message}
                                sx={{ mb: 1 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>
                                Send Message
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <Typography variant="body1" sx={{ mt: 3, textAlign: 'justify' }}>
                    Alternatively, you can contact us via phone or email using the following details:
                </Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>
                    <span style={{ fontSize: 'medium', fontWeight: '300' }}>Contact Number: +10251428109</span>
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    <span style={{ fontSize: 'medium', fontWeight: '300' }}>Email: info@yourwebsite.com</span>
                </Typography>
            </div>
        </Container>
    );
};

export default ContactUs;
