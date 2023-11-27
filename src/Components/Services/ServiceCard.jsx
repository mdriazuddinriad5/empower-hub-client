import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ServiceCard = ({ service }) => {
    const { title, description, image, features, support_contact } = service;
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
                sx={{ height: 140 }}
                image={image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    <strong>Features:</strong>
                    <ul>
                        {features?.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    <strong>Support Contact:</strong> {support_contact}
                </Typography>
            </CardContent>

        </Card>
    );
}

export default ServiceCard;