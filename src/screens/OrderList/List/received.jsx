import { useEffect, Fragment } from "react";

import { Modal } from 'antd';

import moment from "moment";

import { ArrowRightOutlined, HistoryOutlined } from "@ant-design/icons";

import '../orderList.css';

import { useNavigate } from "react-router-dom";

import InfiniteScroll from 'react-infinite-scroll-component';

import { v4 as uuidv4 } from 'uuid';

import { useStoreActions, useStoreState } from '../../../store/hooks';

import VideoComponent from "../../../components/VideoComponent/VideoComponent";
import { CSpinner } from "@coreui/react";

export const ReceivedList = ({
    storeName,
    scrollHeight = '400px',
    itemPerPage = 5,
    activeTabValue = "ALL", // active category
    showOrderStatus = false, // false when coming from Dashboard
    activeStatusTab = "All"
}) => {

    const scrollId = uuidv4();

    let fetchOrdersInHomeScreen = useStoreActions(action => action.adminOrder.fetchOrdersInHomeScreen);

    let changeOrderStatus = useStoreActions(action => action.adminOrder.changeOrderStatus);

    let updateModel = useStoreActions(action => action.adminOrder.updateModel);

    let updateState = useStoreActions(action => action.adminOrder.updateState);

    let handleCancel = useStoreActions(action => action.adminOrder.handleCancel);

    let homePageOrders = useStoreState(state => state.adminOrder.data.homePageOrders);

    let data = useStoreState(state => state.adminOrder.data.dashboard);

    /**
     * 
     * @param {*} createdAt 
     * @returns time // Ex: 2 days ago, 25mins ego
     */
    const getOrderCreatedTiming = (createdAt) => {
        if (!createdAt) {
            return '';
        }
        return moment(createdAt).format("DD MMM, YYYY, hh:mm A");
    }

    const {
        orderList = [],
        isLoaderEnabled = false,
        currentPage = 0,
        totalPages = 1
    } = homePageOrders;


    const next = () => {
        fetchOrdersInHomeScreen({
            storeName, existingOrderList: orderList,
            currentPage: currentPage + 1,
            itemPerPage,
            categoryType: activeTabValue,
            activeStatusTab
        });
    }

    const showModal = (row, status) => {
        updateModel({ row, status });
    }

    useEffect(() => {
        next()
    }, [storeName])

    useEffect(() => {
        fetchOrdersInHomeScreen({
            storeName, existingOrderList: orderList,
            currentPage: currentPage,
            itemPerPage,
            categoryType: activeTabValue,
            activeStatusTab
        });
    }, [activeTabValue])

    useEffect(() => {
        fetchOrdersInHomeScreen({
            storeName, existingOrderList: orderList,
            currentPage: currentPage,
            itemPerPage,
            categoryType: activeTabValue,
            activeStatusTab
        }); 
    }, [activeStatusTab])


    const renderPopup = (payload) => {
        const { isModalOpen, remarks, message, fieldName, buttonName, trackingId = "", statusHistory = [], isLoaderEnabled } = payload;
        return <Modal title="Order Details" cancelText={"Close"} okText={buttonName} open={isModalOpen} onOk={() => changeOrderStatus(payload)} onCancel={handleCancel}>
            {fieldName === 'Activity' ? <div>
                <div className='flexHeading'>Application Timeline:</div>
                {statusHistory.map((entry) => {
                    return <div className='history'>
                        <div className='faceIcon'>
                            <HistoryOutlined className={'TransitionArrow'} />
                        </div>
                        <div className='flexColHistory'>
                            <div className='historyDate'>
                                {getOrderCreatedTiming(entry.createdAt)}
                            </div>
                            <div>
                                {"Application status changed:"}{" "}
                                <span className={'BadgeGroup'}>
                                    {entry.from ? (
                                        <>
                                            <span className={'StateBadge'}>
                                                {entry.from}
                                            </span>
                                            <ArrowRightOutlined className={'TransitionArrow'} />
                                        </>
                                    ) : null}
                                    <span className={'StateBadge'}>
                                        {entry.to}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                })}
            </div> :
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
            }
        </Modal>
    }


    return (
        <div id={scrollId} style={{ height: scrollHeight, overflow: 'auto' }}>
            {renderPopup(data)}
            <InfiniteScroll
                dataLength={orderList.length}
                next={next}
                hasMore={currentPage < totalPages}
                scrollableTarget={scrollId}
                loader={() => <div className='loaderContainer'>
                    <CSpinner color="secondary" />
                </div>
                }
            >
                {orderList?.length === 0 ? <div className="textCenter">No Records Found</div> : null}
                {orderList.map((each) => {
                    return (
                        <div class='orderCardContainer'>
                            <div class='order-item'>
                                <ProductMedia
                                    isImage={each?.isImage}
                                    data={each}
                                />
                                <OrderStatusAndButton
                                    data={each}
                                    orderStatus={each.status}
                                    showModal={showModal}
                                    showOrderStatus={showOrderStatus}
                                />
                            </div>
                        </div>
                    )
                })}
            </InfiniteScroll>
        </div>)
}

const ProductMedia = ({ isImage, data: each }) => {
    return (
        <>
            <div class={isImage ? 'order-image' : "order-video-container"}>
                {
                    isImage ?
                        <img class='orderImageMobile' src={each.image} alt='Product Image' /> :
                        <VideoComponent src={each.image} width={33} height={33} styles={{ background: "#000", borderRadius: 50 }} autoPlay loop muted />
                }
            </div>
            <div className="flex mobileMediaHalf">
                <div class='order-details'>
                    <div class='full-product-name FORT12 BOLD'>{`${each.item}`}</div>
                    <div class='orderTimingTextColor'> {each.timing}</div>
                </div>
            </div>
        </>
    )
}

const OrderStatusAndButton = ({
    orderStatus,
    showModal,
    data: each,
    showOrderStatus
}) => {
    const statusActions = {
        PENDING: {
            text: 'Pending',
            label: 'circle-icon-order',
            actions: (
                <span className="actions actionButton order65 mobile-alignCenter">
                    <span className="reject-button mobileFont" onClick={() => showModal(each, 'Reject')}>Reject</span>
                    <button className="accept-button mobileFont" onClick={() => showModal(each, 'Accept')}>Accept</button>
                </span>
            ),
        },
        ACCEPTED: {
            text: 'Accepted',
            label: 'circle-icon-order-accept',
            actions: (
                <span className="actions actionButton order65 mobile-alignCenter">
                    <span className="reject-button mobileFont" onClick={() => { showModal(each, 'Cancel') }}>Cancel</span>
                    <button className="accept-button mobileFont" onClick={() => { showModal(each, 'Ship') }}>Ship Now</button>
                </span>
            ),
        },
        SHIPPED: {
            text: 'Shipped',
            label: 'circle-icon-order-ship',
            actions: (
                <span className="actions actionButton order65 mobile-alignCenter">
                    <button className="track-button mobileFont" onClick={() => { showModal(each, 'Delivery') }}>Deliver</button>
                </span>
            ),
        },
        DELIVERED: {
            text: 'Delivered',
            label: 'circle-icon-order-delivery',
            actions: (
                <span className="actions actionButton order65 mobile-alignCenter">
                    <button className="activityButton mobileFont" onClick={() => showModal(each, 'Activity')}>Activity</button>
                </span>
            ),
        },
        REJECTED: {
            text: 'Rejected',
            label: 'circle-icon-order-reject',
            actions: (
                <span style={{
                    color: "red",
                    paddingRight: 10,
                    fontSize: 10,
                    fontWeight: 'bold'
                    }}>
                    {'Rejected'}
                </span>
            ),
        },
        CANCELLED: {
            text: 'Cancelled',
            label: 'circle-icon-order',
            actions: (
                <span className="actions actionButton order65 mobile-alignCenter">
                    <span className="reject-button mobileFont"></span>
                </span>
            ),
        },
    };

    const status = statusActions[orderStatus];

    return (
        <div className='mobile-alignCenter mobileHalfWidth'>
            {status && showOrderStatus && (
                <span
                    className={`FORT11-Order order35 mobile-alignCenter mobileFont circle-icon-order-${orderStatus.toLowerCase()}`}>
                    <label className={status.label} />
                    {status.text}
                </span>
            )}
            {status && status.actions}
        </div>
    );
};