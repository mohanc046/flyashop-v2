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

const ChatModal = (props) => {

    const { isChatModalOpen = false, setChatModalStatus } = props;

    const [propertyId, setPropertyId] = useState('');

    const [widgetId, setWidgetId] = useState('');

    const [isLoading, setLoaderStatus] = useState(false);

    let updateStore = useStoreActions(action => action.shop.updateStore);

    let storeInformation = useStoreState(state => state.shop.data);

    const navigate = useNavigate();

    const configurePlugin = async () => {

        try {

            if(_.isEmpty(propertyId) && _.isEmpty(widgetId)){
                return notification.warn({ message: "Enter all fields to properly configure plugin!" })
            }

            setLoaderStatus(true);

            const shopInfo = store.getState().user.data;

            const storeName = `${_.get(shopInfo, 'existingStoreInfo[0].store.businessName')}`.toLocaleLowerCase();

            const requestPayload = { pluginType: "TAWK", propertyId, widgetId, isActive: true };

            const response = await axios.put(`${getServiceURL()}/store/plugin/config/${storeName}`, requestPayload);

            const { statusCode = 500, message = "Issue while update plugin config!" } = response.data || {};

            if (statusCode === 200) {

                const { pluginConfig = {} } = storeInformation || {};

                updateStore({ pluginConfig: { ...pluginConfig, tawk: requestPayload } })

                notification.open({ type: "success", message: "Plugin configured successful!" });

                setChatModalStatus(false);

                navigate('/home');

                // setTimeout(() => window.location.reload(), 1);

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
                title="Tawk.To : Live Chat"
                visible={isChatModalOpen}
                width={800}
                footer={null}
                closable={true}
                afterClose={() => setChatModalStatus(false)}
                destroyOnClose={true}
                onCancel={() => setChatModalStatus(false)}
            >
                <div className="modal-content">
                    {/* Left column content (20% width) */}
                    <div className="left-column">
                        <div className='logoContainer'>
                            <img className='imageFullOrderSize' src={config.TAWK_TO_LOGO} alt="Tawk.To Logo" />
                        </div>

                        <Input
                            className='pluginConfigInput'
                            placeholder="Property ID"
                            value={propertyId}
                            onChange={(e) => setPropertyId(e.target.value)}
                        />
                        <Input
                            className='pluginConfigInput'
                            placeholder="Widget ID"
                            value={widgetId}
                            onChange={(e) => setWidgetId(e.target.value)}
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
                            <p>To start using the Tawk.to plugin, you can follow these steps:</p>
                            <ol>
                                <li>Create an account or login to tawk.to</li>
                                <li>Create a property and the widget for your online store</li>
                                <li>Click on settings icon at the bottom left of the page</li>
                                <li>Now, go to the Chat Widget section in the left sidebar (under channels heading)</li>
                                <li>From this page, you'll find a section called Direct Chat Link. Copy the <code>&lt;PROPERTY_ID&gt;/&lt;WIDGET_ID&gt;</code> part from this link and paste it in Dukaan plugin's settings page. For example, if you're direct link is <code>https://tawk.to/chat/62c7e3667b967b1179989d99/1g7ed0iph</code>, then the code to be copied would be <code>62c7e3667b967b1179989d99/1g7ed0iph</code></li>
                                <li>The chat widget should be visible on your site now. You can reach out to Dukaan's support team for help with the integration</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ChatModal;
