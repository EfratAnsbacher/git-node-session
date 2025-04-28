import '../App.css'
import { useState } from 'react'
import Axios from 'axios'
import { IoClose } from "react-icons/io5";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const UpdateProduct = ({ product, fetchProducts, isOpen, onClose }) => {

    const [name, setName] = useState(product.name)
    const [barcode, setBarcode] = useState(product.barcode)
    const [price, setPrice] = useState(product.price)
    const [picture, setPicture] = useState(product.picture)
    const [information, setInformation] = useState(product.information)
    
    const submitForm = async (e) => {
        e.preventDefault()
        // if (barcode.toString().length !== 8) {
        //     return alert("ברקוד חייב להכיל 8 ספרות בדיוק")
        // }
        try {
            const { data } = await Axios.put(`http://localhost:5000/api/products/${product._id}`, { name, barcode, price, picture, information }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            setName("")
            setBarcode("")
            setPrice("")
            setPicture("")
            setInformation("")
            fetchProducts()
            
        }
        catch (error) {
            console.log(error)
            alert("אינך מורשה לבצע עדכון")
        }
        
    }


    if (!isOpen) return null;
    return (
        <div className="updateWindow">
            <div className="updateWindowInfo">
                <button className="closeUpdate" onClick={onClose} ><IoClose /></button>
                <form onSubmit={submitForm}>
                    <h1>עדכון מוצר </h1>

                    {/* <label>שם</label><br />
                    <input placeholder="שם" required={true} onChange={(e) => setName(e.target.value)} /><br /><br />
                    <label>ברקוד</label><br />
                    <input placeholder="ברקוד" type="number" required={true} onChange={(e) => setBarcode(e.target.value)} /><br /><br />
                    <label>מחיר</label><br />
                    <input placeholder="מחיר" type="number" required={true} onChange={(e) => setPrice(e.target.value)} /><br /><br />
                    <label>ניתוב תמונה</label><br />
                    <input placeholder="ניתוב תמונה" required={true} onChange={(e) => setPicture(e.target.value)} /><br /><br />
                    <label>מידע</label><br />
                    <input placeholder="מידע" required={true} onChange={(e) => setInformation(e.target.value)} /><br /><br /> */}

                    <TextField id="outlined-required" onChange={(e) => setName(e.target.value)} value={name} label="שם"  /><br /><br />
                    <TextField type="number" id="outlined-required" onChange={(e) => setBarcode(e.target.value)} value={barcode} label="ברקוד"  /><br /><br />
                    <TextField type="number" id="outlined-required" onChange={(e) => setPrice(e.target.value)} value={price} label="מחיר" /><br /><br />
                    <TextField id="outlined-required" onChange={(e) => setPicture(e.target.value)} value={picture} label="ניתוב תמונה" /><br /><br />
                    <TextField id="outlined-required" onChange={(e) => setInformation(e.target.value)} value={information} label="מידע" /><br /><br />

                    {/* <button disabled={name === "" || barcode === 0 || price === 0 || picture === "" || information === ""} type="submit">שמור</button> */}

                    <Button type="submit" variant="contained" disabled={name === "" || barcode === 0 || price === 0 || picture === "" || information === ""}>שמור</Button>
                </form>


            </div>
        </div>
    );
}

export default UpdateProduct