import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Forgotpassword from "../pages/Forgotpassword";
import SignUp from "../pages/SignUp";
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct.js'
import ProductDetails from "../pages/ProductDetails.js";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : "Login",
                element : <Login/>
            },
            {
                path : "Forgotpassword",
                element : <Forgotpassword/>
            },
            {
                path : "SignUp",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    }
                ]
            },
        ]
    }
])


export default router