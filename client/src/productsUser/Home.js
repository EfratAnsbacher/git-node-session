import { useEffect, useState } from "react"
import Axios from "axios"
import ProductItemUser from "./ProductItemUser"

const Home = () => {
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        try {
            const { data } = await Axios.get("http://localhost:5000/api/products/")
            setProducts(data)
        }
        catch (error) {
            console.error(error)
            alert("ישנה שגיאה במערכת, אנא נסה שוב.")
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    if (products.length === 0) return <h1>Loading...</h1>
    return (
        <>
            <div className="products-list">
                {products.map((product) => {
                    return <ProductItemUser fetchProducts={fetchProducts} product={product} />
                })}
            </div>
        </>
    )
}

export default Home