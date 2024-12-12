import React, { useState } from 'react';

import { AppSidebar, AppHeader, AppFooter } from '../../components/index'
import './shipping.css';
import { config } from '../../config';
import { DatePicker, Input, Select, Slider, TimePicker } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation, faAngleDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import TrackedParcelCard from '../../components/CardComponents/TrackedParcelCard';
import TrackingMap from '../../components/CardComponents/TrackingMap';
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react';

const HeaderRightComponent = () => {
    return (
        <div>
            <img src={config.SETTINGS_ICON}></img>
        </div>
    )
}

const Shipping = () => {

    const trackingData = [
        {
            landMark: "2972 Alandur",
            address: "Rd. Santa Ana, Illinois 85486 ",
            completed: true,
            timeStamp: "05:48 PM, 7 June 2023"
        },
        {
            landMark: "2972 Warehouse Van",
            address: "Rd. Santa Ana, Illinois 85486 ",
            completed: true,
            timeStamp: "05:48 PM, 7 June 2023"
        },
        {
            landMark: "2972 Goods Station",
            address: "Rd. Santa Ana, Illinois 85486 ",
            completed: false,
            timeStamp: "7 June 2023"
        },
        {
            landMark: "8502 Chennai",
            address: "Rd. Inglewood, Maine 98380",
            completed: false,
            timeStamp: "8 June 2023 (Tomorrow)"
        }
    ]
    const [activeKey, setActiveKey] = useState(1);

    const tabs = [
        {
            name: "Arrange",
            key: "arrange-tab-pane",
        },
        {
            name: "Shipping Status",
            key: "shipping-tab-pane",
        }
    ]

    return (
        <div className='whiteBgColor shipping-container'>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader
                    heading={"Shipping"}
                    RightComponent={() => <HeaderRightComponent />}
                    showBrand={false}
                    showAvatar={false}
                    styles={{ minHeight: 70, borderBottom: 0 }}
                />
                <div className={`body flex-grow-1 px-3 DefaultMarginBottom whiteBgColor container`}>
                    {
                        activeKey == 2 &&
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
                    }
                    <CNav className='horizontal-tabs' variant="tabs" role="tablist" style={{ marginTop: 24 }}>
                        {
                            tabs.map((each, index) =>
                                <CNavItem role="presentation">
                                    <CNavLink
                                        active={activeKey === index + 1}
                                        component="button"
                                        role="tab"
                                        aria-controls={each.key}
                                        aria-selected={activeKey === index + 1}
                                        onClick={() => setActiveKey(index + 1)}
                                    >
                                        {each.name}
                                    </CNavLink>
                                </CNavItem>
                            )
                        }
                    </CNav>
                    <CTabContent>
                        <CTabPane role="tabpanel" aria-labelledby="arrange-tab-pane" visible={activeKey === 1}>
                            <div className='arrange-form'>
                                <form action="">
                                    <div className='field-container'>
                                        <div className='tail'></div>
                                        <div className='icon'>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                        <div className="field-value">
                                            <label htmlFor="">Pickup Location</label>
                                            <Input
                                                className='ant-input-affix-wrapper'
                                                value={"Rd. Santa Ana, India"}
                                                suffix={<FontAwesomeIcon icon={faLocation} />}
                                            />
                                        </div>
                                    </div>

                                    <div className='field-container'>
                                        <div className='tail'></div>
                                        <div className='icon'>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                        <div className="field-value">
                                            <label htmlFor="">Product Weight</label>
                                            <Slider
                                                min={0}
                                                max={10}
                                                step={0.2}
                                            />
                                        </div>
                                    </div>
                                    <div className='field-container'>
                                        <div className='tail'></div>
                                        <div className='icon'>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                        <div className="field-value">
                                            <label htmlFor="">Pickup Date & Time</label>
                                            <div className='d-flex grp'>
                                                <DatePicker format={"DD-MM-YYYY"} placeholder='DD-MM-YYYY' suffixIcon={null} />
                                                <TimePicker format={"HH/MM"} placeholder='HH/MM' suffixIcon={<FontAwesomeIcon icon={faAngleDown} />} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='field-container'>
                                        <div className='tail'></div>
                                        <div className='icon'>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                        <div className="field-value">
                                            <label htmlFor="">Product Details</label>
                                            <textarea cols="10" rows="4"></textarea>
                                        </div>
                                    </div>
                                    <div className='field-container'>
                                        <div className='icon'>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </div>
                                        <div className="field-value">
                                            <label htmlFor="">Choose Caries</label>
                                            <Select
                                                defaultValue="DHL"
                                                options={[
                                                    { value: 'DHL', label: 'DHL' },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </CTabPane>
                        <CTabPane role="tabpanel" aria-labelledby="shipping-tab-pane" visible={activeKey === 2}>
                            <div style={{ marginTop: 20 }} className='d-flex shipping-status-container'>
                                <TrackingMap data={trackingData} stretch />
                            </div>
                            <button className='btn btn-primary button confirmBtn'>Confirm Shipping</button>
                        </CTabPane>
                    </CTabContent>
                </div>
                <AppFooter />
            </div>
        </div>
    )

}

export default Shipping;
