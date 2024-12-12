import { useRef } from 'react';
import { CImage } from "@coreui/react";
import { faArrowLeft, faEllipsisV, faTrash, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faBell  } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React from 'react'
import { config } from "../../config";
import './UserCart.css'
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from '../../store/hooks';
import { getFormattedCurrency, isMobileView } from "../../utils";
import { AppFooter } from "../../components";
import Address from './addressTile';
import ImgOrVideoRenderer from "../../components/ImgOrVideoRenderer/ImgOrVideoRenderer";
import { FIXED_VALUES } from '../../utils/constants';

export default function Cart() {

    let loginStoreDetails = useStoreState(state => state.user);

    const { authToken = null } = loginStoreDetails.data;

    const cartStore = useStoreState(state => state.cart.data);

    const { products: cartProducts, shippingAddress } = cartStore;

    const shippingAddressRef = useRef(null);

    const isValidShippingRef = useRef(false);

    const navigate = useNavigate();

    const updateCartStore = useStoreActions(action => action.cart.updateStore);

    const resetLoginStore = useStoreActions(action => action.login.resetStore);

    const resetShopStore = useStoreActions(action => action.shop.resetStore);

    const placeOrder = useStoreActions(action => action.cart.placeOrder);

    const metaData = useStoreState(action => action.metaData.data);

    const updateProductPreviewStore = useStoreActions(action => action.productPreview.updateStore);

    const setShippingAddressInfo = (address) => {

        shippingAddressRef.current = address

    }

    const setIsValidShippingAddressInfo = (status) => {

        isValidShippingRef.current = status

    }

    const { storeBasePath = "" } = metaData || {};

    const getOrderSummary = (isDesktop = false) => {

        const deliveryConst = 6;

        const totalOrderCost = _.sum(cartProducts.map(item => item.price * item.quantity));

        const discountPrice = _.sum(cartProducts.map(item => item.discountPrice * item.quantity));

        const totalCostIncludingDelivery = totalOrderCost + deliveryConst - discountPrice;
        if (isDesktop) {
            return {
                Subtotal: totalOrderCost,
                "Delivery Fee": deliveryConst,
                Total: totalCostIncludingDelivery,
                DiscountPrice: discountPrice
            }
        }

        return [
            { label: "Order", value: `${totalOrderCost}` },
            { label: "Delivery", value: `${deliveryConst}` },
            { label: "DiscountPrice", value: ` - ${discountPrice}` },
            { label: "Total", value: `${totalCostIncludingDelivery}` }
        ]

    }

    const incrementProductQuantityByOne = (purchaseProductInfo) => {

        const { productId, quantity } = purchaseProductInfo;

        let updatedPurchaseCartInfo = cartProducts.map(item => {
            if (item.productId === productId) {
                return {
                    ...item,
                    quantity: quantity + 1
                }

            }
            return item
        })

        updateCartStore({ products: updatedPurchaseCartInfo })

    }

    const decrementProductQuantityByOne = (purchaseProductInfo) => {

        const { productId, quantity } = purchaseProductInfo;

        let updatedPurchaseCartInfo = cartProducts.map(item => {
            if (item.productId === productId) {
                return {
                    ...item,
                    quantity: quantity - 1
                }

            }
            return item
        })

        let validPurchaseProducts = _.filter(updatedPurchaseCartInfo, item => item.quantity > 0)

        updateCartStore({ products: validPurchaseProducts })
    }

    const renderDesktopCartCard = (payload) => {
        const { images, price, quantity, productName, productId, productSize = "Medium", productColor = "Red" } = payload;
        return <div className="boxOrderSmall">
            <div>
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
                        <span className="FONT12 description" ><span className="label">Size:</span> {productSize}</span>
                        <span className="FONT12 description" ><span className="label">Color:</span> {productColor}</span>
                        <div className="BOLD-TEXT price">{getFormattedCurrency(price)}</div>
                    </div>
                    <div className="d-flex flex-column justify-content-between">
                        <a className="editTagProduct flexEnd" onClick={() => { }}><FontAwesomeIcon color="#1B2028" icon={faTrash} fill="#FF3333" /></a>
                        <div>
                            <button className="greyColor addPaymentUI">
                                <span onClick={() => decrementProductQuantityByOne(payload)}>-</span>
                                {quantity}
                                <span onClick={() => incrementProductQuantityByOne(payload)}>+</span>
                            </button></div>
                    </div>
                </div>
            </div>
        </div>
    }

    const OrderBreakDownDesktop = () => {
        const orderSummary = getOrderSummary(true);
        return (
            <div>
                <div className="orderSummary">
                    <div className="BOLD title">Order Summary</div>
                    <div className="flex spaceBetween marginBottom2">
                        <span className="FONT13 label">Subtotal</span>
                        <span className="BOLD FONT13 value">{getFormattedCurrency(orderSummary["Subtotal"])}</span>
                    </div>
                    <div className="flex spaceBetween marginBottom2">
                        <span className="FONT13 label">Discount</span>
                        <span className="BOLD FONT13 value pinkFont">{getFormattedCurrency(-orderSummary['DiscountPrice'])}</span>
                    </div>
                    <div className="flex spaceBetween marginBottom2">
                        <span className="FONT13 label">Delivery Fee</span>
                        <span className="BOLD FONT13 value">{getFormattedCurrency(orderSummary["Delivery Fee"])}</span>
                    </div>

                    <div className="offers-container">
                        <input placeholder="Add Code"></input>
                        <button className="btn btn-dark"> Apply</button>
                    </div>
                    <hr />
                    <div className="flex spaceBetween marginBottom2">
                        <span className="FONT13 label">Total</span>
                        <span className="BOLD FONT13 value">{getFormattedCurrency(orderSummary["Total"])}</span>
                    </div>
                    <p className="delivery-time">Average delivery time: <span className="value">3-5 days</span></p>
                    <button className="btn btn-primary primary-color" onClick={() => {

                        if (getCheckOutIsDisabled()) return

                        updateCartStore({ shippingAddress: shippingAddressRef.current });

                        if (authToken) {
                            return navigate('/payment');
                        }
                        updateProductPreviewStore({ isPreviewEnabled: false });
                        resetLoginStore();
                        resetShopStore();
                        navigate('/login/user');
                    }} >Continue<FontAwesomeIcon color="#1B2028" icon={faArrowRight} /></button>
                </div>
            </div>
        )
    }

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
                <div className="cart-desktop">
                    <h4 className="title">Your cart</h4>
                    <div className="d-flex">
                        <div className="cart-desktop-container">
                            <div className='list'>
                                {
                                    cartProducts?.map((item, index) => {
                                        return (<>
                                            {index > 0 && <hr />}
                                            {renderDesktopCartCard(item)}
                                        </>)
                                    })
                                }
                            </div>

                            <div className='order-summary-cart-desktop-container '>
                                {
                                    cartProducts?.length > 0 ? <OrderBreakDownDesktop /> : <EmptyScreen />
                                }
                            </div>
                            
                        </div>

                        <div className="summary" style={{ marginLeft: 20 }}>
                            <Address
                                shippingAddress={shippingAddress}
                                initialState={shippingAddressRef.current}
                                setShippingAddress={setShippingAddressInfo}
                                setIsValidShippingAddressInfo={setIsValidShippingAddressInfo}
                            />
                        </div>
                    </div>

            </div>
            <AppFooter isImage={true} />
        </div>
        )
    }

    const renderSmallBox = (payload) => {
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
                            <span onClick={() => decrementProductQuantityByOne(payload)}>-</span>
                            {quantity}
                            <span onClick={() => incrementProductQuantityByOne(payload)}>+</span>
                        </button></div>
                </div>
            </div>
        </div>
    }

    const getCheckOutIsDisabled = () => {

        return !isValidShippingRef.current
    }


    const OrderBreakDown = ({ }) => (
        <div>
                <div className="offers-container">
                    <span>Offers</span>
                    <input placeholder="Add Code"></input>
                </div>

            <div className="orderSummary">
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
            <br></br>   <br></br>

            <Address
                shippingAddress={shippingAddress}
                initialState={shippingAddressRef.current}
                setShippingAddress={setShippingAddressInfo}
                setIsValidShippingAddressInfo={setIsValidShippingAddressInfo}
            />

            <div>
                <button onClick={() => {

                    if (getCheckOutIsDisabled()) return

                    updateCartStore({ shippingAddress: shippingAddressRef.current });

                    if (authToken) {
                        return navigate('/payment');
                    }
                    updateProductPreviewStore({ isPreviewEnabled: false });
                    resetLoginStore();
                    resetShopStore();
                    navigate('/login/user');
                }}
                    className="primary-color button FORT12 orderButton">
                    Check Out
                </button>
            </div>
        </div>
    )

    const renderMobileVersion = () => {
        return <div>
            <div className="header-mob-layout spaceBetween">
                <div><FontAwesomeIcon onClick={() => {
                    if (storeBasePath) {

                        updateProductPreviewStore({ isPreviewEnabled: false });

                        return window.location.replace(storeBasePath)
                    }

                    navigate(-1)

                }} 
                icon={faArrowLeft} /></div>
                <div className="BOLD FONT18">My Cart</div>
                <div><FontAwesomeIcon icon={faBell} /></div>
            </div>
            <br/>
            <div className="shop-mob-layout">
                <div className="commonPadding">
                    {
                        cartProducts?.map(item => renderSmallBox(item))
                    }
                </div>
                {
                    cartProducts?.length > 0 ? <OrderBreakDown /> : <EmptyScreen />
                }
            </div>
        </div>
    }

    return <> <div style={{height: '100%'}}>
        {isMobileView() ? renderMobileVersion() : renderDesktopVersion()}
    </div>
    </>
};

export const EmptyScreen = ({ }) => {
    return (
        <div style={{
            backgroundColor: 'white',
            textAlign: 'center',
            padding: 20,
            paddingTop: 50
        }}>
            <h3>{"No records found"}</h3>
        </div>
    )
}