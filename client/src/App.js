import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProductsList from './productsManagement/ProductsList';
import AddProduct from './productsManagement/AddProduct';
import Layout from './common/Layout';
import Login from './productsUser/Login';
import Register from './productsUser/Register';
import Home from './productsUser/Home';
import CartList from './Cart/CartList';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/cart' element={<CartList />} />
            <Route path='/products' element={<ProductsList />} />
            <Route path='/products/add' element={<AddProduct />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/logout' onClick={logout}  /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;