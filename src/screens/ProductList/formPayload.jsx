import React from 'react';

import Switch from "react-switch";

import '../Banner/Banner.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEye , faShareAlt , faClone, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { config } from '../../config';

import ImgOrVideoRenderer from '../../components/ImgOrVideoRenderer/ImgOrVideoRenderer';

export const getProductColumns = ({ onEdit , handleChange }) => {
    return [
        {
            name: 'Item',
            selector: row => <div><span className='tableProfileIcon'>
                <ImgOrVideoRenderer
                    src={row?.image ? row.image : config.CIRCLE_ICON}
                    className={"tableProfileIconImg"}
                    width={30}
                    height={30}
                    description={"Description of the image"}
                    videoStyles={{ background: "#000", borderRadius: "50%" }}
                />
            </span> <span className='productName'>{row.item}</span></div>
            ,
            sortable: false,
            width: "35%",
            wrap: true
        },
        {
            name: 'Amount',
            selector: row => `${row.price}`,
            sortable: false,
            width: "14%",
        },
        {
            name: 'Inventory',
            selector: row => row.count,
            sortable: false,
            width: "14%",
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
        // {
        //     name: 'Action',
        //     selector: row => <p>
        //         <a className="editTag" onClick={() => onEdit(row)}><FontAwesomeIcon icon={faEye} /></a>
        //         <a className="editTag" onClick={() => onEdit(row)}><FontAwesomeIcon icon={faClone} /></a>
        //         <a className="editTag" onClick={() => onEdit(row)}><FontAwesomeIcon icon={faShareAlt} /></a>
        //     </p>,
        //     sortable: false,
        //     width: "15%"
        // },
        // {
        //     name: '',
        //     selector: row => <p>
        //         <a className="editTag" onClick={() => onEdit(row)}><FontAwesomeIcon icon={faEllipsisV} /></a>
        //     </p>,
        //     sortable: false,
        //     width: "5%"
        // },
    ]
};