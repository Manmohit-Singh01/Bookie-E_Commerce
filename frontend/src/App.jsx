import {createBrowserRouter, RouterProvider} from "react-router";
import Home from "./pages/home.jsx";
import Login from "./pages/logIn.jsx";
import SignUp from "./pages/signUp.jsx";
import ProductDetails from "./pages/productDetails.jsx";
import AddProduct from "./admin/addProduct.jsx";
import EditProduct from "./admin/editProduct.jsx";
import ProductList from "./admin/productList.jsx";
import Layout from "./layout.jsx";
import Cart from "../components/cart.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {path: "/", element: <Home />},
            {path: "/login", element: <Login />},
            {path: "/signup", element: <SignUp />},
            {path: "/product/:id", element: <ProductDetails />},

            {path: "/admin/products", element: <ProductList />},
            {path: "/admin/products/add", element: <AddProduct />},
            {path: "/admin/products/edit/:id", element: <EditProduct />}
        ]
    }
]);

export default function App() {
    return (
        <RouterProvider router={router} />
    )
}