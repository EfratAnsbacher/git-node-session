import { MdDeleteForever, MdOutlineMode } from "react-icons/md";
import Axios from "axios";
import UpdateProduct from "./UpdateProduct";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { red } from '@mui/material/colors';
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

const ProductItemManagement = ({ product, fetchProducts }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const navigate = useNavigate();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const handleDelete = async () => {
        try {
            await Axios.delete(`http://localhost:5000/api/products/${product._id}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            fetchProducts();
            alert("מוצר נמחק בהצלחה");
        } catch (error) {
            alert("אינך מורשה לבצע מחיקה");
        }
    }

    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        navigate("/products");
    }
    

    return (
        <div className="product-item">
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={<Avatar sx={{ bgcolor: "black" }} aria-label="recipe">{product.barcode}</Avatar>}
                    action={<IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>}
                    title={product.name}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={`./pictures/${product.picture}.jpg`}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">₪{product.price}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="delete product" onClick={handleDelete}>
                        <MdDeleteForever />
                    </IconButton>
                    <IconButton aria-label="update product" onClick={openModal}>
                        <MdOutlineMode />
                    </IconButton>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
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
                        <Typography paragraph>{product.information}</Typography>
                    </CardContent>
                </Collapse>
            </Card>
            <UpdateProduct
                fetchProducts={fetchProducts}
                product={product}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
}

export default ProductItemManagement;
