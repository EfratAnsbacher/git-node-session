import React from 'react';
import { IoClose } from 'react-icons/io5';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const CloseButton = styled(IoClose)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    cursor: 'pointer',
}));

const AddToCart = ({ product, onClose, fetchProducts }) => {
    const navigate = useNavigate()
    const handleAdd = async () => {
        if (localStorage.getItem("token")) {
            try {

                const header = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
                const { data } = await Axios.post("http://localhost:5000/api/carts/", { product: product._id }, { headers: header })
                fetchProducts();
                alert("מוצר נוסף בהצלחה")
            }
            catch (error) {
                alert("שגיאה")
            }
        }
        else {

            alert("אינך מזוהה כמשתמש שמור במערכת")
            navigate('/login')
        }
    }

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle><CloseButton onClick={onClose} />הוסף לעגלה</DialogTitle>
            <DialogContent>
                <Typography>האם אתה בטוח שברצונך להוסיף את המוצר {product.name} לעגלה?</Typography>
                <Button onClick={() => { handleAdd(); onClose(); }} color="primary">הוסף</Button>
                <Button onClick={onClose} color="secondary">ביטול</Button>
            </DialogContent>
        </Dialog>
    );
}

export default AddToCart;
