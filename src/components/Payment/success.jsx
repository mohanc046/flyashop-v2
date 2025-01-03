import React from 'react';

import { config } from '../../config';

import './success.css';

import { useNavigate, useParams } from "react-router-dom";

const PaymentSuccessCard = (props) => {

    const navigate = useNavigate();

    const { storeId = "" } = useParams();

    const { orderId = "20287352341" } = props;

    return (

        <div className='paymentSuccessPartnerContainer'>

            <div className='paymentSuccessContainer'>

                <div className='successTickContainer'>

                    <img className='successTickMark' src={config.PAYMENT_SUCCESS_TICK_ICON} />

                </div>

                <h1 className='yourOrderBookingLabel'>You done your booking.</h1>

                <p className='yourOrderBookingDescriptionLabel' >{`You can track your shipment with tracking ID #${orderId}`}</p>

                <button onClick={() => navigate(`/user/order-list/${storeId}`)} className='button trackOrderButtonContainer'>Track Shipment</button>

                <button onClick={() => navigate(`/user/order-list/${storeId}`)} className='button continueShoppingButtonContainer'>Continue Shopping</button>

            </div>

        </div>

    )
}

export default PaymentSuccessCard;