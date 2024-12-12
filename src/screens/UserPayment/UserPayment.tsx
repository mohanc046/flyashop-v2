import _ from "lodash";
import React, { useState } from 'react'
import './UserPayment.css'
import { notification } from "antd";
import { customerConfig, paymentConfig } from "./UserConfig";
import AppSidebar from "../../components/AppSidebar";
import AppHeader from "../../components/AppHeader";

export default function Order({ name }) {

    const isPaymentScreen = () => name === 'Payments';

    const [state, setState] = useState({
        screen: 'WELCOME',
        paymentConfigList: (isPaymentScreen() ? paymentConfig : customerConfig),
        heading: (isPaymentScreen() ? 'Payments' : 'Customers')
    });

    if (name !== state.heading) {
        setState({
            screen: 'WELCOME',
            paymentConfigList: (isPaymentScreen() ? paymentConfig : customerConfig),
            heading: (isPaymentScreen() ? 'Payments' : 'Customers')
        })
    }

    const setUpPayment = () => {
        notification.open({ type: "success" , message: "Payment Methods Configured Successfully" })
    }

    const renderPaymentSetupUI = (paymentConfig) => {
        const { image, heading, description } = paymentConfig;
        return <div className="fullLayoutPaymentBox">
            <div className="flex1"> <img className="imageFullOrderSize" src={image}></img></div>
            <div className="flex2">
                <div className="paymentLabelMargin">
                    <h6>{heading}</h6>
                    <div>{description}</div>
                </div>
            </div>
            <div className="flex1 textCenterButton"><button className="setUpButton" onClick={setUpPayment}>Setup</button></div>
        </div>
    }
  
    const renderMobileVersion = () => {
        const { heading, paymentConfigList = [] } = state;
        return <div>
            <AppSidebar />
            <AppHeader
                    heading={heading}
                    showBrand={false}
                    showAvatar={true}
                />
            <br></br>      
            <h6 className="headingLabel">{state.heading}</h6> 
            <div className="p-2">
            {paymentConfigList.map((paymentConfig) => renderPaymentSetupUI(paymentConfig))}
            </div>
        </div>
    }

    return <> <div>
        {renderMobileVersion()}
    </div>
    </>
};