import * as Icon from "react-feather";

const SidebarData = [
  {
    title: "Home",
    href: "/home",
    id: 1,
    // suffix: '4',
    // suffixColor: 'bg-info',
    icon: <Icon.Home />,
    collapisble: false,
  },
  {
    title: "Orders",
    href: "/order-list",
    icon: <Icon.ShoppingCart />,
    id: 2,
    collapisble: false,
  },
  {
    title: "Products",
    href: "/product-list",
    icon: <Icon.Box />,
    id: 3,
    collapisble: false,
  },
  {
    title: "Online Shop",
    href: "/banner",
    icon: <Icon.ShoppingBag />,
    id: 4,
    collapisble: false,
  },
  {
    title: "Payments",
    href: "/user-payment",
    icon: <Icon.CreditCard />,
    id: 5,
    collapisble: false,
  },
  {
    title: "Customers",
    href: "/user-customer",
    icon: <Icon.Users />,
    id: 6,
    collapisble: false,
  },
  {
    title: "Plugins",
    href: "/user-plugins",
    icon: <Icon.Package />,
    id: 7,
    collapisble: false,
  },
  {
    title: "Discounts",
    href: "/discount",
    icon: <Icon.Percent />,
    id: 8,
    collapisble: false,
  },
  {
    title: "Settings",
    href: "/setting",
    icon: <Icon.Settings />,
    id: 9,
    collapisble: false,
  },
];

export default SidebarData;
