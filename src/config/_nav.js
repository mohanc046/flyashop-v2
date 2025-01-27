import { CNavItem } from '@coreui/react'

import { config } from '.';

export const nav_config = [
  {
    component: CNavItem,
    name: 'Overview',
    to: '/home',
    icon: config.LEFT_NAV_HOME_ICON
  },
  {
    component: CNavItem,
    name: 'Analytics',
    to: '/analytics',
    icon: config.LEFT_NAV_ANALYTICS_ICON
  },
  {
    component: CNavItem,
    name: 'Products',
    to: '/product-list',
    icon: config.LEFT_NAV_PRODUCTS_ICON,
    children: [
      {
        component: CNavItem,
        name: 'Product1',
        to: '/product-list',
      },
    ]
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/order-list',
    icon: config.LEFT_NAV_ORDERS_ICON
  },
  {
    component: CNavItem,
    name: 'Checkout',
    to: '/checkout',
    icon: config.LEFT_NAV_CHECKOUT_ICON
  },
  {
    component: CNavItem,
    name: 'Products',
    to: '/product-list',
    icon: config.LEFT_NAV_CHECKOUT_ICON
  },
  {
    component: CNavItem,
    name: 'Payments',
    to: '/user-payment',
    icon: config.LEFT_NAV_CHECKOUT_ICON
  },
  {
    component: CNavItem,
    name: 'Settings',
    to: '/home1',
    icon: config.SETTINGS_ICON
  },
  {
    component: null,
    name: "Empty Space",
    lineCount: 5
  },
  {
    component: CNavItem,
    name: 'Help Centre',
    to: '/logout',
    icon: config.LEFT_NAV_HELP_CENTRE_ICON
  },
  {
    component: CNavItem,
    name: 'Contact Us',
    to: '/logout',
    icon: config.LEFT_NAV_CONTACTUS_ICON
  },
  {
    component: CNavItem,
    name: 'Logout',
    to: '/logout',
    icon: config.LEFT_NAV_LOGOUT_ICON
  }
]

export const mobile_nav_config = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/home',
    icon: ""
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/order-list'
  },
  {
    component: CNavItem,
    name: 'Products',
    to: '/product-list',
    icon: ""
  },
  {
    component: CNavItem,
    name: 'Online Shop',
    to: '/banner',
    icon: ""
  },
  {
    component: CNavItem,
    name: 'Payments',
    to: '/user-payment',
    icon: ""
  },
  {
    component: CNavItem,
    name: 'Customers',
    to: '/user-customer',
    icon: ""
  },
  {
    component: CNavItem,
    name: 'Plugins',
    to: '/user-plugins',
    icon: ""
  },
  {
    component: CNavItem,
    name: 'Discounts',
    to: '/discount',
    icon: ""
  },
  {
    component: CNavItem,
    name: 'Settings',
    to: '/setting',
    icon: ""
  },
  {
    component: CNavItem,
    name: 'Sign Out',
    to: '/logout',
    icon: ""
  },
]

export const getBuyerLeftNavConfig = (storeName) => [
  {
    component: CNavItem,
    name: 'Home',
    to: `${storeName}`
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/user/order-list'
  },
  {
    component: CNavItem,
    name: 'Cart',
    to: '/user-cart',
    icon: ""
  },
  {
    component: CNavItem,
    name: 'Sign Out',
    to: '/logout',
    icon: ""
  }
]