import { useEffect, useState } from "react";
import Axios from "axios";
import CartItem from "./CartItem";

const CartList = () => {
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        try {
            const { data } = await Axios.get("http://localhost:5000/api/carts", {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            setCart(data);
        } catch (error) {
        //    return alert("ישנה שגיאה בצפיה בסל שלך, יתכן ואינך רשום.");
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // Filter out items that are no longer available
    const filteredCart = cart.filter(item => item && item.product);

    if (filteredCart.length === 0) return <h1 className="empty-cart">הסל שלך ריק</h1>;

    return (
        <div className="products-list">
            {filteredCart.map((cartItem) => (
                <CartItem key={cartItem._id} cart={cartItem} fetchCart={fetchCart} />
            ))}
        </div>
    );
};

export default CartList;
