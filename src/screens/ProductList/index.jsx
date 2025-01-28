import React, { Component, Fragment, useEffect } from 'react';

import axios from "axios";

import { notification } from "antd";

import "./style.css"

import DataTable from '../../components/tableUI';

import { getProductColumns } from "./formPayload";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit, faDownload } from '@fortawesome/free-solid-svg-icons';

import { AppSidebar, AppFooter, AppHeader } from '../../components/index'

import { Toaster } from 'react-hot-toast';

import { useNavigate } from "react-router-dom";

import store from '../../store/index';

import _ from 'lodash';

import { fetchProducts } from '../../utils/api.service';

import { renderFilterBox } from '../../utils/utilsUI';

import { CImage, CSpinner } from '@coreui/react'
import { config } from '../../config';
import { getFormattedCurrency, isImageUrl, isMobileView } from '../../utils';
import SearchBox from '../../components/SearchBox/SearchBox';
import VideoComponent from '../../components/VideoComponent/VideoComponent';
import { getServiceURL } from '../../utils/index';
import { useStoreActions, useStoreState } from '../../store/hooks';
class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            page: 1,
            newPerPage: 10,
            data: [],
            isLoaderEnabled: false,
            chosenCategory: [""],
            sort: -1
        };
    }

    delayTimer = null;

    componentDidMount = () => {
        this.handleResize = () => {
            this.setState({ windowWidth: window.innerWidth });
        };
        this.setState({ isLoaderEnabled: _.get(this.props, 'isLoaderEnabled', false), sort: -1 })
        window.addEventListener('resize', this.handleResize);
        this.triggerListOfProducts({});
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    navigateToProducts = () => {
        this.props.navigationToProduct();
    }

    triggerListOfProducts = async ({ categoryId = "", searchText = "", sort = -1 }) => {

        try {

            const shopInfo = store.getState().user.data;

            const storeName = `${_.get(shopInfo, 'existingStoreInfo[0].store.domainName')}`.toLocaleLowerCase();

            this.setState({ loading: true, chosenCategory: [categoryId], searchText, sort });

            const { newPerPage, page } = this.state;

            const productResponse = await fetchProducts({ storeName, limit: newPerPage, page, category: categoryId, searchText, sort });

            let listOfProducts = [];

            const { products = [] , count } = productResponse || {};

            if (_.get(productResponse, 'statusCode') == "200") {

                listOfProducts = products.map((item, index) => {

                    const { discountPrice = 0, price = 0 } = item || {};

                    const discountProductPrice = price - discountPrice;

                    return {
                        item: _.get(item, 'productName'),
                        price: getFormattedCurrency(discountProductPrice),
                        count: _.get(item, 'inventory.quantity'),
                        image: _.get(item, 'images[0]'),
                        isActive: _.get(item, 'isActive'),
                        index,
                        _id: item._id,
                        inventory: item.inventory,
                        orderDetails: item.orderDetails,
                        discountPrice: item.discountPrice,
                        originalPrice: item.price,
                        productDescription: item.productDescription,
                        storeId: item.store,
                        category: item.categoryType
                    }
                })
            }

            this.setState({ totalRows: count, data: listOfProducts, isLoaderEnabled: false ,  loading: false  })

        } catch (error) {

        } finally {
            this.setState({ isLoaderEnabled: false , loading: false })
        }

    }

    shopDetails = store.getState().shop.data;


    updateChosenCategory = (categoryId) => {

        const { sort = -1, searchText = "" } = this.state;

        this.triggerListOfProducts({ categoryId, sort, searchText });
    }

    fetchUsers = async () => {

        this.setState({ loading: true });

        const { chosenCategory, sort = -1 } = this.state;

        const categoryId = _.get(chosenCategory, '[0]', "");

        await this.triggerListOfProducts({ categoryId, sort });
    }

    onChangePage = (page) => {
        this.setState({ page }, () => {
            this.fetchUsers();
        })
    }

    onChangeRowsPerPage = (newPerPage, page) => {
        this.setState({ newPerPage, page }, () =>{
            this.fetchUsers();
        })
    }

    onFilterValueChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
        clearTimeout(this.delayTimer);
        this.delayTimer = setTimeout(() => {
            const { chosenCategory, sort = -1 } = this.state;
            this.triggerListOfProducts({ categoryId: _.get(chosenCategory, '[0]', ''), searchText: value, sort })
        }, 500);
    }

    onApplySortFilter = (sort) => {

        const { chosenCategory, searchText } = this.state;

        const updatedSortValue = sort > 0 ? -1 : 1

        this.triggerListOfProducts({ categoryId: _.get(chosenCategory, '[0]', ''), searchText, sort: updatedSortValue })

    }

    onClearFilterChange = () => {

        this.setState({ searchText: "", chosenCategory: [""], sort: -1 })

        this.triggerListOfProducts({ categoryId: "", searchText: "", sort: -1 })

    }

    onValueChange = (event) => { this.setState({ [event.target.name]: event.target.value }) };


    validateCustomerDetails = (state) => {

        const { customerName = "", customerEmail = "", isGst = "", gstNo = "", panNumber = "", pinCode = "", address = "", phone = "", website = "", notes = "", } = state;

        const mandatoryList = [customerName, customerEmail, isGst, pinCode, address, phone, website, notes];

        isGst === "Yes" ? mandatoryList.push(gstNo) : mandatoryList.push(panNumber);

        return mandatoryList.includes("");
    }

    updateState = (state) => this.setState(state);

    clearAllFormFields = () => {
        this.updateState({
            isEdit: false, loading: false, visible: false, customerName: "", customerEmail: "",
            isGst: "", gstNo: "", panNumber: "", pinCode: "", address: "", phone: "", website: "", notes: "",
        });
    }

    onEdit = (row) => {
        const { customerId, customerName, customerEmail, isGst, gstNo, panNumber, pinCode, address, phone, website, notes } = row;
        this.setState({ visible: true, customerId, customerName, customerEmail, isGst, gstNo, panNumber, pinCode, address, phone, website, notes });
    }

    handleChange = async(row) => {
        const { data } = this.state;

        // Find the index of the row in your data
        const rowIndex = data.findIndex((r) => r.index === row.index);
      
        // Create a copy of the modified row
        const updatedRow = { ...row, isActive: !row.isActive };

        await this.updateProduct(data , rowIndex, updatedRow)
    }

    updateProduct = async (data , rowIndex, updatedRow) => {
        try {
            this.setState({ isLoaderEnabled: true })
            const response = await axios.post(`${getServiceURL()}/product/update`, {
                payload : { isActive: updatedRow.isActive},
                _id: updatedRow._id
            });
            if (response?.data?.statusCode === 200) {
                // Update the state immutably using setState and map
                this.setState({
                    data: data.map((r, index) => (index === rowIndex ? updatedRow : r)),
                    isLoaderEnabled: false
                });
                notification.open({ type: "success", message: "Product Updated successful!" })
            }
        } catch (error) {
            notification.open({ type: "warning", message: "Issue while update products" })
        } finally {
            this.setState({ isLoaderEnabled: false })
        }
    }

    renderTableView = () => {
        const { data = [], totalRows = 0, loading = false, sort } = this.state;

        return <div className="tableBorder">
            {
             this.state.isLoaderEnabled ? <div className='loaderContainer'>
               <CSpinner color="secondary" />
             </div> :
                    <DataTable title={`Manage Products (${_.size(data)})`}
                        onFilterValueChange={this.onFilterValueChange} selectableRows={false} data={data} columns={getProductColumns({ onEdit: this.onEdit , handleChange: this.handleChange})} totalRows={totalRows}
                        loading={loading} onChangePage={this.onChangePage} applyFilter={this.applyFilter} searchText={this.state.searchText}
                        refreshFilter={() => this.triggerListOfProducts({})} subHeader={true} searchBy={"Product"}
                        onChangeRowsPerPage={this.onChangeRowsPerPage} onRowClicked={this.props.navigateToEditView} pagination={true}
                        onClearFilterChange={this.onClearFilterChange} onApplySortFilter={this.onApplySortFilter}
                        sort={sort}
                    />
            }
        </div>
    }

    renderFilterUI = (optional = false) => {

        const { chosenCategory, sort = -1, searchText = "" } = this.state;

        const { categoryList = [] } = this.props || {};

        const shopInfo = store.getState().user.data;

        const storeName = `${_.get(shopInfo, 'existingStoreInfo[0].store.domainName')}`.toLocaleLowerCase();

        return <div className="addNewProductButtonUI">
            <div class="scrollable-container">
                <div className='flex '>
                    {categoryList.map(item => renderFilterBox(_.get(item, 'key'), chosenCategory.includes(_.get(item, 'value', '')), () => this.updateChosenCategory(_.get(item, 'value'))))}
                </div>
            </div>

            <div>
                <button className="addNewProductButton" onClick={() => this.props.fetchProductsList({
                    storeName, searchText, sort, category: _.get(chosenCategory, '[0]', '')
                })}>
                    Report &nbsp;
                    {this.props.reportLoaderStatus ? <CSpinner className='downloadReportContainer' color="secondary" /> : <FontAwesomeIcon icon={faDownload} />}
                </button>
                {optional ? <button className="addNewProductButton" onClick={() => this.navigateToProducts()}> <FontAwesomeIcon icon={faEdit} /> Add New Product</button> : null}
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
                                            <div class='product-image'>
                                                {
                                                    isImageUrl(each.image) ?
                                                        <img class='productImageMobile' src={each.image} alt='Product Image' /> :
                                                        <VideoComponent src={each.image} width={70} height={70} styles={{ background: "#000", borderRadius: 8 }} autoPlay loop muted />
                                                }
                                            </div>
                                            <div class='product-details'>
                                                <div class='product-name FORT12 BOLD'>{each.item}</div>
                                                <div class='price price-color'>{each.price}</div>
                                                <div class='stock FORT12'>Stock: {each.count}</div>
                                            </div>
                                            <div class='edit-button'>
                                                <button onClick={() => this.props.navigateToEditView(each)}
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
                <AppHeader heading={"All Products"} navigateToProductList={this.fetchUsers} showAddProduct={true} showAvatar={false} showBrand={!isMobileView()} />
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
            </div>
        </div>

        </>
    }
}

export default function Customers(props) {

    const navigate = useNavigate();

    let fetchCategoryList = useStoreActions(action => action.shop.fetchCategoryList);

    let fetchProductsList = useStoreActions(action => action.report.fetchProductsList);

    let storeInformation = useStoreState(state => state.shop.data);

    let reportDataStore = useStoreState(state => state.report.data);

    const { isLoading = false } = reportDataStore || {}

    const { categoryList = [] } = storeInformation || {};

    useEffect(() => {
        fetchCategoryList()
    }, [])


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

    return <ProductList
        {...props}
        navigationToProduct={navigateToProduct}
        navigateToProductDetails={navigateToProductDetails}
        navigateToPricing={navigateToPricing}
        categoryList={categoryList}
        fetchProductsList={fetchProductsList}
        reportLoaderStatus={isLoading}
        navigateToEditView={navigateToEditView}
    />;
}
