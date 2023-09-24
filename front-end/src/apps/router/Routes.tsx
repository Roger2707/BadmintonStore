import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ProductsPage from "../../features/Products/ProductsPage";
import About from "../../features/About/About";
import Contact from "../../features/Contact/About";
import Register from "../../features/Account/Register";
import Login from "../../features/Account/Login";
import AdminControl from "../../features/Admin/AdminControl";
import AdminProducts from "../../features/Admin/Product/AdminProducts";
import AdminCategory from "../../features/Admin/Category/AdminCategory";
import AdminBrands from "../../features/Admin/Brand/AdminBrands";
import AdminAccount from "../../features/Admin/Account/AdminAccount";
import AdminDashboard from "../../features/Admin/AdminDashboard";
import HomePage from "../../features/Home/HomePage";
import ProductDetails from "../../features/Products/ProductDetails";
import BasketPage from "../../features/Basket/BasketPage";
import MyProfile from "../../features/Account/MyProfile";
import MyOrders from "../../features/Orders/MyOrders";
import RequiredAuth from "./RequiredAuth";
import CheckoutPage from "../../features/Checkout/CheckoutPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {element: <RequiredAuth />, children: [
                {path: '/checkout', element: <CheckoutPage/>}
            ]},
            {path: '/admin', element: <AdminControl/>},
            {path: '/', element: <HomePage/>},
            {path: '/products', element: <ProductsPage/>},
            {path: '/products/:id', element: <ProductDetails/>},
            {path: '/basket', element: <BasketPage/>},
            {path: '/about', element: <About/>},
            {path: '/contact', element: <Contact/>},
            {path: '/register', element: <Register/>},
            {path: '/login', element: <Login/>},
            {path: '/profile', element: <MyProfile/>},
            {path: '/orders', element: <MyOrders/>},
        ]
    },
    {
        path: '/admin',
        element: <AdminControl/>,
        children: [
            {path: '/admin', element: <AdminDashboard/>},
            {path: '/admin/products', element: <AdminProducts/>},
            {path: '/admin/category', element: <AdminCategory/>},
            {path: '/admin/brands', element: <AdminBrands/>},
            {path: '/admin/account', element: <AdminAccount/>},
        ]
    }
])