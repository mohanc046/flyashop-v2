import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Loadable from "../layouts/loader/Loadable.js";
import { getAuthToken } from "../utils/_hooks/index.jsx";
import Logout from "../screens/Logout.jsx";
import { useSelector } from "react-redux";

/***** Layouts *****/
const FullLayout = Loadable(lazy(() => import("../layouts/FullLayout.js")));
const BlankLayout = Loadable(lazy(() => import("../layouts/BlankLayout.js")));

/***** Pages *****/
const Landing = Loadable(lazy(() => import("../screens/Statistics/Statistics.jsx")));
const Login = Loadable(lazy(() => import("../screens/Login/Login.jsx")));
const Home = Loadable(lazy(() => import("../screens/Home/Home.jsx")));
const OrderList = Loadable(lazy(() => import("../screens/Order/OrderList.jsx")));
const OrderDetails = Loadable(lazy(() => import("../screens/OrderDetails/OrderDetails.jsx")));
const ProductList = Loadable(lazy(() => import("../screens/ProductList/ProductList.jsx")));
const ProductDetails = Loadable(lazy(() => import("../screens/ProductDetails/ProductDetails.jsx")));
const AddProduct = Loadable(lazy(() => import("../screens/AddProduct/AddProduct.jsx")));
const OnlineShop = Loadable(lazy(() => import("../screens/OnlineShop/OnlineShop.jsx")));
const Payments = Loadable(lazy(() => import("../screens/UserPayment/Payments.jsx")));
const Customers = Loadable(lazy(() => import("../screens/Customers/Customers.jsx")));
const Plugins = Loadable(lazy(() => import("../screens/UserPlugins/Plugins.jsx")));
const Discounts = Loadable(lazy(() => import("../screens/Discounts/Discounts.jsx")));
const Settings = Loadable(lazy(() => import("../screens/Settings/Settings.jsx")));

/***** Auth Pages *****/
const Error = Loadable(lazy(() => import("../views/auth/Error.js")));
const RegisterFormik = Loadable(lazy(() => import("../views/auth/RegisterFormik.js")));
const Maintenance = Loadable(lazy(() => import("../views/auth/Maintanance.js")));
const LockScreen = Loadable(lazy(() => import("../views/auth/LockScreen.js")));
const RecoverPassword = Loadable(lazy(() => import("../views/auth/RecoverPassword.js")));

// const UserCart = Loadable(lazy(() => import("../screens/UserCart/UserCart.tsx")));
// const Store = Loadable(lazy(() => import("../screens/Store/Store.tsx")));
// const UserOrderList = Loadable(lazy(() => import("../screens/UserOrderList")));
// const Tracking = Loadable(lazy(() => import("../screens/Tracking/Tracking.jsx")));
// const Profile = Loadable(lazy(() => import("../screens/Profile")));
// const ProductPreview = Loadable(lazy(() => import("../screens/ProductPreview")));
// const WelcomeScreen = Loadable(lazy(() => import("../screens/WelcomeScreen/WelcomeScreen.jsx")));
// const PaymentSuccessCard = Loadable(lazy(() => import("../components/Payment/success.jsx")));
// const Pricing = Loadable(lazy(() => import("../screens/Pricing")));
// const StoreProductPreviewScreen = Loadable(
//   lazy(() => import("../screens/StoreProductPreview/storeProductPreview.tsx"))
// );
// const POSHome = Loadable(lazy(() => import("../screens/POS/POSHome.jsx")));
// const POSOrders = Loadable(lazy(() => import("../screens/POS/POSOrders/POSOrders.jsx")));
// const POSCustomers = Loadable(lazy(() => import("../screens/POS/POSCustomers/POSCustomers.jsx")));
// const POSDiscounts = Loadable(lazy(() => import("../screens/POS/POSDiscounts/POSDiscounts.jsx")));

/***** Custom Hook to Get Token *****/
const useAuthToken = () => {
  const localToken = getAuthToken();
  const reduxToken = useSelector((state) => state.authToken.token);
  return localToken || reduxToken;
};

/***** Routes Component *****/
const ThemeRoutes = () => {
  const authToken = useAuthToken();

  return [
    {
      path: "/",
      element: <FullLayout />,
      children: authToken && [
        { path: "/", element: <Navigate to="/home" /> },
        { path: "/home", element: <Home /> },
        { path: "/order-list", element: <OrderList /> },
        { path: "/order/:id", element: <OrderDetails /> },
        { path: "/product-list", element: <ProductList /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/product-list/add-product", element: <AddProduct /> },
        { path: "/online-shop", element: <OnlineShop /> },
        { path: "/payments", element: <Payments /> },
        { path: "/customers", element: <Customers /> },
        { path: "/plugins", element: <Plugins /> },
        { path: "/discounts", element: <Discounts /> },
        { path: "/settings", element: <Settings /> },
        { path: "/sign-out", element: <Logout /> }
      ]
    },
    {
      path: "/",
      element: <BlankLayout />,
      children: [
        { path: "/", element: <Navigate to="/landing" /> },
        { path: "landing", element: <Landing /> },
        { path: "login", element: <Login /> },
        { path: "registerformik", element: <RegisterFormik /> },
        { path: "maintenance", element: <Maintenance /> },
        { path: "lockscreen", element: <LockScreen /> },
        { path: "recoverpwd", element: <RecoverPassword /> },
        // { path: "/user-cart", element: <UserCart /> },
        // { path: "/store/:storeName", element: <Store /> },
        // { path: "/login/user", element: <Login /> },
        // { path: "/user/order-list/:storeName", element: <UserOrderList /> },
        // { path: "/tracking", element: <Tracking /> },
        // { path: "/setting", element: <Settings /> },
        // { path: "/profile", element: <Profile /> },
        // { path: "/preview", element: <ProductPreview /> },
        // { path: "/welcome-screen", element: <WelcomeScreen /> },
        // { path: "/payment/success/:storeId", element: <PaymentSuccessCard /> },
        // { path: "/pricing-list", element: <Pricing /> },
        // { path: "/store/preview", element: <StoreProductPreviewScreen /> },
        // { path: "/logout", element: <Logout /> },
        // { path: "/pos/home", element: <POSHome /> },
        // { path: "/pos/orders", element: <POSOrders /> },
        // { path: "/pos/customers", element: <POSCustomers /> },
        // { path: "/pos/discounts", element: <POSDiscounts /> }
      ]
    }
  ];
};

export default ThemeRoutes;
