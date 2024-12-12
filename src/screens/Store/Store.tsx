import _, { debounce } from "lodash";
import React, { useState, useEffect } from 'react'
import './Store.css'
import { CImage } from "@coreui/react";
import { config } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from '../../store/hooks';
import { isMobileView } from "../../utils";
import StoreWebView from "./View/Web/Store.Web";
import StoreMobileView from "./View/Mobile/Store.Mobile";
import BottomNav from "./View/BottomNav/BottomNav";

export default function Store() {

    const navigate = useNavigate();
    const [selectedProductCount, setSelectedProductCount] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const { storeName } = useParams();
    let fetchHomeRecentAddedProducts = useStoreActions(action => action.shop.fetchHomeRecentAddedProducts);
    let fetchCategoryList = useStoreActions(action => action.shop.fetchCategoryList);
    let storeInformation = useStoreState(state => state.shop.data);
    const { categoryList = [], bannerConfig } = storeInformation || {};
    const { products = [], currentPage = 1, isLoading = true } = _.get(storeInformation, storeName, {});
    const cartStore = useStoreState(state => state.cart.data);
    const updateCartStore = useStoreActions(action => action.cart.updateStore);
    const productPreviewStore = useStoreState(state => state.productPreview.data);
    const updateProductPreviewStore = useStoreActions(action => action.productPreview.updateStore);
    const { products: cartProducts } = cartStore;
    const { isPreviewEnabled = false } = productPreviewStore;
    const sidebarShow = useStoreState((state) => state.navBar.data.sidebarShow);
    const updateState = useStoreActions((state) => state.navBar.updateState);
    const updateMetaStoreInfo = useStoreActions((state) => state.metaData.updateStore);
    const fetchStoreInfo = useStoreActions(action => action.shop.fetchStoreInfo);

    let { enable, list = [] } = _.get(storeInformation, 'storeInformation.bannerConfig') || {};

    if (!enable) {
        list = [config.DASHBOARD]
    }
    list = list.filter(Boolean);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [isPaused, setIsPaused] = useState(false);

    const goToPrevious = () => {
        const prevIndex = (currentIndex - 1 + list.length) % list.length;
        setCurrentIndex(prevIndex);
        setIsPaused(true); // Pause slideshow when manually navigating
    };

    const goToNext = () => {
        const nextIndex = (currentIndex + 1) % list.length;
        setCurrentIndex(nextIndex);
        setIsPaused(true); // Pause slideshow when manually navigating
    };

    useEffect(() => {
        let intervalId;
        if (!isPaused) {
            intervalId = setInterval(() => {
                const nextIndex = (currentIndex + 1) % list.length;
                setCurrentIndex(nextIndex);
            }, 3000); // Change image every 3 seconds (adjust as needed)
        }

        return () => clearInterval(intervalId);
    }, [currentIndex, isPaused, list.length]);

    const handlePause = () => {
        setIsPaused(true);
    };

    const [chosenCategory, setChosenCategory] = useState([""]);


    const updateChosenCategory = (categoryId) => {

        let updatedCategoryList = chosenCategory;
        if (chosenCategory.includes(categoryId)) {
            updatedCategoryList = updatedCategoryList.filter(item => item !== categoryId)
        } else {
            updatedCategoryList = _.uniq([...updatedCategoryList, categoryId]);
        }

        setChosenCategory([categoryId])
    }

    useEffect(() => {
        updateMetaStoreInfo({ storeBasePath: `${window.location.pathname}` })
        updateProductPreviewStore({ isPreviewEnabled: false });
        fetchHomeRecentAddedProducts({ storeName, loadedProducts: products, currentPage, category: _.get(chosenCategory, `[0]`) });
        fetchCategoryList();
        fetchStoreInfo({ storeName })
    }, [])


    const delayedAPICall = debounce(() => fetchHomeRecentAddedProducts({ storeName, loadedProducts: [], currentPage: 1, searchText: searchTerm, category: _.get(chosenCategory, `[0]`) }), 1000);
    useEffect(() => {
        delayedAPICall(searchTerm);
        return delayedAPICall.cancel;
    }, [searchTerm, chosenCategory]);


    const addToCart = (payload) => {
        const {
            images,
            orderDetails,
            price,
            productName,
            discountPrice,
            _id: productId,
            store: storeId
        } = payload;

        updateProductPreviewStore({
            isPreviewEnabled: true,
            images, orderDetails, price, productName, discountPrice, productId,
            storeId
        });

        navigate("/store/preview", {
            state: {
                productPreviewStore: {
                    isPreviewEnabled: true,
                    images, orderDetails, price, productName, discountPrice, productId,
                    storeId
                },
                storeName
            }
        });

    }

    const cancelAddCart = () => {
        updateProductPreviewStore({ isPreviewEnabled: false });
        updateMetaStoreInfo({ storeBasePath: `${window.location.pathname}` })
    }

    const renderOffer = () => {
        return <div className="textCenter">
            <span> <CImage align="center" src={config.Ellipse} height={140} /></span>
            <br></br>
            <span>   Maximum Offers</span>
        </div>
    }

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

    return <div>
        {
            isMobileView() ?
                <StoreMobileView
                    isPreviewEnabled={isPreviewEnabled}
                    cancelAddCart={cancelAddCart}
                    updateState={updateState}
                    sidebarShow={sidebarShow}
                    addToCart={addToCart}
                    storeName={storeName}
                    BottomNav={BottomNav}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    categoryList={categoryList}
                    selectedFilterOptions={chosenCategory}
                    updateChosenCategory={updateChosenCategory}
                />
                :
                <StoreWebView
                    storeName={storeName}
                    goToCart={goToCart}
                    addToCart={addToCart}
                    renderOffer={renderOffer}
                    list={list}
                    currentIndex={currentIndex}
                    goToNext={goToNext}
                    goToPrevious={goToPrevious}
                    handlePause={handlePause}
                />
        }
    </div>

};