import React from 'react';
import ImgOrVideoRenderer from '../../components/ImgOrVideoRenderer/ImgOrVideoRenderer';

export const getProductColumns = ({ onEdit , showModal }) => {
    return [
        {
            name: 'Item',
            selector: row => <div><span className='tableProfileIcon'>
                <ImgOrVideoRenderer
                    src={row.image}
                    className={"tableProfileIconImg"}
                    width={30}
                    height={30}
                    videoStyles={{ background: "#000", borderRadius: "50%" }}
                />
            </span> <span className='productName'>{row.productName}</span></div>,
            sortable: false,
            width: "30%",
            wrap: true
        },
        {
            name: 'Order Id',
            selector: row => row.orderId,
            sortable: false,
            width: "15%",
        },
        {
            name: 'Amount',
            selector: row => `${row.price}`,
            sortable: false,
            width: "15%",
        },
        {
            name: 'Location',
            selector: row => `${row.location ? row.location : "-"}`,
            sortable: false,
            width: "15%"
        },
        {
            name: 'Status',
            selector: row => <div className=''>
                {row.status === "PENDING" ? <span className='FORT11-Order order35'> <label className='circle-icon-order'></label> Pending</span> : null}
                {row.status === "ACCEPTED" ? <span className='FORT11-Order order35'> <label className='circle-icon-order-accept'></label> Accepted</span> : null}
                {row.status === "SHIPPED" ? <span className='FORT11-Order order35'> <label className='circle-icon-order-ship'></label> Shipped</span> : null}
                {row.status === "DELIVERED" ? <span className='FORT11-Order order35'> <label className='circle-icon-order-delivery'></label> Delivered</span> : null}
                {row.status === "REJECTED" ? <span className='FORT11-Order order35'> <label className='circle-icon-order-reject'></label> Rejected</span> : null}
                {row.status === "PENDING" ? <span className="actions actionButton order65">
                    <span className="reject-button" onClick={() => {showModal(row , 'Reject')}}>Reject</span>
                    <button className="accept-button" onClick={() => {showModal(row , 'Accept')}}>Accept</button>
                </span> : null}
                {row.status === "ACCEPTED" ? <span className="actions actionButton order65">
                    <span className="reject-button" onClick={() => {showModal(row, 'Cancel')}}>Cancel</span>
                    <button className="accept-button" onClick={() => {showModal(row, 'Ship')}}>Ship Now</button>
                </span> : null}
                {row.status === "SHIPPED" ? <span className="actions actionButton order65">
                    <span className="reject-button" onClick={() => {showModal(row, 'Delivery')}}>Delivery</span>
                    <button className="track-button" onClick={() => { showModal(row, 'Track') }}>Add Track</button>
                </span> : null}
                {row.status === "DELIVERED" ? <span className="actions actionButton order65">
                    <span className="reject-button"></span>
                    <button className="activityButton" onClick={() => { 
                        showModal(row, 'Activity')
                         }}>Activity</button>
                </span> : null}
            </div>,
            sortable: false,
            width: "25%"
        },
    ]
};