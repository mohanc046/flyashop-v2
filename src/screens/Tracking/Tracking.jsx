import React from 'react';

import { AppSidebar, AppHeader } from '../../components/index'
import './tracking.css';
import { config } from '../../config';
import { Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import TrackedParcelCard from '../../components/CardComponents/TrackedParcelCard';
import TrackingMap from '../../components/CardComponents/TrackingMap';
import { useNavigate } from "react-router-dom";

const ProfileComponent = () => {
    return (
        <div className='header-profile-container'>
            <img src={config.PROFILE_ICON}></img>
        </div>
    )
}

const SearchComponent = () => {
    return (
        <div className='search-container'>
            <Input
                className='ant-input-affix-wrapper tracking-search'
                placeholder='Your Tracking Number'
                // prefix={<SearchOutlined className="site-form-item-icon" />}
                suffix={<button className="btn btn-primary primary-color button arrow-right"><FontAwesomeIcon icon={faAngleRight} /></button>}
            />
        </div>
    )
}


const Tracking = () => {


    const navigate = useNavigate();


    const trackingData = [
        {
            landMark: "2972 Patna",
            address: "Rd. Santa Ana, Illinois 85486 ",
            completed: true
        },
        {
            landMark: "8502 Chennai",
            address: "Rd. Inglewood, Maine 98380",
            completed: true
        }
    ]

    return (
        <div className='whiteBgColor tracking-container'>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader
                    heading={"Tracking"}
                    RightComponent={() => <ProfileComponent />}
                    BottomComponent={() => <SearchComponent />}
                    showBrand={false}
                    showAvatar={false}
                    styles={{ minHeight: 100 }}
                    action={() => navigate(-1)}
                />
                <div className={`body flex-grow-1 px-3 DefaultMarginBottom whiteBgColor container`}>
                    <div className='ongoing-delivery'>
                        <span className='title'>Ongoing Delivery</span>
                        <div className='details-container'>
                            <div className='top d-flex justify-content-between'>
                                <div className='d-flex flex-column'>
                                    <span className='label'>Shipment number</span>
                                    <span className='value'>EV-2017002346</span>
                                    <span className='category'>Food Materials</span>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <img src={config.TRUCK_IMG} height={50} width={130} alt="" />
                                </div>
                            </div>
                            <div style={{ marginTop: 20 }} className='d-flex'>
                                <TrackingMap data={trackingData} />
                                <div className='d-flex align-items-end'>
                                    <span className='details-label'>Details</span>
                                </div>
                            </div>
                            <div className='shop-info d-flex align-items-center'>
                                <img className='shop-logo' src={config.USER_LOGO} />
                                <div className='details'>
                                    <span className='label'>Shop</span>
                                    <span className='name'>Budget Shop</span>
                                    <span className='manager'>Manager</span>
                                </div>
                                <div className='action-icon'>
                                    <img src={config.CALL_ICON}></img>
                                </div>
                                <div className='action-icon'>
                                    <img src={config.MESSAGE_ICON}></img>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='last-tracked'>
                        <span className='title'>Last Tracked Parcel</span>
                        <div className='d-flex flex-column last-tracked-list'>
                            <TrackedParcelCard />
                            <TrackedParcelCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Tracking;
