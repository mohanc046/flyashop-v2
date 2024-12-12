import React, { useState } from 'react';
import { Button, Modal, Input, notification } from 'antd';
import './chatModal.css'; // Import CSS file for styling
import store from '../../store/index';
import axios from "axios";
import { getServiceURL } from '../../utils';
import _ from 'lodash';
import { useStoreActions, useStoreState } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { config } from '../../config';

const GoogleAnalyticsModal = (props) => {

    const { isGoogleAnalyticsModalOpen = false, setGoogleAnalyticsStatus } = props;

    const [propertyId, setPropertyId] = useState('');

    const [widgetId, setWidgetId] = useState('');

    const [isLoading, setLoaderStatus] = useState(false);

    let updateStore = useStoreActions(action => action.shop.updateStore);

    let storeInformation = useStoreState(state => state.shop.data);

    const navigate = useNavigate();

    const configurePlugin = async () => {

        try {

            if (_.isEmpty(propertyId)) {
                return notification.warn({ message: "Enter all fields to properly configure plugin!" })
            }

            setLoaderStatus(true);

            const shopInfo = store.getState().user.data;

            const storeName = `${_.get(shopInfo, 'existingStoreInfo[0].store.businessName')}`.toLocaleLowerCase();

            const requestPayload = { pluginType: "GOOGLE_ANALYTICS", propertyId, isActive: true };

            const response = await axios.put(`${getServiceURL()}/store/plugin/config/${storeName}`, requestPayload);

            const { statusCode = 500, message = "Issue while update plugin config!" } = response.data || {};

            if (statusCode === 200) {

                const { pluginConfig = {} } = storeInformation || {};

                updateStore({ pluginConfig: { ...pluginConfig, googleAnalytics: requestPayload } })

                notification.open({ type: "success", message: "Plugin configured successful!" });

                setGoogleAnalyticsStatus(false);

                navigate('/home');

            } else {

                return notification.open({ type: "warning", message })

            }

        } catch (error) {
            notification.open({ type: "warning", message: "Issue while configuring plugin!" })
        } finally {
            setLoaderStatus(false);
        }
    }

    return (
        <>
            <Modal
                title="Google analytics"
                visible={isGoogleAnalyticsModalOpen}
                width={800}
                footer={null}
                closable={true}
                afterClose={() => setGoogleAnalyticsStatus(false)}
                destroyOnClose={true}
                onCancel={() => setGoogleAnalyticsStatus(false)}
            >
                <div className="modal-content">
                    {/* Left column content (20% width) */}
                    <div className="left-column">
                        <div className='logoContainer'>
                            <img className='imageFullOrderSize' src={config.GOOGLE_ANALYTICS} alt="Google Analytics Logo" />
                        </div>
                        <Input
                            className='pluginConfigInput'
                            placeholder="Analytics Property ID"
                            value={propertyId}
                            onChange={(e) => setPropertyId(e.target.value)}
                        />
                        <Button
                            className='btn btn-primary primary-color button FORT12 pluginConfigureButton defaultPluginMarginTop'
                            onClick={() => configurePlugin()}
                            loading={isLoading}
                        >
                            Configure
                        </Button>

                    </div>
                    <div className="right-column">
                        {/* Right column content (80% width) */}
                        <div className="instruction-details">
                            <h3>Instructions:</h3>
                            <p>Here's how you can start using Google Analytics:</p>
                            <ol>
                                <li>To start using Google Analytics, create an account on it or log in (if you have one)</li>
                                <li>Once logged in, click on Admin</li>
                                <li>Select the account from the menu in the <code>ACCOUNT</code> column.</li>
                                <li>Select the property from the menu in the <code>PROPERTY</code> column.</li>
                                <li>Under <code>PROPERTY</code>, click Data Streams, then click on Tracking Info</li>
                                <li>Now, select <code>Tracking/Measurement</code> Code</li>
                                <li>Copy the <code>Tracking ID</code> displayed at the top of the page</li>
                                <li>Now, Install the Google Analytics plugin on Dukaan</li>
                                <li>Click on Settings and it’ll ask for Analytics Property ID</li>
                                <li>Paste the <code>Tracking ID</code> here to complete the installation</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default GoogleAnalyticsModal;
