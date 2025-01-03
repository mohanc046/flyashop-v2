import React from 'react'
const Products = React.lazy(() => import('../screens/Products/products'));
const Logout = React.lazy(() => import('../screens/Logout.jsx'));
const Cart = React.lazy(() => import('../screens/Cart/cart'));

const routes = [
  { path: '/products/live', name: 'Live', element: Products },
  { path: '/products/cart', name: 'Cart', element: Cart },
  { path: '/logout', name: 'Logout', element: Logout },
]

export default routes
