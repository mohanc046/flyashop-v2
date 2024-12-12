import _ from "lodash";
import React from 'react'
import { AppFooter } from '../../../../components/index'
import './Store.Web.css'
import { CImage } from "@coreui/react";
import { config } from "../../../../config";
import { Select } from "antd";
import { Rating } from 'react-simple-star-rating'
import ImgOrVideoRenderer from "../../../../components/ImgOrVideoRenderer/ImgOrVideoRenderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { HorizontalProductView } from "../../../../components/HorizontalProductView";


const StoreWebView = ({
    goToCart,
    renderOffer,
    addToCart,
    storeName,
    list,
    currentIndex,
    goToNext,
    goToPrevious,
    handlePause
}) => (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light" style={{ paddingBottom: 100 }}>
        <Header />
        <Banner goToNext={goToNext}
            goToPrevious={goToPrevious}
            handlePause={handlePause} list={list} currentIndex={currentIndex} />
        <OffersContainer renderOffer={renderOffer} />
        <ProductListing storeName={storeName} goToCart={goToCart} addToCart={addToCart} />
        <AppFooter isImage={true} />
    </div>
)

export default StoreWebView;

export const Header = ({ }) => (
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
)

const Banner = ({ goToNext, goToPrevious, handlePause, currentIndex, list }) => (
    <div className=""
        style={{
            backgroundImage: `url(${list[currentIndex]})`,
            height: '435px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top',
            position: 'relative',
            transition: 'left 0.5s ease-in-out',
        }}
        onClick={handlePause}
    >
        <div className="defaultHomeScreenBannerContainer">
            <h3 className="BOLD dashTextPad dashPadLeft">Latest Trends <br></br> Fashion Collection</h3>
            <div className="FONT13 dashPadLeft">Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br></br> Lorem Ipsum has been the industry's standard.</div>
        </div>

        <div className="arrow left-arrow" style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            cursor: "pointer",
            transform: 'translateY(-50%)',
        }}
            onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
            }}
        >
            <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="arrow right-arrow" style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: "pointer"
        }}
            onClick={(e) => {
                e.stopPropagation();
                goToNext();
            }}
        >
            <FontAwesomeIcon icon={faChevronRight} />
        </div>
    </div>
)

const OffersContainer = ({ renderOffer }) => (
    <div className="sideLayout">
        <div className="productOffersLayout">
            {renderOffer()}
            {renderOffer()}
            {renderOffer()}
        </div>
    </div>
)

const ProductListing = ({ storeName, addToCart }) => (
    <div className="defaultHomeScreenBannerContainer">
        <HorizontalProductView
            storeName={storeName}
            category={'RECENTLY ADDED VIDEOS'}
            scrollId={'scrollableDiv1'}
            addToCart={addToCart}
        />
        <HorizontalProductView
            storeName={storeName}
            category={'MOST VIEWED VIDEOS'}
            scrollId={'scrollableDiv2'}
            addToCart={addToCart}
        />
    </div>
)