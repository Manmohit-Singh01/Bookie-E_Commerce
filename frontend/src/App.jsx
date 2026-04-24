import {createBrowserRouter, RouterProvider} from "react-router";
import Home from "./pages/home.jsx";
import Login from "./pages/logIn.jsx";
import SignUp from "./pages/signUp.jsx";
import ProductDetails from "./pages/productDetails.jsx";

const router = createBrowserRouter([
    {path: "/", element: <Home />},
    {path: "/login", element: <Login />},
    {path: "/signup", element: <SignUp />},
    {path: "/product/:id", element: <ProductDetails />}
]);

export default function App() {
    return (
        <RouterProvider router={router} />
    )
}