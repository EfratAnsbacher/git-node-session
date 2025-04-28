import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import PhoneIcon from '@mui/icons-material/Phone';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import PersonPinIcon from '@mui/icons-material/PersonPin';
import { IoBasketOutline, IoLogInSharp, IoPersonAddSharp, IoExit } from "react-icons/io5";
import { LuPenSquare } from "react-icons/lu";
import { AiFillHome } from "react-icons/ai";

export default function Navigate() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                navigate('/home');
                break;
            case 1:
                navigate('/products');
                break;
            case 2:
                navigate('/cart');
                break;
            default:
                navigate('/home');
        }
    };

    const handleLogout = () => {
        alert("משתמש יצא");
        localStorage.clear();
        navigate("/home");
    };

    return (
        <div className="nav">
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="icon label tabs example"
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab
                    icon={<AiFillHome className="tab-icon"/>}
                    label="Home"
                    onClick={() => navigate('/home')}
                    className="tab-icon"
                />
                <Tab
                    icon={<LuPenSquare className="tab-icon"/>}
                    label="Manage Products"
                    onClick={() => navigate('/products')}
                    className="tab-icon"
                />
                <Tab
                    icon={<IoBasketOutline className="tab-icon"/>}
                    label="Cart"
                    onClick={() => navigate('/cart')}
                    className="tab-icon"
                />
                <Tab
                    icon={<IoLogInSharp className="tab-icon"/> }
                    label="Login"
                    onClick={() => navigate('/login')}
                    className="tab-icon"
                />
                <Tab
                    icon={<IoPersonAddSharp className="tab-icon"/>}
                    label="Register"
                    onClick={() => navigate('/register')}
                    className="tab-icon"
                />
                <Tab
                    icon={<IoExit className="tab-icon"/>}
                    label="Logout"
                    onClick={handleLogout}
                    className="tab-icon"
                />
            </Tabs>
        </div>
    );
}
