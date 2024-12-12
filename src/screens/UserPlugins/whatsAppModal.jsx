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

const WhatsAppModal = (props) => {

    const { isWhatsAppModalOpen = false, setWhatsAppStatus } = props;

    const [phoneNumber, setPhoneNumber] = useState('');

    const [userName, setUserName] = useState('');

    const [isLoading, setLoaderStatus] = useState(false);

    let updateStore = useStoreActions(action => action.shop.updateStore);

    let storeInformation = useStoreState(state => state.shop.data);

    const navigate = useNavigate();

    const configurePlugin = async () => {

        try {

            if (_.isEmpty(phoneNumber) || _.isEmpty(userName)) {
                return notification.warn({ message: "Enter all fields to properly configure plugin!" })
            }

            setLoaderStatus(true);

            const shopInfo = store.getState().user.data;

            const storeName = `${_.get(shopInfo, 'existingStoreInfo[0].store.businessName')}`.toLocaleLowerCase();

            const requestPayload = { pluginType: "WHATSAPP", phoneNumber, userName, isActive: true };

            const response = await axios.put(`${getServiceURL()}/store/plugin/config/${storeName}`, requestPayload);

            const { statusCode = 500, message = "Issue while update plugin config!" } = response.data || {};

            if (statusCode === 200) {

                const { pluginConfig = {} } = storeInformation || {};

                updateStore({ pluginConfig: { ...pluginConfig, whatsApp: requestPayload } })

                notification.open({ type: "success", message: "Plugin configured successful!" });

                setWhatsAppStatus(false);

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
                visible={isWhatsAppModalOpen}
                width={800}
                footer={null}
                closable={true}
                afterClose={() => setWhatsAppStatus(false)}
                destroyOnClose={true}
                onCancel={() => setWhatsAppStatus(false)}
            >
                <div className="modal-content">
                    {/* Left column content (20% width) */}
                    <div className="left-column">
                        <div className='logoContainer'>
                            <img className='imageFullOrderSize' src={config.WHATSAPP_PLUGIN_LOGO} alt="WhatsApp Logo" />
                        </div>
                        <Input
                            className='pluginConfigInput'
                            placeholder="Business Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <Input
                            className='pluginConfigInput'
                            placeholder="Assistan Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
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
                            <p>Here's how you can start using WhatsApp Chat Bubble on your Dukaan store:</p>
                            <ol>
                                <li>Click on Install</li>
                                <li>In the input field, add your WhatsApp number prefixed with your country code (no verification required). For example, if your country is India, you will input 91xxxxxxxxxx</li>
                                <li>Once Installed, your customers can see the WhatsApp chat bubble at the bottom left of your store page</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default WhatsAppModal;
