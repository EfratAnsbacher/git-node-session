import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import Axios from "axios";
import ConfirmDeleteDialog from './ConfirmDeleteDialog';  // Import the ConfirmDeleteDialog
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const CartItem = ({ cart, fetchCart }) => {
    const [expanded, setExpanded] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const handleDelete = async () => {
        try {
            await Axios.delete(`http://localhost:5000/api/carts/${cart._id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setIsDeleted(true); // Update state to remove the item from display
            fetchCart(); // Fetch updated cart data
            alert("מוצר נמחק בהצלחה");
        } catch (error) {
            alert("שגיאה במחיקת מוצר");
        }
    }

    // If the item was deleted, do not render the card
    if (isDeleted) return null;

    // Check if product data exists
    if (!cart || !cart.product) {
        return <div>נתוני המוצר אינם זמינים</div>;
    }

    return (
        <div className="product-item">
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={<Avatar sx={{ bgcolor: 'black' }} aria-label="recipe">{cart.product.barcode}</Avatar>}
                    action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
                    title={cart.product.name}
                />
                <CardMedia component="img" height="194" image={`./pictures/${cart.product.picture}.jpg`} />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">₪{cart.product.price}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="delete item" onClick={() => setDialogOpen(true)}><MdDeleteForever /></IconButton>
                    <IconButton aria-label="add to favorites"><FavoriteIcon /></IconButton>
                    <IconButton aria-label="share"><ShareIcon /></IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>הפרס כולל:</Typography>
                        <Typography paragraph>{cart.product.information}</Typography>
                    </CardContent>
                </Collapse>
            </Card>

            <ConfirmDeleteDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleDelete}
                productName={cart.product.name}
            />
        </div>
    );
}

export default CartItem;
