import React, { Component, Fragment, useEffect } from 'react';

import axios from "axios";

import { notification } from "antd";

import "./style.css"

import DataTable from '../../components/tableUI';

import { getDiscountValue, getFormattedChannelName, getVoucherColumns } from "./formPayload";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit, faDownload } from '@fortawesome/free-solid-svg-icons';

import { AppSidebar, AppFooter, AppHeader } from '../../components/index'

import { Toaster } from 'react-hot-toast';

import { useNavigate } from "react-router-dom";

import store from '../../store/index';

import _ from 'lodash';

import { fetchListOfVouchers } from '../../utils/api.service';

import { renderFilterBox } from '../../utils/utilsUI';

import { CImage, CSpinner } from '@coreui/react'

import { config } from '../../config';

import { isImageUrl, isMobileView } from '../../utils';

import SearchBox from '../../components/SearchBox/SearchBox';

import VideoComponent from '../../components/VideoComponent/VideoComponent';

import { getServiceURL } from '../../utils/index';

import { useStoreActions, useStoreState } from '../../store/hooks';

import VoucherModal from './voucherPopup';

import { FIXED_VALUES } from '../../utils/constants';

const { DISCOUNT_TYPE } = FIXED_VALUES;

class VoucherList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            page: 1,
            newPerPage: 10,
            data: [],
            isLoaderEnabled: false,
            chosenCategory: [],
            sort: -1,
            isModalOpen: false,
            createVoucherLoader: false,
            modalPropsData: {},
            totalRows: 0
        };
    }

    closeModal = () => {
        this.setState({ isModalOpen: false })
    }

    delayTimer = null;

    componentDidMount = () => {
        this.handleResize = () => {
            this.setState({ windowWidth: window.innerWidth });
        };
        this.setState({ isLoaderEnabled: _.get(this.props, 'isLoaderEnabled', false), sort: -1 })
        window.addEventListener('resize', this.handleResize);
        this.triggerListOfVouchers({});
    }

    createVoucherRecord = async (payload, resetState) => {

        try {

            this.setState({ createVoucherLoader: true })

            const shopInfo = store.getState().user.data;

            const storeName = `${_.get(shopInfo, 'existingStoreInfo[0].store.businessName')}`.toLocaleLowerCase();

            const response = await axios.post(`${getServiceURL()}/voucher`, { ...payload, storeName });

            const { statusCode = 500, message = "Issue while create voucher!" } = response.data || {};

            if (statusCode === 200) {

                notification.open({ type: "success", message: "Voucher cretaed successful!" });

                resetState({})

                this.setState({ isModalOpen: false });

                const { chosenCategory, sort = -1 } = this.state;

                const categoryId = _.get(chosenCategory, '[0]', "");

                await this.triggerListOfVouchers({ categoryId, sort });

            }else{

                return notification.open({ type: "warning", message })

            }

        } catch (error) {
            notification.open({ type: "warning", message: _.get(error, 'response.data.message', "Issue while create voucher!") })
        } finally {
            this.setState({ createVoucherLoader: false })
        }
    }

    updateVoucherRecordDetails = async (payload, resetState) => {

        try {

            this.setState({ createVoucherLoader: true })

            const { voucherId } = payload;

            const shopInfo = store.getState().user.data;

            const storeName = `${_.get(shopInfo, 'existingStoreInfo[0].store.businessName')}`.toLocaleLowerCase();

            const updatedPayload = _.omit(payload, 'voucherId');

            const response = await axios.put(`${getServiceURL()}/voucher/${voucherId}`, { ...updatedPayload, storeName });

            const { statusCode = 500, message = "Issue while update voucher!" } = response.data || {};

            if (statusCode === 200) {

                notification.open({ type: "success", message: "Voucher updated successful!" });

                resetState({})

                this.setState({ isModalOpen: false });

                const { chosenCategory, sort = -1 } = this.state;

                const categoryId = _.get(chosenCategory, '[0]', "");

                this.setState({ modalPropsData: {} })

                await this.triggerListOfVouchers({ categoryId, sort });

            }else{

                return notification.open({ type: "warning", message })

            }

        } catch (error) {
            notification.open({ type: "warning", message: _.get(error, 'response.data.message', "Issue while update voucher!") })
        } finally {
            this.setState({ createVoucherLoader: false })
        }
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    triggerListOfVouchers = async ({ categoryId = "", searchText = "", sort = -1 }) => {

        try {

            const shopInfo = store.getState().user.data;

            const storeName = `${_.get(shopInfo, 'existingStoreInfo[0].store.businessName')}`.toLocaleLowerCase();

            const chosenCategory = _.isEmpty(categoryId) ? [""] : [categoryId]

            this.setState({ loading: true, chosenCategory, searchText, sort });

            const { newPerPage, page } = this.state;

            const voucherResponse = await fetchListOfVouchers({ storeName, limit: newPerPage, page, searchText, sort, offerType: chosenCategory });

            let vouchersInfo = [];

            const { listOfVouchers = [], totalRows = 0 } = voucherResponse || {};

            if (_.get(voucherResponse, 'statusCode') == "200") {

                vouchersInfo = listOfVouchers.map((item, index) => {

                    return {
                        voucherId: _.get(item, '_id'),
                        offerName: _.get(item, 'campaignName'),
                        campaignStartDate: _.get(item, 'campaignStartDate'),
                        campaignEndDate: _.get(item, 'campaignEndDate'),
                        offerValue: _.get(item, 'offerValue'),
                        sellingChannel: _.get(item, 'sellingChannel'),
                        offerType: _.get(item, 'offerType'),
                        isActive: _.get(item, 'isActive'),
                        voucherCode: _.get(item, 'voucherCode'),
                        index
                    }
                })
            }

            this.setState({ totalRows: totalRows, data: vouchersInfo, isLoaderEnabled: false, loading: false, chosenCategory })

        } catch (error) {

        } finally {
            this.setState({ isLoaderEnabled: false, loading: false })
        }

    }

    shopDetails = store.getState().shop.data;


    updateChosenCategory = (categoryId) => {

        const { sort = -1, searchText = "" } = this.state;

        this.triggerListOfVouchers({ categoryId, sort, searchText });
    }

    fetchVouchers = async () => {

        this.setState({ loading: true });

        const { chosenCategory, sort = -1 } = this.state;

        const categoryId = _.get(chosenCategory, '[0]', "");

        await this.triggerListOfVouchers({ categoryId, sort });
    }

    onChangePage = (page) => {
        this.setState({ page }, () => {
            this.fetchVouchers();
        })
    }

    onChangeRowsPerPage = (newPerPage, page) => {
        this.setState({ newPerPage, page }, () => {
            this.fetchVouchers();
        })
    }

    onFilterValueChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
        clearTimeout(this.delayTimer);
        this.delayTimer = setTimeout(() => {
            const { chosenCategory, sort = -1 } = this.state;
            this.triggerListOfVouchers({ categoryId: _.get(chosenCategory, '[0]', ''), searchText: value, sort })
        }, 500);
    }

    onApplySortFilter = (sort) => {

        const { chosenCategory, searchText } = this.state;

        const updatedSortValue = sort > 0 ? -1 : 1

        this.triggerListOfVouchers({ categoryId: _.get(chosenCategory, '[0]', ''), searchText, sort: updatedSortValue })

    }

    onClearFilterChange = () => {

        this.setState({ searchText: "", chosenCategory: [], sort: -1 })

        this.triggerListOfVouchers({ categoryId: "", searchText: "", sort: -1 })

    }

    onValueChange = (event) => { this.setState({ [event.target.name]: event.target.value }) };

    updateState = (state) => this.setState(state);

    onEdit = (row) => {
        const { customerId, customerName, customerEmail, isGst, gstNo, panNumber, pinCode, address, phone, website, notes } = row;
        this.setState({ visible: true, customerId, customerName, customerEmail, isGst, gstNo, panNumber, pinCode, address, phone, website, notes });
    }

    handleChange = async (row) => {
        const { data } = this.state;

        // Find the index of the row in your data
        const rowIndex = data.findIndex((r) => r.index === row.index);

        // Create a copy of the modified row
        const updatedRow = { ...row, isActive: !row.isActive };

        await this.updateVoucherRecord(data, rowIndex, updatedRow)
    }

    updateVoucherRecord = async (data, rowIndex, updatedRow) => {
        try {
            this.setState({ isLoaderEnabled: true })
            const response = await axios.put(`${getServiceURL()}/voucher/${updatedRow.voucherId}`, { isActive: updatedRow.isActive });
            if (response?.data?.statusCode === 200) {
                // Update the state immutably using setState and map
                this.setState({
                    data: data.map((r, index) => (index === rowIndex ? updatedRow : r)),
                    isLoaderEnabled: false
                });
                notification.open({ type: "success", message: "Voucher Updated successful!" })
            }
        } catch (error) {
            notification.open({ type: "warning", message: "Issue while update voucher information" })
        } finally {
            this.setState({ isLoaderEnabled: false })
        }
    }

    onCLickOpenModelForEdit = (data) =>{

        this.setState({ isModalOpen: true, modalPropsData: data });

    }

    renderTableView = () => {

        const { data = [], totalRows = 0, loading = false, sort } = this.state;

        return <div className="tableBorder">
            {
                this.state.isLoaderEnabled ? <div className='loaderContainer'>
                    <CSpinner color="secondary" />
                </div> :
                    <DataTable title={`Manage Discounts (${totalRows})`}
                        onFilterValueChange={this.onFilterValueChange} selectableRows={false} data={data} columns={getVoucherColumns({ onEdit: this.onEdit, handleChange: this.handleChange })} totalRows={totalRows}
                        loading={loading} onChangePage={this.onChangePage} applyFilter={this.applyFilter} searchText={this.state.searchText}
                        refreshFilter={() => this.triggerListOfVouchers({})} subHeader={true} searchBy={"Voucher"}
                        onChangeRowsPerPage={this.onChangeRowsPerPage} onRowClicked={this.onCLickOpenModelForEdit} pagination={true}
                        onClearFilterChange={this.onClearFilterChange} onApplySortFilter={this.onApplySortFilter}
                        sort={sort}
                    />
            }
        </div>
    }

    renderFilterUI = (optional = false) => {

        const { chosenCategory = [], sort = -1, searchText = "" } = this.state;

        const { filters = [] } = this.props;

        return <div className="addNewProductButtonUI">
            <div class="scrollable-container">
                <div className='flex '>
                    {filters.map(item => renderFilterBox(_.get(item, 'key'), chosenCategory.includes(_.get(item, 'value', '')), () => this.updateChosenCategory(_.get(item, 'value'))))}
                </div>
            </div>
        </div>
    }

    renderMobileVersion = () => {
        const { data = [] } = this.state;
        return <div className="layout-alignment">
            <div id="dataTable">
                <div className='margin-bot-8 flex'>
                    <span className='width85'>
                        <SearchBox />
                    </span>
                    <span className='filterIconContainer'>
                        <CImage align="center" src={config.FILTER_ICON} />
                    </span>
                </div>
                {this.renderFilterUI(false)}
                <div className='margin-top-5'>
                    {
                        this.state.isLoaderEnabled ? <div className='loaderContainer'>
                            <CSpinner color="secondary" />
                        </div> :
                            data.map((each) => {
                                return (
                                    <div class='product-listing'>
                                        <div class='product-item'>

                                            <div class='product-details'>
                                                <div class='product-name FORT12 BOLD'>{each.offerName}</div>
                                                <div class='price price-color'>{getDiscountValue(each)}</div>
                                                <div class='stock FORT12'>{getFormattedChannelName(each.sellingChannel)}</div>
                                            </div>
                                            <div class='edit-button'>
                                                <button onClick={() => this.onCLickOpenModelForEdit(each)}
                                                    class='btn btn-primary px-12 primary-color button FORT12 editButtonStyle'>
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    }

    renderDeskTopVersion = () => {
        return <div className="layout-alignment" id="dataTable">
            {this.renderFilterUI(true)}
            {this.renderTableView()}
        </div>
    }

    render() {

        return <> <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader
                    heading={"Manage Discounts and Offers"}
                    showAvatar={false}
                    showBrand={!isMobileView()}
                    showAddDiscount={!isMobileView()}
                    openDiscountModal={() => this.setState({ modalPropsData: {}, isModalOpen: true })}
                />
                <div className={`body flex-grow-1`}>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                    <Fragment>
                        {this.state.windowWidth <= 768 ? this.renderMobileVersion() : this.renderDeskTopVersion()}
                    </Fragment>
                </div>
                {/* <AppFooter
                    topLevelButtonText={"13 DAYS LEFT IN FREE TRAIL"}
                    topLevelButtonAction={() => { }}
                    secondaryButtonText={"GO PREMIUM"}
                    secondaryButtonAction={() => this.props.navigateToPricing()}
                /> */}

                <VoucherModal
                    isModalOpen={this.state.isModalOpen}
                    closeModal={this.closeModal}
                    updateVoucherRecordDetails={this.updateVoucherRecordDetails}
                    loaderStatus={this.state.createVoucherLoader}
                    modalPropsData={this.state.modalPropsData}
                    updateVoucherRecord={this.updateVoucherRecord}
                    createVoucherRecord={this.createVoucherRecord}
                />
            </div>
        </div>

        </>
    }
}

export default function VoucherContainer(props) {

    const navigate = useNavigate();

    const DEFAULT_FILTERS = [
        { key: "All", value: "" },
        { key: "Percentage Discounts", value: DISCOUNT_TYPE.PERCENT },
        { key: "Flat Discounts", value: DISCOUNT_TYPE.FLAT },
    ]

    let fetchVouchersList = useStoreActions(action => action.report.fetchVouchersList);

    let reportDataStore = useStoreState(state => state.report.data);

    const { isLoading = false } = reportDataStore || {}

    const navigateToEditView = (payload) => {
        return navigate('/edit-product', { state: payload })
    }

    const navigateToProduct = () => {
        return navigate('/products')
    }

    const navigateToProductDetails = () => {
        return navigate('/order')
    }

    const navigateToPricing = () => {
        return navigate('/pricing-list')
    }

    return <VoucherList
        {...props}
        navigationToProduct={navigateToProduct}
        navigateToProductDetails={navigateToProductDetails}
        navigateToPricing={navigateToPricing}
        fetchVouchersList={fetchVouchersList}
        filters={DEFAULT_FILTERS}
        reportLoaderStatus={isLoading}
        navigateToEditView={navigateToEditView}
    />;
}
