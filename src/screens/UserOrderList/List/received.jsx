import { useEffect, useState } from "react";

import _ from 'lodash';

import '../orderList.css';

import { useNavigate } from "react-router-dom";

import { getTimeAgo, isImageUrl } from "../../../utils";

import VideoComponent from "../../../components/VideoComponent/VideoComponent";

import { EmptyScreen } from "../../UserCart/UserCart";

export const ReceivedList = ({ orderList }) => {

    const navigate = useNavigate();

    const [initialState, setInitialState] = useState({
        page: 1,
        newPerPage: 10,
        data: []
    })


    useEffect(() => {

        if(orderList){

            let data = orderList.map(item => {

                let listOfProductName = _.map(_.get(item, 'products', []), entry => _.get(entry, 'product.productName', `${item.orderId}`));

                return {

                    item: listOfProductName,

                    timing: getTimeAgo(item.createdDate),

                    isImage: isImageUrl(_.get(item, 'products.[0].product.images.[0]')),

                    image: _.get(item, 'products.[0].product.images.[0]')
                }

            })

            setInitialState({ ...initialState, data })

        }

    }, [orderList])

    return <div>
        {_.isEmpty(initialState.data) ? EmptyScreen({}) :
            initialState.data.map((each) => {
                return (
                    <div class='orderCardContainer'>
                        <div class='order-item'>
                            <div class='order-image'>
                                {
                                    each.isImage ?
                                        <img class='orderImageMobile' src={each.image} alt='Product Image' /> :
                                        <VideoComponent src={each.image} width={70} height={70} styles={{ background: "#000", borderRadius: 8 }} autoPlay loop muted />
                                }
                            </div>
                            <div class='order-details'>
                                <div class='product-name FORT12 BOLD'>{`${each.item}`}</div>
                                <div class='orderTimingTextColor'> {each.timing}</div>
                            </div>
                            <div class='orderStatusContainer' onClick={() => navigate('/tracking')}>
                                <label className="orderStatusLabel" >View order</label>
                            </div>
                        </div>
                    </div>
                )
            })}
    </div>

}