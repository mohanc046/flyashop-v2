import React from "react";
import "./pos-layout.css";
import { config } from "../../../config";
import { useNavigate } from "react-router-dom";

const POSLeftNav = ({ screen }) => {
    const navigate = useNavigate();
    const handleClick = (path) => {
        navigate(path);
    }
    const options = [
        {
            label: "Home",
            path: "/pos/home",
            icon: config.LEFT_NAV_HOME_ICON
        },
        {
            label: "Orders",
            path: "/pos/orders",
            icon: config.POS_ORDERS_ICON
        },
        {
            label: "Customers",
            path: "/pos/customers",
            icon: config.POS_CUSTOMERS_ICON
        },
        {
            label: "Discounts",
            path: "/pos/discounts",
            icon: config.POS_DISCOUNTS_ICON
        },
        {
            label: "Cancelled",
            path: "/pos/cancelled",
            icon: config.POS_CANCELLED_ICON
        },
        {
            label: "Settings",
            path: "/pos/settings",
            icon: config.SETTINGS_ICON
        },
    ]
    return (
        <>
            <div className="pos-nav-container">
                <div className="nav-options">
                    {
                        options.map((item) => (
                            <li className={`${screen === item.label ? "active" : ""}`} onClick={(e) => handleClick(item.path)}> <img src={item.icon} alt="" /> {item.label}</li>
                        ))
                    }
                    <li> <span className="edit-btn">+</span> Edit</li>
                </div>
                <li className="dashboard"> <img src={config.POS_DASHBOARD_ICON} alt="" />Dashboard</li>
            </div>
            <div className="left-nav-spacer" style={{ width: 91 }}></div>
        </>
    )
}

export default POSLeftNav;