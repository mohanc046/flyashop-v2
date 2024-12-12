import React, { Fragment } from 'react';

import "../ProductList/style.css"

import { AppSidebar, AppFooter } from '../../components/index'

import { useNavigate } from "react-router-dom";

import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { isImageUrl, isMobileView } from '../../utils';

import CustomHeader from '../../components/CustomHeader';

import './index.css';
import { config } from '../../config';
import VideoComponent from '../../components/VideoComponent/VideoComponent';

export default function ProductPreview() {

    const navigate = useNavigate();

    const navigateToOrderDetails = () => {
        return navigate('/order')
    }

    const renderWebUI = () => {
        return <>
            demo
        </>
    }

    const renderPricingCardUI = () => {
        return <Fragment>
            <div className="mobileOrderLayout">
                <div className='subSectionMobileLayout'>
                    <PricingCard />
                </div>
            </div>
        </Fragment>
    }

    const renderMobileUI = (payload) => {

        const {
            image = "https://firebasestorage.googleapis.com/v0/b/e-commerce-e9849.appspot.com/o/tecoh%2Fd112fbff-eaf7-4dbf-9386-9d0db59e0dfe_file_example_MP4_480_1_5MG.mp4?alt=media&token=68fddbe8-b5a7-4971-b1aa-305c6f53f389",
            productName = "Product Title",
            productDescription = "A sentence or two of what the product is about. ",
            pricing = "$29.99",
            otherInfo = [
                {
                    title: "Add Specification",
                    description: "The ErgoComfort Office Chair is designed for maximum comfort and support during long hours of work or study. This chair combines ergonomic features with a stylish design, making it a perfect addition to any office or home workspace."
                },
                {
                    title: "Order Details",
                    description: "If you have any questions or need assistance, please contact our customer support at support@yourstore.com."
                }
            ]
        } = payload || {};

        return <div>

            <AppSidebar />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">

                <CustomHeader heading={"Preview"} leftNavIcon={faAngleLeft} />

                <div className='parentPreviewContainer'>

                    {/* Image preview */}
                    <div className='previewImageContainer' >
                        {
                            isImageUrl(image) ?
                                <img className='previewImage' src={image} /> :
                                <VideoComponent src={image} styles={{ borderRadius: 8 }} showControls autoPlay loop muted />
                        }
                    </div>

                    {/* Product title And description */}
                    <div className='productDetailsContainer'>
                        <div className='productTitleLabel'>{productName}</div>
                        <div className='productDescriptionLabel'>{productDescription}</div>
                        <div className='productPricingLabel'>{pricing}</div>
                    </div>

                    {otherInfo.map(item => <div className='previewInfoContainer'>
                        <div className='previewInfoLeftContainer'>
                            <img src={config.PREVIEW_CIRCLE_ICON} />
                        </div>
                        <div className='previewInfoRightContainer'>
                            <div className='previewHeaderLabel'>{item.title}</div>
                            <div className='previewDescriptionLabel'>{item.description}</div>
                        </div>
                    </div>)}

                </div>


                <AppFooter
                    topLevelButtonText={"START 14 DAYS FREE TRAIL"}
                    topLevelButtonAction={() => navigate(-1)}
                    secondaryButtonText={"GO PREMIUM"}
                    secondaryButtonAction={() => navigate('/pricing-list')}
                />
            </div>
        </div>
    }

    return <>
        {
            isMobileView() ? renderMobileUI() : renderWebUI()
        }
    </>
}