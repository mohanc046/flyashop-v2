import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/loader/Loadable.js";
import { getAuthToken } from "../utils/_hooks/index.jsx";
import Logout from "../screens/Logout.jsx";

/***** Layouts *****/
const FullLayout = Loadable(lazy(() => import("../layouts/FullLayout.js")));
const BlankLayout = Loadable(lazy(() => import("../layouts/BlankLayout.js")));

/***** Pages *****/
const Landing = Loadable(lazy(() => import("../screens/Statistics/Statistics.jsx")));
const Login = Loadable(lazy(() => import("../screens/Login/Login.jsx")));
const Home = Loadable(lazy(() => import("../screens/Home/Home.jsx")));
const OrderList = Loadable(lazy(() => import("../screens/Order/OrderList.jsx")));
const ProductList = Loadable(lazy(() => import("../screens/ProductList/ProductList.jsx")));
const AddProduct = Loadable(lazy(() => import("../screens/AddProduct/AddProduct.jsx")));
const OnlineShop = Loadable(lazy(() => import("../screens/OnlineShop/OnlineShop.jsx")));
const Payments = Loadable(lazy(() => import("../screens/UserPayment/Payments.jsx")));
const Customers = Loadable(lazy(() => import("../screens/Customers/Customers.jsx")));
const Plugins = Loadable(lazy(() => import("../screens/UserPlugins/Plugins.jsx")));
const Discounts = Loadable(lazy(() => import("../screens/ProductList/ProductList.jsx")));
const Settings = Loadable(lazy(() => import("../screens/Settings/Settings.jsx")));

/***** Auth Pages *****/
const Error = Loadable(lazy(() => import("../views/auth/Error.js")));
const RegisterFormik = Loadable(lazy(() => import("../views/auth/RegisterFormik.js")));
const Maintenance = Loadable(lazy(() => import("../views/auth/Maintanance.js")));
const LockScreen = Loadable(lazy(() => import("../views/auth/LockScreen.js")));
const RecoverPassword = Loadable(lazy(() => import("../views/auth/RecoverPassword.js")));

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
          { path: "/settings", name: "Settings", element: <Settings /> },
          { path: "/sign-out", name: "Sign Out", element: <Logout /> }
        ]
      : [{ path: "/", name: "Landing", element: <Navigate to="/landing" /> }]
  },
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      { path: "landing", element: <Landing /> },
      { path: "/404", element: <Error /> },
      { path: "*", element: <Navigate to="/landing" /> },
      { path: "registerformik", element: <RegisterFormik /> },
      { path: "login", element: <Login /> },
      { path: "maintenance", element: <Maintenance /> },
      { path: "lockscreen", element: <LockScreen /> },
      { path: "recoverpwd", element: <RecoverPassword /> }
    ]
  }
];

export default ThemeRoutes;
