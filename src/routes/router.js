import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/loader/Loadable";
import { getAuthToken } from "../utils/_hooks";

/***** Layouts *****/
const FullLayout = Loadable(lazy(() => import("../layouts/FullLayout")));
const BlankLayout = Loadable(lazy(() => import("../layouts/BlankLayout")));

/***** Pages *****/
const Landing = Loadable(lazy(() => import("../screens/Statistics/Statistics")));
const Login = Loadable(lazy(() => import("../screens/Login/Login")));
const Home = Loadable(lazy(() => import("../screens/Home/Home")));
const OrderList = Loadable(lazy(() => import("../screens/Order/OrderList")));
const ProductList = Loadable(lazy(() => import("../screens/ProductList/ProductList")));
const AddProduct = Loadable(lazy(() => import("../screens/AddProduct/AddProduct")));
const OnlineShop = Loadable(lazy(() => import("../screens/OnlineShop/OnlineShop")));
const Payments = Loadable(lazy(() => import("../screens/UserPayment/Payments")));
const Customers = Loadable(lazy(() => import("../screens/Customer/Customer")));
const Plugins = Loadable(lazy(() => import("../screens/UserPlugins/Plugins")));
const Discounts = Loadable(lazy(() => import("../screens/ProductList/ProductList"))); // Note: Repeated import of ProductList
const Settings = Loadable(lazy(() => import("../screens/Settings/Settings")));

/***** Auth Pages *****/
const Error = Loadable(lazy(() => import("../views/auth/Error")));
const RegisterFormik = Loadable(lazy(() => import("../views/auth/RegisterFormik")));
const Maintenance = Loadable(lazy(() => import("../views/auth/Maintanance"))); // Corrected spelling
const LockScreen = Loadable(lazy(() => import("../views/auth/LockScreen")));
const RecoverPassword = Loadable(lazy(() => import("../views/auth/RecoverPassword")));

/***** Retrieve Auth Token *****/
const authToken = getAuthToken();

/***** Routes *****/
const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: authToken
      ? [
          { path: "/", name: "Home", element: <Navigate to="/home" /> },
          { path: "/home", name: "Home", element: <Home /> },
          { path: "/order-list", name: "Order List", element: <OrderList /> },
          { path: "/product-list", name: "Product List", element: <ProductList /> },
          {
            path: "/product-list/add-product",
            name: "Add Product",
            element: <AddProduct />
          },
          { path: "/online-shop", name: "Online Shop", element: <OnlineShop /> },
          { path: "/payments", name: "Payments", element: <Payments /> },
          { path: "/customers", name: "Customers", element: <Customers /> },
          { path: "/plugins", name: "Plugins", element: <Plugins /> },
          { path: "/discounts", name: "Discounts", element: <Discounts /> },
          { path: "/settings", name: "Settings", element: <Settings /> }
        ]
      : [{ path: "/", name: "Landing", element: <Navigate to="/landing" /> }]
  },
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      { path: "landing", element: <Landing /> },
      { path: "404", element: <Error /> },
      { path: "*", element: <Navigate to="/404" /> },
      { path: "registerformik", element: <RegisterFormik /> },
      { path: "login", element: <Login /> },
      { path: "maintenance", element: <Maintenance /> }, // Corrected spelling
      { path: "lockscreen", element: <LockScreen /> },
      { path: "recoverpwd", element: <RecoverPassword /> }
    ]
  }
];

export default ThemeRoutes;
