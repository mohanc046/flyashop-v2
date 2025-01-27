import React from 'react';

import { CHeader, CHeaderToggler } from '@coreui/react';

import { faXmark } from '@fortawesome/free-solid-svg-icons';

import _ from 'lodash';

import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./index.css";

const CustomHeader = ({ heading = '', leftNavIcon = faXmark, action = null }) => {

    if (heading == '') return null;

    const navigate = useNavigate();

    return (
        <CHeader position="fixed" >
            <div className='customHeaderContainer'>
                <div className='marginLeftAndRight'>
                    <CHeaderToggler onClick={() => action ? action() : navigate(-1)} >
                        <FontAwesomeIcon icon={leftNavIcon} />
                    </CHeaderToggler>
                </div>
                <div className=" app-heading customHeaderTitleContainer ">{heading}</div>
                <div className='marginLeftAndRight'></div>
            </div>
        </CHeader>
    )
}

export default CustomHeader
