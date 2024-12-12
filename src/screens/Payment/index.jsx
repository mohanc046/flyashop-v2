import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements, } from '@stripe/react-stripe-js';
import { CheckoutForm } from '../../components/Payment/CheckoutForm';
import { getFormattedCurrency, isMobileView } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBell, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import CustomHeader from '../../components/CustomHeader';
import { useStoreState } from '../../store/hooks';
import _ from 'lodash';
import { CImage } from '@coreui/react';
import { config } from '../../config';
import { AppFooter } from '../../components';
import ImgOrVideoRenderer from "../../components/ImgOrVideoRenderer/ImgOrVideoRenderer";

import "./index.css";

const options = {
    mode: 'payment',
    amount: 1000,
    currency: 'sgd',
    // Fully customizable with appearance API.
    appearance: {
        /*...*/
    },
};

const Checkout = (props) => {

    const cartStore = useStoreState(state => state.cart.data);

    const { products: cartProducts } = cartStore;

    const renderMobileHeader = () => {
        return <div>
            <CustomHeader heading={"Payment"} leftNavIcon={faArrowLeft} />
        </div>
    }

    const getOrderSummary = () => {

        const deliveryConst = 6;

        const totalOrderCost = _.sum(cartProducts.map(item => item.price * item.quantity));

        const totalCostIncludingDelivery = totalOrderCost + deliveryConst;

        return [
            { label: "Order", value: `${totalOrderCost}` },
            { label: "Delivery", value: `${deliveryConst}` },
            { label: "Total", value: `${totalCostIncludingDelivery}` }
        ]

    }


    const renderOrderSummary = () => {
        return <div className="orderSummary">
            <div className="BOLD title">Order Summary</div>
            <hr></hr>
            {
                getOrderSummary().map((each) => {
                    return <div className="flex spaceBetween marginBottom2">
                        <span className="FONT13 label">{each.label}</span>
                        <span className="BOLD FONT13 value">{getFormattedCurrency(each.value)}</span>
                    </div>
                })
            }
        </div>
    }

    const renderMobileProductView = (payload) => {

        const { images, price, quantity, productName, productId } = payload;

        return <div className="boxOrderSmall">
            <div className="flex1">
                <ImgOrVideoRenderer
                    src={_.get(images, '[0]')}
                    width={108}
                    height={105}
                    description={"Description of the image"}
                    videoStyles={{ background: "#000", borderRadius: 10 }}
                />
            </div>
            <div className="flex2">
                <div className="space-between flex2 content">
                    <div className="flex flexCol boxMargin">
                        <span className="BOLD_SM name">{productName}</span>
                        <span className="FONT12 description" >Size: 7.60 fl oz/ 225 ml</span>
                        <div className="BOLD-TEXT price">{getFormattedCurrency(price)}</div>
                    </div>
                    <a className="editTagProduct flexEnd" onClick={() => { }}><FontAwesomeIcon color="#1B2028" icon={faEllipsisV} /></a>
                </div>
                <div className="d-flex justify-content-end">
                    <div>
                        <button className="greenColor addPaymentUI">
                            <span>-</span>{quantity}<span>+</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }


    const renderMobileViewProducts = () => {
        return <div className="shop-mob-layout">
            <div className="commonPadding">
                {
                    _.map(cartProducts, (item) => renderMobileProductView(item))
                }
                {
                    renderOrderSummary()
                }
            </div>
        </div>
    }


    const renderMobileView = () => {
        return <div>

            {renderMobileHeader()}


            {renderMobileViewProducts()}


            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </div>
    }

    const stripePromise = loadStripe("pk_test_51O5ovtCPNe8k6UaKjiqkq4dLw5rK7amMjcp6jVba9k0tpsSJrtr2MHC1uyeyaXvqZYQczZwo623CZrJ6RmL5sR1D00I4csBtKg");

    const renderDesktopVersion = () => {
        return (
            <div className="wrapper d-flex flex-column min-vh-100 bg-light" style={{ paddingBottom: 100 }}>
                <div className="header-user">
                    <div>   <CImage align="center" src={config.USER_LOGO} height={50} /></div>
                    <div className="alignCenter">
                        <span className="padHead">Home</span>
                        <span className="padHead">About</span>
                        <span className="padHead">Products</span>
                        <span className="padHead">Contacts</span>
                    </div>
                    <div className="alignCenter">
                        <CImage align="center" src={config.DASH_BUTTON} height={40} />
                    </div>
                </div>
                <div className="checkout-desktop">
                    {renderMobileViewProducts()}

                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm />
                    </Elements>

                </div>
                <AppFooter isImage={true} />
            </div>
        )
    }

    return (<>

        {
            isMobileView() ?
                renderMobileView() :
                renderDesktopVersion()
        }
    </>)

}

export default Checkout