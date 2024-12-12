import React, { Fragment, useEffect, useState } from 'react';
import { AppSidebar, AppFooter, AppHeader } from '../../components/index'
import './home.css';
import { Toaster } from 'react-hot-toast';
import { renderHomeTabUI } from '../../utils/utilsUI';
import { CalendarFilter } from '../../components/Calander';
import { ReceivedList } from '../OrderList/List/received';
import { Circle, Line } from 'rc-progress';
import { config } from '../../config';
import { getFormattedCurrency } from '../../utils';
import { useStoreState , useStoreActions } from '../../store/hooks';

const homeConstants = {
    STORE_BUTTON_TEXT: 'Go Store',
    EMPTY_DASH_TITLE_TEXT: 'Yeah! Lets make some insights',
    EMPTY_DASH_TEXT: 'Complete you store setup by adding products and publishing them'
}


const totalOrdersReceivedCardView = (totalOrderReceivedToday) => {

    const { totalOrders = 13, totalOrderCompleted = 9 } = totalOrderReceivedToday || {};

    const completedPercent = ((totalOrderCompleted / totalOrders) * 100);

    return <div className='totalReceivedCardViewContainer'>

        <div className='totalReceivedLeftViewCard'>
            <div className='progressViewContainer'>
                <Circle percent={completedPercent} strokeWidth={4} trailWidth={4} strokeColor="#6E3BFF" trailColor="#FFFFFF" prefixCls={'demo'} />
                <label className='progressPercentViewLabel'>{totalOrders}</label>
            </div>
        </div>

        <div className='totalReceivedRightViewCard'>
            <div className='totalOrderReceivedLabelContainer'>Today’s total received.</div>
            <div className='totalOrderReceivedDescriptionLabelContainer'>{`${totalOrderCompleted} of ${totalOrders} completed`}</div>
        </div>
    </div>
}

const totalItemsSoldCardView = (totalSalesInfo) => {

    const { totalItems = 100, totalOrderCount = 0, lastSalesRecordDuration = '', totalSales = "0" } = totalSalesInfo || {}

    const completedPercent = ((totalOrderCount / totalItems) * 100);

    return <div className='totalItemsSoldCardViewContainer'>

        <div className='totalItemSoldTopViewContainer'>
            <div className='totalItemsLeftContainer'>
                <img src={config.TIME_CIRCLE_ICON} />
            </div>
            <div className='totalItemsCenterContainer'>
                <div className='totalSalesLabel'>{`Total ${totalOrderCount} Items Sold`}</div>
                <div className='totalSalesInDaysLabel'>{`${lastSalesRecordDuration}`}</div>
            </div>
            <div className="totalItemsRightContainer">
                <div className='totalSalesCostLabel'>{`${getFormattedCurrency(totalSales)}`}</div>
            </div>
        </div>

        <div className='salesLineProgressContainer'>
            <Line percent={completedPercent} strokeWidth={2} trailWidth={2} strokeColor="#6E3BFF" trailColor="#EAECF0" />
        </div>

    </div>

}


const renderMobileTabUI = ({ storeName, totalSalesInfo, totalOrderReceivedToday, activeTab, activeTabValue, updateDashboardActiveTab }) => {
    return <Fragment>
        <div className="mobileOrderLayout">
            {totalItemsSoldCardView(totalSalesInfo)}
            {renderHomeTabUI({ activeTab, updateDashboardActiveTab })}
            {totalOrdersReceivedCardView(totalOrderReceivedToday)}
            {/* <CalendarFilter />  */}
            <div className='subSectionMobileLayout'>
                <ReceivedList storeName={storeName} activeTabValue={activeTabValue}  showOrderStatus={false}
                    activeStatusTab={activeTab}/>
            </div>
        </div>
    </Fragment>
}

const HomeMobile = ({
    userName,
    storeLink,
    greetings,
    storeName
}) => {


    let dashboardDetails = useStoreState(state => state.adminOrder.data.dashboard);
  
    let fetchDashboardOrderDetails = useStoreActions(action => action.adminOrder.fetchDashboardOrderDetails);

    let updateDashboardActiveTab = useStoreActions(action => action.adminOrder.updateDashboardActiveTab);

    const { totalSalesInfo, totalOrderReceivedToday, activeTab , activeTabValue } = dashboardDetails || {};

    useEffect(() => {
        fetchDashboardOrderDetails({ storeName })
    }, [])

    return (
        <div className='whiteBgColor'>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader
                    heading={greetings}
                    RightComponent={() => <VisitStoreButton link={storeLink} />}
                    showBrand={false}
                    showAvatar={false}
                />

                {renderMobileTabUI({ storeName, totalSalesInfo, totalOrderReceivedToday, activeTab, updateDashboardActiveTab , activeTabValue })}

                <AppFooter
                    UpgradeBtnStyle={{ borderRadius: 20, width: '70%', fontWeight: 'bold' }}
                />
            </div>
        </div>
    )
}

export default HomeMobile

const VisitStoreButton = ({ link }) => {
    return (
        <div onClick={() => {
            window.open(link, '_blank');
        }} className='visitButtonContainer'>
            <label>{homeConstants.STORE_BUTTON_TEXT}</label>
        </div>
    )
}

