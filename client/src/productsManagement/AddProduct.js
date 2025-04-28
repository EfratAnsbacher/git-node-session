import { useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const AddProduct = () => {
    const [name, setName] = useState("")
    const [barcode, setBarcode] = useState(0)
    const [price, setPrice] = useState(0)
    const [picture, setPicture] = useState("")
    const [information, setInformation] = useState("")
    const navigate = useNavigate()
    const submitForm = async (e) => {
        e.preventDefault()

        // if (barcode.length !== 8) {
        //     return alert("ברקוד חייב להכיל 8 ספרות בדיוק")
        // }

        try {
            const { data } = await Axios.post("http://localhost:5000/api/products", { name, barcode, price, picture, information }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
            // setName("")
            // setBarcode(0)
            // setPrice(0)
            // setPicture("")
            // setInformation("")
            navigate("/products")
        }
        catch (error) {
            alert("ישנה שגיאה בהוספת המוצר, אנא נסה שוב.")
        }


    }

    return <div className="add-product-form">
        <form onSubmit={submitForm} className="auth-form">
            <h1>הוספת מוצר חדש</h1>

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

            <TextField required id="outlined-required" onChange={(e) => setName(e.target.value)} label="שם" defaultValue="" /><br /><br />
            <TextField required type="number" id="outlined-required" onChange={(e) => setBarcode(e.target.value)} label="ברקוד" defaultValue="" /><br /><br />
            <TextField required type="number" id="outlined-required" onChange={(e) => setPrice(e.target.value)} label="מחיר" defaultValue="" /><br /><br />
            <TextField required id="outlined-required" onChange={(e) => setPicture(e.target.value)} label="ניתוב תמונה" defaultValue="" /><br /><br />
            <TextField required id="outlined-required" onChange={(e) => setInformation(e.target.value)} label="מידע" defaultValue="" /><br /><br />
            {/* <button disabled={name === "" || barcode === 0 || price === 0 || picture === "" || information === ""} type="submit">שמור</button> */}
            <Button disabled={name === "" || barcode === 0 || price === 0 || picture === "" || information === ""} type="submit" variant="contained">שמור</Button>
        </form>

        </div>
}

export default AddProduct