import { Paper, Button } from '@mui/material';

const Item = ({ item }) => {
    const { image, title } = item;

    const overlayStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '8px',
        zIndex: 2
    };

    return (
        <Paper style={{ position: 'relative' }} elevation={0}>
            <img src={image} style={{ width: '100%', height: '65vh' }} alt={title} />

            <div style={overlayStyle}>
                <h2>{title}</h2>
                <Button variant='contained'>
                    Check it out!
                </Button>
            </div>
        </Paper>
    );
};

export default Item;
