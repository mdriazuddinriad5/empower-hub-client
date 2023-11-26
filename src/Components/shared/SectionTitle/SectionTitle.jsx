import { Typography, Box, Grid, Paper } from '@mui/material';

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <Paper sx={{ textAlign: 'center', width: 'fit-content', mx: 'auto' }} elevation={0}>
            <Typography variant="h6" fontWeight={600} sx={{ color: 'red', mb: 2 }}>
                ---{subHeading}---
            </Typography>
            <Typography variant="h5" fontWeight={600} sx={{ textTransform: 'uppercase' }}>
                {heading}
            </Typography>
        </Paper>
    );
};

export default SectionTitle;