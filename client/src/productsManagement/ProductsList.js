import { useEffect, useState } from "react"
import Axios from "axios"
import { Link } from "react-router-dom"
import ProductItemManagment from "./ProductItemManagement"
import { BiSolidMessageSquareAdd } from "react-icons/bi";

const ProductsList = () => {
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        try {
            const { data } = await Axios.get("http://localhost:5000/api/products/")
            setProducts(data)

        }
        catch (error) {
            alert("ישנה שגיאה במערכת, אנא נסה שוב.")
        }

    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <>
            <Link to="/products/add" className="add-product-link">הוספת מוצר <BiSolidMessageSquareAdd /></Link>
            <div className="products-list">

                {products.map((product) => {
                    return <ProductItemManagment fetchProducts={fetchProducts} product={product} />
                })}
            </div>
        </>
    )
}

export default ProductsList