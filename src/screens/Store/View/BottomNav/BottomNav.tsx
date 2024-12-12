import _ from "lodash";
import React from 'react'
import './BottomNav.css'
import { config } from "../../../../config";
import { useNavigate } from "react-router-dom";


/**
 * @name BottomNav This is a bottom nav mobile component
 * @returns React function
 */
const BottomNav = ({ storeName }) => {
    const active = "Home";
    const navigate = useNavigate();
    const bottomNavs = [
        {
            key: "Home",
            icon: config.HOME_ICON,
            activeIcon: config.HOME_ACTIVE_ICON
        },
        {
            key: "Shop",
            icon: config.SHOP_MENU_ICON,
            activeIcon: config.SHOP_MENU_ACTIVE_ICON,
            navigate: () => navigate('/user-cart')
        },
        {
            key: "Favourites",
            icon: config.FAVOURITES_ICON,
            activeIcon: config.FAVOURITES_ICON_ACTIVE,
            navigate: () => navigate(`/user/order-list/${storeName}`)
        },
        {
            key: "Menu",
            icon: config.MENU_ICON,
            activeIcon: config.MENU_ICON_ACTIVE,
            navigate: () => navigate('/setting')
        },
    ]
    return (
        <div className="shop-footer">
            {
                bottomNavs.map(menu => (
                    <div>
                        <img onClick={menu.navigate} src={active === menu.key ? menu.activeIcon : menu.icon} />
                    </div>
                ))
            }

        </div>
    )
}

export default BottomNav;