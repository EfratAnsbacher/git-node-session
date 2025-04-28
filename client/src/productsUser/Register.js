import { useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import './Auth.css';  // הנחה ששם הקובץ הוא Auth.css

function Register() {
    const [userName, setUserName] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const check = async () => {
        if (userName.length !== 9) {
            alert("תעודת זהות לא חוקית")
            return;
        }
        if (password !== confirmPassword) {
            alert("הסיסמאות אינן תואמות");
            return;
        }
        if (phone.length !== 9 && phone.length !== 10) {
            alert("טלפון לא חוקי");
            return;
        }
        if (!(email.includes("@") && email.split("@")[1].includes(".") && email.split("@")[0].length > 0 && email.split(".")[1].length > 0)) {
            alert("מייל לא חוקי");
            return;
        }
        try {
            const register = await Axios.post("http://localhost:5000/api/auth/register", { userName, name, password, phone, email })
            const data = await register.data;
            setUserName("")
            setName("")
            setPassword("")
            setConfirmPassword("")
            setPhone("")
            setEmail("")
            navigate('/login')
        }
        catch (error) {
            // alert("ישנה שגיאה במהלך ההרשמה, אנא נסה שוב.");
        }
    }

    return (
        <div className="register">
            <div className="auth-form">
                <h1>טופס הרשמה</h1>
                <TextField required type="number" onChange={(e) => setUserName(e.target.value)} label="תעודת זהות" />
                <TextField required onChange={(e) => setName(e.target.value)} label="שם" />
                <TextField required type="password" onChange={(e) => setPassword(e.target.value)} label="סיסמא" />
                <TextField required type="password" onChange={(e) => setConfirmPassword(e.target.value)} label="אימות סיסמא" />
                <TextField required type="number" onChange={(e) => setPhone(e.target.value)} label="טלפון" />
                <TextField required type="email" onChange={(e) => setEmail(e.target.value)} label="מייל" />
                <Button disabled={userName === "" || name === "" || password === "" || confirmPassword === "" || phone === "" || email === ""} onClick={check} type="submit" variant="contained">שלח</Button>
            </div>
        </div>
    )
}

export default Register
