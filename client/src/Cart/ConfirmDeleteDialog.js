import React from 'react';
import { IoClose } from 'react-icons/io5';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CloseButton = styled(IoClose)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    cursor: 'pointer',
}));

const ConfirmDeleteDialog = ({ open, onClose, onConfirm, productName }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <CloseButton onClick={onClose} />
                אישור מחיקה
            </DialogTitle>
            <DialogContent>
                <Typography>האם אתה בטוח שברצונך למחוק את המוצר {productName}?</Typography>
                <Button
                    onClick={() => {
                        onConfirm();  // Call the confirm function if confirmed
                        onClose();
                    }}
                    color="primary"
                >
                    מחק
                </Button>
                <Button onClick={onClose} color="secondary">
                    ביטול
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default ConfirmDeleteDialog;
