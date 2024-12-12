import React from 'react';

import Switch from "react-switch";

import '../Banner/Banner.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { FIXED_VALUES } from '../../utils/constants';

const { DISCOUNT_TYPE } = FIXED_VALUES;


export const getDiscountValue = (data) =>{

    const { offerValue, offerType } = data;

    return offerType === DISCOUNT_TYPE.FLAT ? `₹${offerValue}` : `${offerValue}%`

}

export const getFormattedChannelName = (channel = []) => {
    return channel.join(' & ');
}


export const getVoucherColumns = ({ onEdit, handleChange }) => {

    return [
        {
            name: 'Offer Name',
            selector: row => `${row.offerName}`,
            sortable: false,
            // width: "14%",
        },
        {
            name: 'Channel',
            selector: row => getFormattedChannelName(row.sellingChannel),
            sortable: false,
            // width: "14%",
        },
        {
            name: 'Discount',
            selector: row => getDiscountValue(row),
            sortable: false,
            // width: "14%",
        },
        {
            name: 'Start Date',
            selector: row => moment(row.campaignStartDate).format("DD-MM-YYYY"),
            sortable: false,
            // width: "14%",
        },
        {
            name: 'End Date',
            selector: row => moment(row.campaignEndDate).format("DD-MM-YYYY"),
            sortable: false,
            // width: "14%",
        },
        {
            name: 'Status',
            selector: row => <div id={`switch${row.index}`}><label className="alignCenter fullWidth">
                <Switch height={23} width={48} uncheckedIcon={false} checkedIcon={false} onColor={"#6E3BFF"}
                    offColor={"#D9D9D9"} onChange={() => {handleChange(row)}} checked={row.isActive} />
                <span className="marginIcon">{row.isActive ? "Active" : "Hidden"}</span></label></div>,
            sortable: false,
            width: "13%"
        },
        {
            name: '',
            selector: row => <p>
                <a className="editTag" onClick={() => onEdit(row)}><FontAwesomeIcon icon={faEllipsisV} /></a>
            </p>,
            sortable: false,
            width: "5%"
        },
    ]
};