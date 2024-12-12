import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEye , faShareAlt , faClone, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { config } from '../../config';

import { getFormattedCurrency } from '../../utils';

import VideoComponent from '../../components/VideoComponent/VideoComponent';

export const getProductColumns = ({ onEdit }) => {
    return [
        {
            name: 'Item',
            selector: row =><div>
                <div class='order-image'>
                    {
                        row.isImage ?
                            <img class='orderImageMobile' src={row.image} alt='Product Image' /> :
                            <VideoComponent src={row.image} width={70} height={70} styles={{ background: "#000", borderRadius: 8 }} autoPlay loop muted />
                    }
                    <div className='orderListProductItemDesktopContainer'>
                        <span className='product-name FORT12 BOLD'>{row.item}</span>
                        <label className='orderTimingTextColor'>{row.timing}</label>
                    </div>
                </div>
            </div>,
            sortable: false,
            width: "35%",
            wrap: true
        },
        {
            name: 'Order Id',
            selector: row => row.orderId,
            sortable: false,
            width: "14%",
        },
        {
            name: 'Amount',
            selector: row => getFormattedCurrency(row.totalCost),
            sortable: false,
            width: "14%",
        },
        {
            name: 'Location',
            selector: row => {
                const { shippingAddress = {} } = row || {};
                const { state = "", pinCode = "" } = shippingAddress || {};
                return `${state}, ${pinCode}`
            },
            sortable: false,
            width: "14%",
        },
        {
            name: 'Status',
            selector: row => <div className='input-width-layout'>
                <button class="btn input-width btn-primary px-12 primary-color button FORT12" type="button">{row.status}</button>
            </div>,
            sortable: false,
            width: "15%"
        }
    ]
};