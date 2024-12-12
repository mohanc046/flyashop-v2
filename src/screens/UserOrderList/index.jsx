import React, { Fragment, useEffect } from 'react';

import "../ProductList/style.css"

import DataTable from '../../components/tableUI';

import { getProductColumns } from "./formPayload";

import { faAngleLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { AppSidebar, AppFooter, AppHeader } from '../../components/index'

import { Toaster } from 'react-hot-toast';

import { useNavigate, useParams } from "react-router-dom";

import { getTimeAgo, isImageUrl, isMobileView } from '../../utils';

import { ReceivedList } from './List/received';

import CustomHeader from '../../components/CustomHeader';

import { useStoreState, useStoreActions } from '../../store/hooks';

import _ from 'lodash';

import { CSpinner } from '@coreui/react';

import { EmptyScreen } from '../UserCart/UserCart';

export default function UserOrderList() {

    const navigate = useNavigate();

    const { storeName } = useParams();

    let cartDetails = useStoreState(state => state.cart.data);

    const userStore = useStoreState(state => state.user.data);

    const metaData = useStoreState(state => state.metaData.data);

    const { storeBasePath = "" } = metaData;

    let fetchPlacedOrders = useStoreActions(action => action.cart.fetchPlacedOrders);

    const { authToken = "" } = userStore;

    useEffect(() => {

        fetchPlacedOrders({ storeName });

    }, [authToken])

    const { orderList = [], isLoaderEnabled = false } = cartDetails || {}


    const navigateToOrderDetails = () => {
        return navigate('/order')
    }

    const state = {
        page: 1,
        newPerPage: 10,
        data: []
    }

    const triggerListOfProducts = () => {

        const { newPerPage, page } =  state;

        //  fetchUsers(newPerPage, page);
    }

    const applyFilter = () => {
        const { searchTerm } =  state;

        // if (!searchTerm) return showGrowlMessage({ growlMsg: "Search Customers By Customer Name", growlStatus: "error", updateState:  updateState });

        //  triggerListOfProducts();
    }

    const fetchUsers = async (newPerPage, page) => {

        const { searchTerm } =  state;

        // const { result = [], totalRows = 10 } = await fetchCustomers({ pageNumber: page, limit: newPerPage, searchTerm });

    }

    const onChangePage = (page) => {
        //  fetchUsers(10, page);
    }

    const onChangeRowsPerPage = (newPerPage, page) => {
        //  fetchUsers(newPerPage, page);
    }

    const onFilterValueChange = (event) => {

    }

    const onValueChange = (event) => {
    };


    const validateCustomerDetails = (state) => {

        const { customerName = "", customerEmail = "", isGst = "", gstNo = "", panNumber = "", pinCode = "", address = "", phone = "", website = "", notes = "", } = state;

        const mandatoryList = [customerName, customerEmail, isGst, pinCode, address, phone, website, notes];

        isGst === "Yes" ? mandatoryList.push(gstNo) : mandatoryList.push(panNumber);

        return mandatoryList.includes("");
    }

    const updateState = (state) => (state);

    const clearAllFormFields = () => {
         updateState({
            isEdit: false, loading: false, visible: false, customerName: "", customerEmail: "",
            isGst: "", gstNo: "", panNumber: "", pinCode: "", address: "", phone: "", website: "", notes: "",
        });
    }

    const onEdit = (row) => {
        const { customerId, customerName, customerEmail, isGst, gstNo, panNumber, pinCode, address, phone, website, notes } = row;
    }

    const renderFilterBox = (name, isActive = false) => {
        return <div><div name="searchTerm" className={`${isActive ? "activeBox searchTableInputBoxSort" : "searchTableInputBoxSort"}`} placeholder={`Sort`}>{name}</div></div>
    }

    const renderWebUI = () => {

        const { data = [], totalRows = 0, loading = false } = state;

        const totalOrders = _.size(orderList);

        let orderDetails = orderList.map(item => {

            let listOfProductName = _.map(_.get(item, 'products', []), entry => _.get(entry, 'product.productName', `${item.orderId}`));

            return {

                item: listOfProductName,

                orderId : item.orderId,

                totalCost: item.totalOrderCost,
                
                status: item.status,

                timing: getTimeAgo(item.createdDate),

                isImage: isImageUrl(_.get(item, 'products.[0].product.images.[0]')),

                image: _.get(item, 'products.[0].product.images.[0]'),

                shippingAddress: item.shippingAddress
            }

        })

        return <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader heading={"All Orders"} />
                <div className={`body flex-grow-1`}>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                    <Fragment>
                        <div className="layout-alignment" id="dataTable">
                            <div className="addNewProductButtonUI">
                                <div>
                                    {/* <div className='flex'>
                                        { renderFilterBox('All', true)}
                                        { renderFilterBox('Pending')}
                                        { renderFilterBox('Accepted')}
                                        { renderFilterBox('Shipped')}
                                        { renderFilterBox('Delivered')}
                                        { renderFilterBox('Other filters')}
                                    </div> */}
                                </div>
                            </div>
                            <div className="tableBorder">
                                {
                                    isLoaderEnabled ?
                                        <div className='loaderContainer'>
                                            <CSpinner color="secondary" />
                                        </div>
                                        : _.isEmpty(orderDetails) ? EmptyScreen({}) :
                                            <DataTable title={`Orders (${totalOrders})`}
                                                onFilterValueChange={onFilterValueChange} selectableRows={false} data={orderDetails} columns={getProductColumns({ onEdit: onEdit })} totalRows={totalOrders}
                                                loading={loading} onChangePage={onChangePage} applyFilter={applyFilter}
                                                refreshFilter={triggerListOfProducts} subHeader={true} searchBy={"Order ID, Name or Name"}
                                                onChangeRowsPerPage={onChangeRowsPerPage} pagination={true} onRowClicked={navigateToOrderDetails} />
                                }
                            </div>
                        </div>
                    </Fragment>
                </div>
                <AppFooter />
            </div>
        </div>
    }

    const renderMobileTabUI = () => {
        return <Fragment>
            <div className="mobileOrderLayout">
                <div className='userOrderSectionMobileLayout'>
                    {
                        isLoaderEnabled ? <div className='loaderContainer'>
                            <CSpinner color="secondary" />
                            </div>
                             :
                            <ReceivedList orderList={orderList} />
                    }
                </div>
            </div>
        </Fragment>
    }

    const renderMobileUI = () => {
        return <div>
            {/* <AppSidebar /> */}
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <CustomHeader heading={"Order"} leftNavIcon={faAngleLeft} action={storeBasePath ? () => navigate(storeBasePath) : () => navigate(-1)} />
                <div className={`body flex-grow-1`}>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                    { renderMobileTabUI()}
                </div>
            </div>
        </div>
    }

    const { data = [], totalRows = 0, loading = false } = state;

    return (<>
        {
            isMobileView() ? renderMobileUI() : renderWebUI()
        }
    </>
    )
}