import React from 'react';

import "../../ProductList/style.css"

import _ from 'lodash';

import { CSpinner } from '@coreui/react'
import { config } from '../../../config';
import { isImageUrl } from '../../../utils';
import VideoComponent from '../../../components/VideoComponent/VideoComponent';
import CustomerListSearch from './CustomerListSearch';
import { FilterUI } from '../Components/FilterUI';

const CustomerListMobile = ({
    data = [],
    isLoaderEnabled,
    handleSearchFilter
}) => {
    return <div className="layout-alignment">
        <div id="dataTable">
            <CustomerListSearch handleSearchFilter={handleSearchFilter} />
            <FilterUI />
            <div className='margin-top-5'>
                {
                    isLoaderEnabled ? <div className='loaderContainer'>
                        <CSpinner color="secondary" />
                    </div> :
                        <>
                            {data.map((each) => {
                                return (
                                    <div class='product-listing'>
                                        <div class='product-item'>
                                            <div class='product-image'>
                                                {
                                                    isImageUrl(each?.image ? each.image : config.CIRCLE_ICON) ?
                                                        <img class='productImageMobile' src={each?.image ? each.image : config.CIRCLE_ICON} alt='Product Image' /> :
                                                        <VideoComponent src={each?.image ? each.image : config.CIRCLE_ICON} width={70} height={70} styles={{ background: "#000", borderRadius: 8 }} autoPlay loop muted />
                                                }
                                            </div>
                                            <div class='product-details'>
                                                <div class='product-name FORT12 BOLD'>{each.item}</div>
                                                <div class='price price-color'>{each.mobile}</div>
                                                <div class='stock FORT12'>Total Orders: {each.orderCount}</div>
                                            </div>
                                            <div class='edit-button'>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {data?.length === 0 && <div class='product-name FORT12 BOLD'>{'No records found'}</div>}
                        </>
                }
            </div>
        </div>
    </div>
}

export default CustomerListMobile;