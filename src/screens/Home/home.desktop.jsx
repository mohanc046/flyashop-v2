import React, { useEffect, Fragment, useState } from 'react';

import { AppSidebar, AppFooter, AppHeader } from '../../components/index'

import './home.css';

import { Toaster } from 'react-hot-toast';

import _ from 'lodash';

import { useStoreState, useStoreActions } from '../../store/hooks';

import { config } from '../../config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEye } from '@fortawesome/free-solid-svg-icons';

import VideoComponent from '../../components/VideoComponent/VideoComponent';

import { CSpinner } from '@coreui/react';

import { getFormattedPercentage } from '../../utils';

import { useNavigate } from 'react-router-dom';

import { Modal, notification } from 'antd';

import { isValid } from '../../utils/validation';

export const HomeDesktopUI = ({ userName, storeLink, greetings, storeName, addressInfo, storeId, updateStoreAddressInformation }) => {

    const [shopAddressInfo, setShopAddressInfo] = useState({
        doorNo: "",
        state: "",
        street: "",
        pinCode: ""
    })

    const [shopAddressErrorStatus, setShopAddressErrorStatus] = useState({
        doorNo: false,
        state: false,
        street: false,
        pinCode: false,
    })

    const [isModalOpen, setModalOpen] = useState(false)

    let dashboardDetails = useStoreState(state => state.adminOrder.data.dashboard);

    let updateModel = useStoreActions(action => action.adminOrder.updateModel);

    let changeOrderStatus = useStoreActions(action => action.adminOrder.changeOrderStatus);

    let updateState = useStoreActions(action => action.adminOrder.updateState);

    let handleCancel = useStoreActions(action => action.adminOrder.handleCancel);

    let fetchDashboardOrderDetails = useStoreActions(action => action.adminOrder.fetchDashboardOrderDetails);

    let fetchOrdersInHomeScreen = useStoreActions(action => action.adminOrder.fetchOrdersInHomeScreen);

    let updateStoreAddressInfo = useStoreActions(action => action.shop.updateStoreAddressInfo);

    let homePageOrders = useStoreState(state => state.adminOrder.data.homePageOrders);

    let data = useStoreState(state => state.adminOrder.data.dashboard);

    const { isFetch } = data;

    const { orderList = [], loaderStatus = true } = homePageOrders;

    const { totalSalesInfo, totalProductsCount = 0 , activeTabValue  } = dashboardDetails || {};

    const {
        totalSales = 0, totalOrderCount = 0, totalSalesCostPercentage = 0,
        totalSalesCountReceivedPercentage = 0, currentWeekSalesCount = 0
    } = totalSalesInfo || {};

    useEffect(() => {

        fetchDashboardOrderDetails({ storeName });

        fetchOrdersInHomeScreen({ categoryType: "PENDING", storeName, existingOrderList: [], currentPage: 1, itemPerPage: 4 });

        if (!_.isEmpty(addressInfo)) {

            setShopAddressInfo(addressInfo);

            let validationResult = {
                doorNo: false,
                state: false,
                street: false,
                pinCode: false,
            }

            _.forEach(addressInfo, (value, key) => {

                _.update(validationResult, key, () => isValid(key, value))

            });

            setShopAddressErrorStatus(validationResult)
        }

    }, [activeTabValue, addressInfo])

    const navigate = useNavigate();

    const showModal = (row, status) => updateModel({ row, status });

    const statsData = [
        {
            totalCount: 1093,
            label: "Total Visitors",
            icon: config.VISITORS_ICON,
            latestCount: 10.2,
            percentage: 1.01,
            isIncreased: true,
        },
        {
            totalCount: totalOrderCount,
            label: "Sales Received",
            icon: config.SALES_ICON,
            latestCount: currentWeekSalesCount,
            percentage: totalSalesCountReceivedPercentage,
            isIncreased: totalSalesCountReceivedPercentage > 0 ? true : false
        },
        {
            totalCount: totalProductsCount,
            label: "My Products ",
            icon: config.PRODUCTS_BAG_ICON,
            latestCount: 3.1,
            percentage: 0.49,
            isIncreased: true,
        },
        {
            totalCount: totalSales,
            label: "Total Sale",
            icon: config.BACK_REVERSE_ICON,
            latestCount: '',
            percentage: totalSalesCostPercentage,
            isIncreased: totalSalesCostPercentage > 0 ? true : false,
        },
    ]

    const renderStatsContainer = () => {
        return (
            <div className="stats-container">
                {
                    statsData.map(each => {
                        return (
                            <div className="stats-card">
                                <div className='top d-flex justify-content-between'>
                                    <div className="details">
                                        <h4 className='count'>{each.totalCount.toLocaleString()}</h4>
                                        <p className='label'>{each.label}</p>
                                    </div>
                                    <div className="img-container d-flex align-items-center justify-content-center">
                                        <img src={each.icon} alt="" className="icon" />
                                    </div>
                                </div>
                                <div className="bottom">
                                    <img src={each.isIncreased ? config.UP_RIGHT_ARROW_ICON : config.DOWN_LEFT_ARROW_ICON} alt="" className="icon" />
                                    <span className='count'>{each.latestCount}</span>
                                    <span className="percentage">{each.isIncreased ? "+" : ""}{getFormattedPercentage(each.percentage)}% this week</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const renderPopup = (payload) => {
        const { isModalOpen, remarks, message, fieldName, buttonName, trackingId = "", statusHistory = [], isLoaderEnabled } = payload;
        return <Modal title="Order Details" cancelText={"Close"} okText={buttonName} open={isModalOpen} onOk={() => changeOrderStatus(payload)} onCancel={handleCancel}>
            <Fragment>
                {isLoaderEnabled ? <div className='loaderContainer'>
                    <CSpinner color="secondary" />
                </div> : <div>
                    <div>
                        <h6 className='message-pop'>{message}</h6>
                        <div class="flex">
                            <label class="radio">
                                <input name={"decision"} type="radio" value={fieldName} onClick={(e) => { updateState({ decision: fieldName }) }} />
                                <span class="radio-custom"></span>
                                Yes
                            </label>
                        </div>
                    </div>
                    {
                        fieldName === "Add" ? <div>
                            <input className='tracking-input' placeholder='Enter Tracking Code' type="string" name="trackingId" value={trackingId} onChange={(e) => { updateState({ [e.target.name]: e.target.value }) }} ></input>
                        </div> : fieldName === "REJECTED" ? <div>
                            <textarea name='remarks' placeholder='Enter Remarks' onChange={(e) => { updateState({ [e.target.name]: e.target.value }) }}>
                                {remarks}
                            </textarea>
                        </div> : null
                    }
                </div>}
            </Fragment>
        </Modal>
    }

    const renderPendingOrders = () => {
        return (
            <div className="lists-container">
                <div className="top">
                    <span className='title'>Pending Orders ({orderList.length})</span>
                    <span className='action opacity-0'>See All</span>
                </div>
                {loaderStatus ?
                    <div className='loaderContainer'>
                        <CSpinner color="secondary" />
                    </div>
                    : (orderList && orderList.length === 0) ?
                        <div>No Records Found</div> : <div className="list">
                            {orderList.map(item => {
                                return <div className="list-card d-flex justify-content-between align-items-center">
                                    <div className='d-flex flex-2 align-items-center'>
                                        <div className="img-container">
                                            {
                                                item.isImage ?
                                                    <img src={item.image} alt='Product Image' /> :
                                                    <VideoComponent src={item.image} width={40} height={40} styles={{ background: "#000", borderRadius: 20 }} autoPlay loop muted />
                                            }
                                        </div>
                                        <div className="details d-flex flex-column webPendingOrderProductLabel">
                                            <div className='title'>{`${item.item}`} </div>
                                            <span className='secondary-text'>{item.timing}</span>
                                        </div>
                                    </div>
                                    <div className="actions actionButton">
                                        <span className="actions actionButton">
                                            <span className="reject-button" onClick={() => { 
                                                showModal(item, 'Reject')
                                                 }}>Reject</span>
                                            <button className="accept-button" onClick={() => { 
                                                showModal(item, 'Accept') 
                                                }}>Accept</button>
                                        </span>
                                    </div>
                                </div>
                            })
                            }</div>
                }
            </div>
        )
    }

    const getShopAddressFormRenderPayload = () => [
        {
            label: "Door No",
            name: 'doorNo',
            errorStatus: _.get(shopAddressErrorStatus, 'doorNo', false),
            value: _.get(shopAddressInfo, 'doorNo', ''),
            errorMessage: "Enter valid Door No."
        },
        {
            label: "Address 1 (street)",
            name: 'street',
            errorStatus: _.get(shopAddressErrorStatus, 'street', false),
            errorMessage: "Enter valid street name",
            value: _.get(shopAddressInfo, 'street', ''),
        },
        {
            label: "Address 2 (city and state)",
            name: 'state',
            errorStatus: _.get(shopAddressErrorStatus, 'state', false),
            errorMessage: "Enter valid state name",
            value: _.get(shopAddressInfo, 'state', ''),
        },
        {
            label: "Pin code",
            name: 'pinCode',
            errorStatus: _.get(shopAddressErrorStatus, 'pinCode', false),
            errorMessage: "Enter valid pin code",
            value: _.get(shopAddressInfo, 'pinCode', ''),
        }
    ]

    const onEditShopAddressDetails = (event) => {

        const { name, value: currentValue } = event.target;

        const validationResult = isValid(name, currentValue);

        setShopAddressInfo({ ...shopAddressInfo, [name]: currentValue })

        setShopAddressErrorStatus({ ...shopAddressErrorStatus, [name]: validationResult })

    }

    const updateAddressDetails = async () => {

        const validationResult = _.values(shopAddressErrorStatus);

        const isValidErrorStatus = _.every(validationResult, item => item === true);

        const addressValues = _.values(shopAddressInfo);

        const isValidAddress = _.every(addressValues, item => !_.isEmpty(item));

        if (isValidAddress && isValidErrorStatus) {

            await updateStoreAddressInfo({
                storeId,
                addressInfo: shopAddressInfo,
                setModalOpen,
                updateStoreAddressInformation
            });

        } else {

            notification.warn({ message: `Make sure valid address details are entered!` });

        }
    }

    const renderAddOrEditAddressPopup = () => {
        return <Modal title="Address Details" open={isModalOpen} onCancel={() => setModalOpen(false)} onOk={updateAddressDetails}>
            {
                getShopAddressFormRenderPayload().map(item => {
                    return <div className="shippingAddressInputOutContainer">
                        <input
                            key={item.label}
                            className="shippingAddressInputContainer"
                            name={item.name}
                            value={item.value}
                            placeholder={item.label}
                            onChange={(event) => onEditShopAddressDetails(event)}
                        />
                        {!_.isEmpty(item.value) && !item.errorStatus && <label className="validationErrorTextLabelContainer">{item.errorMessage}</label>}
                    </div>
                })
            }
        </Modal>
    }

    const renderQuickLinks = () => {

        const { doorNo, state, street, pinCode } = shopAddressInfo;

        const shopAddress = `${doorNo}, ${street}, ${state} - ${pinCode}`;

        return (
            <div className="lists-container">
                <div className="top">
                    <span className='title'>Quick Links</span>
                    <span className='action opacity-0'>Change</span>
                </div>
                <div className="list">
                    <div className="list-card d-flex justify-content-between align-items-center">
                        <div className='d-flex flex-2 align-items-center'>
                            <div className="check-container">
                                <img src={config.CHECK_CIRCLE_ICON} alt="" />
                            </div>
                            <div className="details d-flex flex-column">
                                <span className='title'>Add shop Address </span>
                                <span className='secondary-text'> {_.isEmpty(doorNo) ? `Shops with addresses build more trust` : shopAddress}</span>
                            </div>
                        </div>
                        <div className="actions">
                            <button onClick={() => setModalOpen(true)} className="btn btn-primary">Edit</button>
                        </div>
                    </div>
                    <div className="list-card d-flex justify-content-between align-items-center">
                        <div className='d-flex flex-2 align-items-center'>
                            <div className="check-container">
                                <img src={config.DOTTED_CIRCLE_ICON} alt="" />
                            </div>
                            <div className="details d-flex flex-column">
                                <span className='title'>Link your social media </span>
                                <span className='secondary-text'> Links social media helps 4 times more sales</span>
                            </div>
                        </div>
                        <div className="actions">
                            <button onClick={() => navigate('/user-plugins')} className="btn btn-primary">Link</button>
                        </div>
                    </div>
                    <div className="list-card d-flex justify-content-between align-items-center">
                        <div className='d-flex flex-2 align-items-center'>
                            <div className="check-container">
                                <img src={config.DOTTED_CIRCLE_ICON} alt="" />
                            </div>
                            <div className="details d-flex flex-column">
                                <span className='title'>Get a custom Domain </span>
                                <span className='secondary-text'> It helps you establish your brand and trust</span>
                            </div>
                        </div>
                        <div className="actions">
                            <button onClick={() => navigate('/user-plugins')} className="btn btn-primary">Get</button>
                        </div>
                    </div>
                    <div className="list-card d-flex justify-content-between align-items-center">
                        <div className='d-flex flex-2 align-items-center'>
                            <div className="check-container">
                                <img src={config.DOTTED_CIRCLE_ICON} alt="" />
                            </div>
                            <div className="details d-flex flex-column">
                                <span className='title'>Pick a plan </span>
                                <span className='secondary-text'> Edit more & add on your online shop</span>
                            </div>
                        </div>
                        <div className="actions">
                            <button onClick={() => navigate('/pricing-list')} className="btn btn-primary">Pick</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (<div className='whiteBgColor desktop'>
        <AppSidebar />
        {renderAddOrEditAddressPopup()}
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
            <AppHeader heading={greetings} />
            <div className={`body flex-grow-1 DefaultMarginBottom whiteBgColor`} style={{ padding: "28px", paddingRight: "10%" }}>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <br></br>
                <div className='d-flex align-items-center'><label className='welcomeUser'> {` Hi, ${userName}!`} </label><img height={14} width={14} src={config.SHAPE} /></div>
                <br></br>
                {renderPopup(data)}

                <div className='description FONT12 blackColorDash'>Your Store is Active Now. Customers can visit the following shop link and place their orders.</div>
                <br></br>
                <div className='url-div'>
                    <div className='urlContainer d-flex justify-content-between'>
                        <div className='circle-layout-link'>
                            <label className='urlShopLabel'>Shop Link : {storeLink}</label>
                            <div onClick={() => {
                                window.open(storeLink, '_blank');
                            }} className='visitButtonContainer'><label>Visit</label><FontAwesomeIcon color="#ffffff" icon={faEye} /></div>
                        </div>
                        <div className="share-container opacity-0">
                            <span>Share Via</span>
                            <div className="icons">
                                <img src={config.GOOGLE} alt="" />
                                <img src={config.FACEBOOK} alt="" />
                                <img src={config.APPLE} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="customize-container opacity-0">
                        <span className='line1'>Customize</span>
                        <span className='line2'>your online shop</span>
                    </div>
                </div>
                {renderStatsContainer()}
                <div className='d-flex justify-content-between'>
                    {renderPendingOrders()}
                    {renderQuickLinks()}
                </div>
            </div>
            <AppFooter />
        </div>
    </div>)

}