import { Outlet } from "react-router-dom"
import Home from "../productsUser/Home"
import Navigate from "./Navigate"
const Layout = () => {
    return <div className="page">
        <header>
            <Navigate/>
            
        </header>
        <main>
            <Outlet />
        </main>
        <footer>Footer</footer>
    </div>

}

export default Layout