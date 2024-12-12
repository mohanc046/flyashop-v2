import React, { useState } from 'react'

import { Select } from "antd";

import { Rating } from "react-simple-star-rating";

import ImgOrVideoRenderer from "../../components/ImgOrVideoRenderer/ImgOrVideoRenderer";

import { useLocation, useNavigate } from "react-router-dom";

import { AppFooter } from '../../components';

import { Header } from '../Store/View/Web/Store.Web';

import { useStoreActions, useStoreState } from '../../store/hooks';

import VideoComponent from '../../components/VideoComponent/VideoComponent';

import { getFormattedCurrency, isImageUrl, isMobileView } from '../../utils';

import _ from 'lodash';

import { StoreProductPreviewHeader } from '../Store/View/Mobile/Store.Mobile';

import './storeProductPreview.css';

export const StoreProductPreviewScreen = () => {

    const navigate = useNavigate();

    const { state } = useLocation();

    const { productPreviewStore, storeName } = state || {};

    const { isPreviewEnabled = false } = productPreviewStore;

    const [selectedProductCount, setSelectedProductCount] = useState(1);

    const cartStore = useStoreState(state => state.cart.data);

    const { products: cartProducts } = cartStore;

    const updateCartStore = useStoreActions(action => action.cart.updateStore);

    const updateProductPreviewStore = useStoreActions(action => action.productPreview.updateStore);

    const updateMetaStoreInfo = useStoreActions((state) => state.metaData.updateStore);

    const updateState = useStoreActions((state) => state.navBar.updateState);

    const sidebarShow = useStoreState((state) => state.navBar.data.sidebarShow);

    const goToCart = () => {
        const previewProductInfo = { ...productPreviewStore, quantity: selectedProductCount };
        let filteredProductsInfo = cartProducts.filter(item => item.productId !== previewProductInfo.productId);
        updateCartStore({
            products: [
                previewProductInfo,
                ...filteredProductsInfo
            ]
        });
        navigate("/user-cart");
    }

    const incrementProductCount = () => {
        setSelectedProductCount(prevState => prevState + 1);
    }
    const decrementProductCount = () => {
        if (selectedProductCount > 0)
            setSelectedProductCount(prevState => prevState - 1);
    }

    const cancelAddCart = () => {
        updateProductPreviewStore({ isPreviewEnabled: false });
        updateMetaStoreInfo({ storeBasePath: `${window.location.pathname}` })
    }

    const renderMobileView = () => {

        const { price = 0, discountPrice = 0 } = productPreviewStore || {}

        const productPreviewBanner = _.get(productPreviewStore, 'images.[0]');

        const isBannerImage = isImageUrl(productPreviewBanner);

        const discountedProductPrice = price - discountPrice;

        return <div>
            <StoreProductPreviewHeader
                isPreviewEnabled={isPreviewEnabled}
                cancelAddCart={cancelAddCart}
                updateState={updateState}
                sidebarShow={sidebarShow}
            />
            <div className="preview-contrainer">
                <div className="preview-image">
                    {
                        isBannerImage ?
                            <img src={productPreviewBanner}></img> :
                            <VideoComponent src={productPreviewBanner} showControls autoPlay loop muted />
                    }
                </div>
                <div className="preview-footer">
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="name">{productPreviewStore.productName}</span>
                        <Rating size={20} initialValue={productPreviewStore.rating || 4} readonly fillColor="#161616" />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="description">{productPreviewStore.description || "Size: 7.60 fl oz/ 225 ml"}</span>
                        <span className="review-count">({productPreviewStore.reviewsCount || 150} reviews)</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center price-container">

                        <div className='mobileViewProductPreviewContainer'>
                            <span className="price">{getFormattedCurrency(discountedProductPrice)}</span>
                            <span className="productPrice">{getFormattedCurrency(productPreviewStore.price)}</span>
                        </div>

                        <div className="counter">
                            <span onClick={decrementProductCount}>-</span>
                            {selectedProductCount}
                            <span onClick={incrementProductCount}>+</span>
                        </div>
                    </div>
                    <div className="btn-container d-flex">
                        <button disabled={!selectedProductCount} className="btn button primary-color btn-primary" onClick={goToCart}>Add to cart</button>
                        <button disabled={!selectedProductCount} className="btn button primary-color btn-primary" onClick={goToCart}>Buy</button>
                    </div>
                </div>
            </div>
        </div>

    }


    const renderDesktopView = () => {

        const { price = 0, discountPrice = 0 } = productPreviewStore || {};

        const discountedProductPrice = price - discountPrice;

        const percentage =  ((price - discountPrice) / price) * 100;

        const discountPercentage = _.ceil(100 - percentage);

        return <div className="wrapper d-flex flex-column min-vh-100 bg-light" style={{ paddingBottom: 100 }}>
            <Header />
            <div className="preview-desktop">
                <div className="nav-info">
                    <span className="item">Home</span> {">"}
                    <span className="item">Shop</span> {">"}
                    <span className="item">Men</span> {">"}
                    <span className="item active">{productPreviewStore.productName}</span>
                </div>
                <div className="details d-flex">
                    <div className="img-container">
                        <ImgOrVideoRenderer
                            src={productPreviewStore.images[0]}
                            className={"preview-image active"}
                            width={152}
                            height={167}
                            videoStyles={{ background: "#000", borderRadius: 20 }}
                        />
                        <ImgOrVideoRenderer
                            src={productPreviewStore.images[0]}
                            className={"preview-image"}
                            width={152}
                            height={167}
                            videoStyles={{ background: "#000", borderRadius: 20 }}
                        />
                    </div>
                    <div className="banner-image">
                        <ImgOrVideoRenderer
                            src={productPreviewStore.images[0]}
                            width={450}
                            height={530}
                            videoStyles={{ background: "#000" }}
                        />
                    </div>
                    <div className="content">
                        <h4 className="name">{productPreviewStore.productName}</h4>
                        <div className="ratings d-flex align-item-center">
                            <Rating size={20} initialValue={productPreviewStore.rating || 4} readonly fillColor="#FFC633" /><span className="label">4 / 5</span>
                        </div>
                        <div className="price-container">
                            <span className="discoounted-price">{getFormattedCurrency(discountedProductPrice)}</span>
                            <span className="price">{getFormattedCurrency(productPreviewStore.price)}</span>
                            <div className="discount-percent">
                                <span>{`-${discountPercentage}%`}</span>
                            </div>
                        </div>
                        <p className="description">{productPreviewStore.description || "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style."}</p>
                        <hr />
                        <div className="colors">
                            <span className="title">Select Color</span>
                            <Select
                                options={[
                                    { label: "Red", value: "red" },
                                    { label: "Blue", value: "blue" },
                                    { label: "Green", value: "green" },
                                ]}
                                style={{ width: '200px' }}
                                autoClearSearchValue={false}
                            />
                        </div>
                        <hr />
                        <div className="size">
                            <span className="title">Select Size</span>
                            <Select
                                options={[
                                    { label: "Small", value: "small" },
                                    { label: "Medium", value: "medium" },
                                    { label: "Large", value: "large" },
                                ]}
                                style={{ width: '200px' }}
                                autoClearSearchValue={false}
                            />
                        </div>
                        <hr />
                        <div className="btn-grp">
                            <button className="btn btn-outline" onClick={goToCart}>Add To Cart</button>
                            <button className="btn btn-primary primary-color" onClick={goToCart}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter isImage={true} />
        </div>
    }

    return isMobileView() ? renderMobileView() : renderDesktopView()
}