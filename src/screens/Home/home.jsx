import React, { useEffect } from 'react';

import { AppSidebar, AppFooter, AppHeader } from '../../components/index'

import './home.css';

import { Toaster } from 'react-hot-toast';

import _ from 'lodash';

import { useStoreState, useStoreActions } from '../../store/hooks';


import { capitalizeFirstLetter, isMobileView } from '../../utils';

import HomeMobile from './home.mobile';

import { HomeDesktopUI } from './home.desktop';

const Home = () => {

  const userInfo = useStoreState(state => state.user); 

  const { firstName, lastName, existingStoreInfo = [] } = userInfo.data;

  const storeInfo = _.get(existingStoreInfo, "[0].store") || {};

  const { businessName = "", _id: storeId = "", addressInfo = {} } = storeInfo || {}

  const userName = _.isEmpty(firstName) ? "Welcome" : `${firstName} ${lastName}`;

  const storeLink = `${window.location?.origin}/store/${businessName}`;

  const greetings = `Hi, ${capitalizeFirstLetter(businessName)}`;

  let updateHomePageOrders = useStoreActions(action => action.adminOrder.updateHomePageOrders);

  let updateStoreAddressInformation = useStoreActions(action => action.user.updateStoreAddressInformation);

  const resetOrderState = () => {
    updateHomePageOrders({
      orderList: [],
      totalOrderCount: 0,
      isLoaderEnabled: false,
      currentPage: 0,
      totalPages: 1
    })
  }

  useEffect(() => {
    resetOrderState()
    return () => {
      resetOrderState()
    }
  }, [])

  return (isMobileView() ? <HomeMobile
    userName={userName}
    storeLink={storeLink}
    greetings={greetings}
    storeName={businessName}
  /> :

    <HomeDesktopUI
      userName={userName}
      storeLink={storeLink}
      greetings={greetings}
      storeName={businessName}
      addressInfo={addressInfo}
      storeId={storeId}
      updateStoreAddressInformation={updateStoreAddressInformation}
    />
   
  )
}

export default Home
