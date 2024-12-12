import _ from "lodash";
import React, { useState, useEffect } from 'react'
import '../UserPayment/UserPayment.css';
import './plugin.css'
import { notification, Button } from "antd";
import AppSidebar from "../../components/AppSidebar";
import AppHeader from "../../components/AppHeader";
import { renderFilterBox } from '../../utils/utilsUI';
import ChatModal from "./chatModal";
import { config } from "../../config";
import { useStoreActions, useStoreState } from '../../store/hooks';
import store from '../../store/index';
import axios from "axios";
import { getServiceURL } from "../../utils";
import { useNavigate } from 'react-router-dom';
import GoogleAnalyticsModal from "./googleAnalyticsModal";
import WhatsAppModal from "./whatsAppModal";

const categories = [
    'All',
    'Manage Store',
    'Shipping',
    'Marketing',
    'Customer Support'
]

export default function UserPlugins() {

    const [isChatModalOpen, setChatModalStatus] = useState(false);

    const [isGoogleAnalyticsModalOpen, setGoogleAnalyticsStatus] = useState(false);

    const [isWhatsAppModalOpen, setWhatsAppStatus] = useState(false);

    const [isPluginLoaderActive, setPluginLoaderStats] = useState(false);

    let storeInformation = useStoreState(state => state.shop.data);

    let updateStore = useStoreActions(action => action.shop.updateStore);

    const navigate = useNavigate();

    const [state, setState] = useState({
        screen: 'WELCOME',
        heading: 'Plugins'
    });

    const PluginConfig = [
        {
            image: config.TAWK_TO_LOGO,
            category: 'Customer Support',
            heading: 'Tawk.To : Live Chat',
            description: 'Offer 24/7 customer support and monitor site visitors with a live chat feature.',
            installAction: () => setChatModalStatus(true),
            isActive: _.get(storeInformation, 'pluginConfig.tawk.isActive', false),
            uninstallAction: () => uninstallChatPluginConfig()
        },
        {
            image: config.GOOGLE_ANALYTICS,
            category: 'Marketing',
            heading: 'Google Analytics',
            description: 'Enable Instagram to set up a Business page where you can create and share your shop.',
            installAction: () => setGoogleAnalyticsStatus(true),
            isActive: _.get(storeInformation, 'pluginConfig.googleAnalytics.isActive', false),
            uninstallAction: () => uninstallGoogleAnalyticsPluginConfig()
        },
        {
            image: config.WHATSAPP_PLUGIN_LOGO,
            category: 'WhatsApp',
            heading: 'WhatsApp',
            description: 'Enable WhatsApp to set up a Business profile where you can create and share your shop.',
            installAction: () => setWhatsAppStatus(true),
            isActive: _.get(storeInformation, 'pluginConfig.whatsApp.isActive', false),
            uninstallAction: () => uninstallWhatsAppPluginConfig()
        }
    ]

    const [activeCategory, setActiveCategory] = useState(categories[0])

    const [plugins, setPlugins] = useState(PluginConfig);

    const [filteredPlugins, setFilteredPlugins] = useState(plugins);


    const setUpPayment = (message) => {
        notification.open({ type: "success", message })
    }

    const updateCategory = (category) => {
        setActiveCategory(category)
    }

    useEffect(() => {
        filterCategory();
    }, [activeCategory])

    const filterCategory = () => {
        if (activeCategory === categories[0]) { // ALL
            setFilteredPlugins(plugins)
        } else {
            const filteredPlugins = _.filter(plugins, (plugin) => {
                return plugin.category === activeCategory
            });
            setFilteredPlugins(filteredPlugins)
        }
    }

    const uninstallChatPluginConfig = async () => {

        try {

            setPluginLoaderStats(true);

            const shopInfo = store.getState().user.data;

            const storeName = `${_.get(shopInfo, 'existingStoreInfo[0].store.businessName')}`.toLocaleLowerCase();

            const requestPayload = { pluginType: "TAWK", isActive: false };

            const response = await axios.put(`${getServiceURL()}/store/plugin/config/${storeName}`, requestPayload);

            const { statusCode = 500, message = "Issue while update plugin config!" } = response.data || {};

            if (statusCode === 200) {

                const { pluginConfig = {} } = storeInformation || {};

                updateStore({ pluginConfig: { ...pluginConfig, tawk: requestPayload } })

                notification.open({ type: "success", message: "Plugin uninstall successful!" });

                setPluginLoaderStats(false);

                navigate('/home')

                // setTimeout(() => window.location.reload(), 1);

                return;

            } else {

                return notification.open({ type: "warning", message })

            }

        } catch (error) {
            notification.open({ type: "warning", message: "Issue while configuring plugin!" })
        } finally {
            setPluginLoaderStats(false);
        }
    }

    const uninstallGoogleAnalyticsPluginConfig = async () => {

        try {

            setPluginLoaderStats(true);

            const shopInfo = store.getState().user.data;

            const storeName = `${_.get(shopInfo, 'existingStoreInfo[0].store.businessName')}`.toLocaleLowerCase();

            const requestPayload = { pluginType: "GOOGLE_ANALYTICS", isActive: false };

            const response = await axios.put(`${getServiceURL()}/store/plugin/config/${storeName}`, requestPayload);

            const { statusCode = 500, message = "Issue while update plugin config!" } = response.data || {};

            if (statusCode === 200) {

                const { pluginConfig = {} } = storeInformation || {};

                updateStore({ pluginConfig: { ...pluginConfig, googleAnalytics: requestPayload } })

                notification.open({ type: "success", message: "Plugin uninstall successful!" });

                setPluginLoaderStats(false);

                navigate('/home')

                return;

            } else {

                return notification.open({ type: "warning", message })

            }

        } catch (error) {
            notification.open({ type: "warning", message: "Issue while configuring plugin!" })
        } finally {
            setPluginLoaderStats(false);
        }
    }

    const uninstallWhatsAppPluginConfig = async () => {

        try {

            setPluginLoaderStats(true);

            const shopInfo = store.getState().user.data;

            const storeName = `${_.get(shopInfo, 'existingStoreInfo[0].store.businessName')}`.toLocaleLowerCase();

            const requestPayload = { pluginType: "WHATSAPP", isActive: false };

            const response = await axios.put(`${getServiceURL()}/store/plugin/config/${storeName}`, requestPayload);

            const { statusCode = 500, message = "Issue while update plugin config!" } = response.data || {};

            if (statusCode === 200) {

                const { pluginConfig = {} } = storeInformation || {};

                updateStore({ pluginConfig: { ...pluginConfig, whatsApp: requestPayload } })

                notification.open({ type: "success", message: "Plugin uninstall successful!" });

                setPluginLoaderStats(false);

                navigate('/home')

                return;

            } else {

                return notification.open({ type: "warning", message })

            }

        } catch (error) {
            notification.open({ type: "warning", message: "Issue while configuring plugin!" })
        } finally {
            setPluginLoaderStats(false);
        }
    }



    const renderFilterUI = () => {
        return <div className="addNewProductButtonUI">
            <div className="scrollable-container">
                <div className='flex flexWrap'>
                    {categories.map((category) => renderFilterBox(category, (category === activeCategory), updateCategory))}
                </div>
            </div>
        </div>
    }

    const renderPluginsList = (paymentConfig) => {
        const { image, heading, description, isActive = false, installAction, uninstallAction } = paymentConfig;
        return <div className="pluginContainer">
            <div className="pluginInnerContainer1">
                <div className="flex1">
                    <img className="imageFullOrderSize" src={image}></img>
                </div>
                <div className="flex2">
                    <div className="paymentLabelMargin">
                        <h6>{heading}</h6>
                        <div>{description}</div>
                    </div>
                </div>
            </div>
            <div className="lineBreakContainer">
                <div className="lineBreakDrawer"></div>
            </div>

            {isActive ?
                <div className="flex1 textCenterButton pluginButtonContainer"> <Button className="setUpButton" onClick={() => uninstallAction()} >Uninstall</Button> </div> :
                <div className="flex1 textCenterButton pluginButtonContainer"><Button className="setUpButton" onClick={() => installAction()}>Install</Button></div>
            }
        </div>
    }

    const renderMobileVersion = () => {
        const { heading } = state;
        return (<div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader
                    heading={heading}
                    showBrand={false}
                    showAvatar={true}
                />
                <div className="default-layout-alignment">
                    {renderFilterUI()}
                    {filteredPlugins?.length === 0 && <h4 className="headingLabel">{'No records found'}</h4>}
                    <div className="parentContainer">
                        {filteredPlugins?.map((plugin, index) => (
                            <div key={index} className="parentPluginContainer">
                                {renderPluginsList(plugin)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ChatModal isChatModalOpen={isChatModalOpen} setChatModalStatus={setChatModalStatus} />
            <GoogleAnalyticsModal isGoogleAnalyticsModalOpen={isGoogleAnalyticsModalOpen} setGoogleAnalyticsStatus={setGoogleAnalyticsStatus} />
            <WhatsAppModal isWhatsAppModalOpen={isWhatsAppModalOpen} setWhatsAppStatus={setWhatsAppStatus} />
        </div>)
    }

    return <> <div>
        {renderMobileVersion()}
    </div>
    </>
};