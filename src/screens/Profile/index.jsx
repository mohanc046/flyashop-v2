import React, { Fragment } from 'react';

import { AppSidebar } from '../../components/index'

import { CButton } from '@coreui/react'

import { useNavigate } from "react-router-dom";

import { isMobileView } from '../../utils';

import CustomHeader from '../../components/CustomHeader';

import CustomFooter from '../../components/CustomFooter';

import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { config } from '../../config';


const renderInputText = ({ label }) => {
    return <div className='editProfileInputContainer'>
        <label className="editProfileInputHeaderLabel">{label}</label>
        <input className='editInputContainer' />
    </div>
}

const RenderMobileUI = () => {
    return <div>

        <AppSidebar />

        <div className="wrapper d-flex flex-column min-vh-100 bg-light">

            <CustomHeader heading={"Profile"} leftNavIcon={faAngleLeft} />

            <div className={`body flex-grow-1 parentContainer`}>

                <div className='defaultProfileMargin'>


                    <div className='profileDescriptionContainer'>
                        <label className='profileDescriptionLabel'>
                            Your profile picture can only be seen by you.
                        </label>
                    </div>

                    <div className='profileImageContainer'>

                        <img className='profileImageStyle' src={config.DEFAULT_PROFILE_ICON} />

                        <CButton
                            className="button editProfileButtonStyle"
                            onClick={() => { }}>
                            <div>
                                <img className='editProfileIcon' src={config.EDIT_ICON} />
                                <label className='editProfileTextLabel'>{'Edit profile'}</label>
                            </div>
                        </CButton>

                    </div>

                    <div className='editProfileContainer'>
                        <label className='generalInformationLabel'>GENERAL INFORMATION</label>
                    </div>

                    {
                        [
                            {
                                label: 'SHOP NAME',
                            },
                            {
                                label: 'SURNAME',
                            },
                            {
                                label: 'MOBILE',
                            },
                            {
                                label: 'LOCATIOn',
                            }
                        ].map(item => renderInputText(item))
                    }

                </div>

            </div>
        </div>
    </div>
}

export default function Profile() {

    const navigate = useNavigate();

    const renderWebUI = () => {
        return <></>
    }

    return <>
        {
            isMobileView() ? <RenderMobileUI /> : renderWebUI()
        }
    </>
}