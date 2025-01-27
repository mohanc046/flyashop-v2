import React, { useState } from 'react';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import PRODUCT from '../../utils/productInfo';

import { getServiceURL } from '../../utils';

import { useStoreActions, useStoreState } from '../../store/hooks';

import _ from 'lodash';

import axios from "axios";

import { useNavigate } from "react-router-dom";

import './checkOutForm.css';

export const CheckoutForm = () => {

  const stripe = useStripe();

  const elements = useElements();

  const navigate = useNavigate();

  const cartStore = useStoreState(state => state.cart.data);

  const { products: cartProducts, shippingAddress } = cartStore;

  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const [emailInput, setEmailInput] = useState<string>('');

  const [isLoading, setLoaderStatus] = useState<Boolean>(false);

  let updateUserStore = useStoreActions(action => action.user.updateStore);

  const getTotalOrderCost = () => {

    const deliveryConst = 6;

    const totalOrderCost = _.sum(cartProducts.map(item => item.price * item.quantity));

    const totalCostIncludingDelivery = totalOrderCost + deliveryConst;

    return totalCostIncludingDelivery

}

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    try{

    event.preventDefault();

    if (elements == null || stripe == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const response = await elements.submit();

    const { error: submitError } = response;
    if (submitError?.message) {
      // Show error to your customer
      setErrorMessage(submitError.message);
      return;
    }

    let URL = getServiceURL();


    setLoaderStatus(true);

    const storeId = _.get(cartProducts, '[0].storeId');

    // Create the PaymentIntent and obtain clientSecret from your server endpoint
    const res = await axios({
      method: 'post',
      baseURL: `${URL}`,
      url: `/order/create`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        products: cartProducts,
        storeId,
        totalOrderCost: getTotalOrderCost(),
        addressInfo: shippingAddress
      }),
    });

    const { client_secret: clientSecret, authToken } = res.data;

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success/${storeId}`
      }
    });


    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {

      updateUserStore({ authToken });

      navigate('/user/order-list')
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }catch(error){}
  finally{
      setLoaderStatus(false)
  }
  };

  return (
    <form onSubmit={handleSubmit} className='px-4'>
      {/* <div className='mb-3'>
        <label htmlFor="email-input">Email</label>
        <div>
          <input value={emailInput} onChange={(e => setEmailInput(e.target.value))} type="email" id="email-input" placeholder='johndoe@gmail.com' className='p-3 w-full bg-[#fff] rounded-[5px] border border-[#e6e6e6] box-shadow-custom ' />
        </div>
      </div> */}
      <PaymentElement />
      <button
        type="submit" disabled={!stripe || !elements}
        className='primary-color button FORT12 orderButton paymentButtonContainer'>
        {(isLoading) ?
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          :
          <> Pay</>
        }
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};