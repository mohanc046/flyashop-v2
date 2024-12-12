import React from "react";
import "./pos-layout.css";
import { Button } from "antd";
import { config } from "../../../config";

const POSHeader = () => {
    return (
        <>
            <div className="pos-header-container">
                <div className="left">
                    <div className="logo-container">B</div>
                    <div>
                        <h4 className="shop-name">Budget Shop</h4>
                        <span className="date">Sunday, June 20 2021</span>
                    </div>
                </div>
                <div className="right">
                    <h4 className="user-name">Staff: Muhammed</h4>
                    <Button className="btn btn-primary add-customer" >Add Customer</Button>
                    <img className="power-btn" src={config.POWER_BTN_ICON} alt="" />
                </div>
            </div>
            <div className="header-spacer" style={{ height: 77 }}></div>
        </>
    )
}

export default POSHeader;