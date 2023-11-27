
import { Container, Typography, Grid, TextField, Button } from '@mui/material';

const ContactUs = () => {
    return (
        <Container maxWidth="lg">
            <div>
                <Typography variant="h5" sx={{ fontSize: '3xl', fontWeight: 'bold', mt: 16 }}>
                    Contact Us
                </Typography>
                <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
                    We would love to hear from you! Feel free to reach out to us for any inquiries or assistance.
                </Typography>

                <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Your Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Your Email"
                            variant="outlined"
                            fullWidth
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
                            sx={{ mb: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" sx={{ width: '100%' }}>
                            Send Message
                        </Button>
                    </Grid>
                </Grid>

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


