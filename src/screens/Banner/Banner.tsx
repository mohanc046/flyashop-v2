import _ from "lodash";
import axios from "axios";
import Switch from "react-switch";
import React, { useState, useEffect , Fragment } from 'react'
import '../UserPayment/UserPayment.css'
import './Banner.css'
import { notification } from "antd";
import AppSidebar from "../../components/AppSidebar";
import AppHeader from "../../components/AppHeader";
import { renderFilterBox } from '../../utils/utilsUI';
import { getServiceURL } from "../../utils";
import { FIXED_VALUES } from "../../utils/constants";
import { CSpinner } from "@coreui/react";
const { statusCode: { SUCCESS } } = FIXED_VALUES;
export default function Banner({ authToken, businessName }) {
    const [showAvatar, setShowAvatar] = useState(true);

    useEffect(() => {
      const mediaQuery = window.matchMedia('(max-width: 500px)');
      
      const handleMediaQueryChange = (e) => {
        setShowAvatar(!e.matches);
      };
  
      // Set initial value based on current screen width
      handleMediaQueryChange(mediaQuery);
  
      // Listen for width changes
      mediaQuery.addEventListener('change', handleMediaQueryChange);
  
      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
      };
    }, []);

    const [state, setState] = useState({
        screen: 'WELCOME',
        heading: 'Customize Online Shop',
        checked: false,
        bannerList: ["", "", "", "", "", ""],
        loading: false,
        bannerCount: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            await fetchBannerDetails();
        };
        fetchData();
    }, []);


    const renderFilterUI = () => {
        return <div className="addNewProductButtonUI">
            <div className="scrollable-container">
                <div className='flex flexWrap'>
                    {renderFilterBox('Header & Favicon')}
                    {renderFilterBox('Banners', true)}
                    {renderFilterBox('Pages')}
                    {renderFilterBox('Fonts')}
                    {renderFilterBox('Advanced')}
                </div>
            </div>
        </div>
    }

    const handleChange = (checked) => {
        setState(prevState => ({ ...prevState, checked }))
    }

    const fileUpload = async (event, index) => {

        setState(prevState => ({ ...prevState, loading: true }))

        try {
            const files = event.target.files;

            const formData = new FormData();

            formData.append('image', files[0]);

            const URL = getServiceURL();

            const response = await fetch(`${URL}/fileupload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                }
            });
            if (response.ok) {
                const responseJSON = await response.json();
                const bannerURL = _.get(responseJSON, 'imagePath');
                let bannerList = state.bannerList;
                bannerList[index] = bannerURL;
                setState(prevState => ({ ...prevState, bannerList }))
            } else {
                notification.open({ type: "warning", message: "Unable to Upload Images" })
            }
        } catch (error) {

        } finally {
            setState(prevState => ({ ...prevState, loading: false }))
        }

    }

    const triggerFileUpload = (id) => {
        const input = document.getElementById(id);
        input?.click();
    }

    const renderBox = (image, index) => {
        return image ? <Fragment>
            <img className="bannerBoxImage" src={image} onClick={() => {
                triggerFileUpload(`bannerImage${index}`)
            }} />
            <input id={`bannerImage${index}`} onChange={(event) => {
                fileUpload(event, index)
            }} className="hideInputBox" type={"file"}></input>
        </Fragment>
            : <div className="bannerBox" onClick={() => {
                triggerFileUpload(`bannerImage${index}`)
            }}>
                <div className="bannerPlus">+</div>
                <input id={`bannerImage${index}`} onChange={(event) => {
                    fileUpload(event, index)
                }} className="hideInputBox" type={"file"}></input>
                <div>Add Banner</div>
            </div>
    }

    const saveBanner = async () => {
        setState(prevState => ({ ...prevState, loading: true }))
        try {
            const payload = {
                bannerConfig: {
                    enable: state.checked,
                    list: state.bannerList
                },
                businessName
            }
            let loginResponse = await axios.post(`${getServiceURL()}/store/update/store`, payload);
            const { data: { statusCode = "500", message = "Issue while creating store" } } = loginResponse;
            notification.open({ type: statusCode === SUCCESS ? "success" : "error", message: statusCode === SUCCESS ? "Updated Successfully" : message })
        } catch (error) {
        } finally {
            setState(prevState => ({ ...prevState, loading: false }))
        }
    }

    const fetchBannerDetails = async () => {
        setState(prevState => ({ ...prevState, loading: true }))
        try {
            let bannerResponse = await axios.post(`${getServiceURL()}/store/fetchStoreByBusinessName`, { businessName });
            const { message = "", bannerConfig } = bannerResponse?.data?.data || {};
            if (bannerConfig) {
                const { list = [], enable = false } = bannerConfig;
                const bannerCount = list.filter(Boolean).length;
                setState(prevState => ({ ...prevState, checked: enable, bannerList: list, loading: false , bannerCount }))
            } else {
                notification.open({ type: "error", message: "Banner Details are not configured" })
            }
        } catch (error) {

        } finally {
            setState(prevState => ({ ...prevState, loading: false }))
        }
    }

    const loader = () => {
        return <div className='loaderContainer'>
            <CSpinner color="secondary" />
        </div>
    }

    const renderBanner = () => {
        const { heading, bannerList, loading , bannerCount } = state;
        return <div>
            <AppSidebar />
            <AppHeader
                heading={heading}
                showBrand={false}
                showAvatar={showAvatar}
            />
            <br></br>
            <h6 className="headingLabel">{heading}</h6>
            <div className="userBannerLayout">
                <div>
                    {renderFilterUI()}
                    <div>
                        <div className="spaceBetween flex">
                            <div><h5>Promotional Banners</h5></div>
                            <div><label className="alignCenter">
                                <Switch height={23} width={48} uncheckedIcon={false} checkedIcon={false} onColor={"#6E3BFF"}
                                    offColor={"#D9D9D9"} onChange={handleChange} checked={state.checked} />
                                <span className="marginIcon">{state.checked ? "Active" : "Hidden"}</span></label></div>
                        </div>
                        <br></br>
                        <div className="content-div">Make more attention of your customers by promotional banners displayed on top of your home page</div>
                        <br></br>
                        <div><h6>Banners ({bannerCount}/6)</h6></div>
                        {loading ? loader() : <div className="userBannerWrap">
                            {bannerList.map((image, index) => renderBox(image, index))}
                        </div>}
                        <br></br>
                        <div>
                            <button onClick={saveBanner} className="saveBanner">Save</button>
                        </div>
                        <br></br> <br></br>
                    </div>
                </div>
            </div>
        </div>
    }

    return <> <div>
        {renderBanner()}
    </div>
    </>
};