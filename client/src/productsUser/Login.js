import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import './App.css';  // הנחה ששם הקובץ הוא Auth.css

function Login() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const check = async () => {
        try {
            const response = await Axios.post("http://localhost:5000/api/auth/login", { userName, password })
            setUserName("")
            setPassword("")

            const data = await response.data;
            localStorage.setItem('token', (data.accessToken))
            navigate('/home')
        }
        catch (error) {
            alert("אינך מזוהה כמשתמש שמור במערכת")
            navigate('/register')
        }
    }

    return (
        <div className="login">
            <div className="auth-form">
                <h1>כניסה</h1>
                <TextField required type="number" onChange={(e) => setUserName(e.target.value)} label="תעודת זהות" />
                <TextField required type="password" onChange={(e) => setPassword(e.target.value)} label="סיסמא" />
                <Button disabled={userName === "" || password === ""} onClick={check} type="submit" variant="contained">כניסה</Button>
            </div>
        </div>
    )
}

export default Login
