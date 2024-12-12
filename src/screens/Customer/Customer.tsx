import React, { useState, useEffect } from 'react';

import "../ProductList/style.css"

import DataTable from '../../components/tableUI';

import { getProductColumns } from "./formPayload";

import { AppSidebar, AppFooter, AppHeader } from '../../components/index'

import { Toaster } from 'react-hot-toast';

import { useNavigate } from "react-router-dom";

import store from '../../store/index';

import _ from 'lodash';

import { getCustomersByUserId } from '../../utils/api.service';

import { CSpinner } from '@coreui/react'
import { isMobileView } from '../../utils';
import CustomerListMobile from './Mobile';
import { CustomerListDesktop } from './Desktop';


const CustomerList = ({
    navigationToProduct,
    navigateToProductDetails,
    navigateToPricing,
    ...props
}) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [page, setPage] = useState(1);
    const [newPerPage, setNewPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [isLoaderEnabled, setIsLoaderEnabled] = useState(false);
    const [chosenCategory, setChosenCategory] = useState([""]);
    const [sort, setSort] = useState(-1);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredUsers, setFilterdUsers] = useState([]);

    const isMobile = windowWidth <= 768;


    useEffect(() => {
        fetchProductsData();
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setFilterdUsers(data)
    }, [data])

    useEffect(() => {
        fetchProductsData();
        fetchUsers();
    }, [page, newPerPage, chosenCategory])

    useEffect(() => {
        if (searchText === '') {
            setFilterdUsers(data); // Reset to original data when search text is empty
        } else {
            const searchedUsers = data.filter((row) =>
                row.item.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilterdUsers(searchedUsers);
        }
    }, [searchText, data]);


    const fetchProductsData = async () => {
        try {
            const shopInfo = store.getState().user.data;
            const storeName = `${_.get(shopInfo, 'existingStoreInfo[0].store.businessName')}`.toLocaleLowerCase();
            setIsLoaderEnabled(true);


            const productResponse = await getCustomersByUserId({ storeName, limit: newPerPage, page });

            let listOfProducts = [];
            const { orders = [], count, statusCode } = productResponse || {};

            if (_.get(productResponse, 'statusCode') === 200) {
                listOfProducts = orders.map(item => ({
                    item: _.get(item, 'userId.email'),
                    mobile: _.get(item, 'mobile') || '-',
                    city: _.get(item, 'shippingAddress.state'),
                    pinCode: _.get(item, 'shippingAddress.pinCode'),
                    orderCount: _.get(item, 'totalOrderCost'),
                    salesCount: '-',
                }));
            }

            setTotalRows(count);
            setData(listOfProducts);
            setIsLoaderEnabled(false);
            setLoading(false);
        } catch (error) {
            // Handle error
        } finally {
            setIsLoaderEnabled(false);
            setLoading(false);
        }
    };

    const {data: shopDetails = []} = store.getState();

    const applyFilter = () => {
    }

    const fetchUsers = async () => {
        setLoading(true)
        await fetchProductsData();
    }

    const onChangePage = (page) => {
        setPage(page);
    }

    const onChangeRowsPerPage = (newPerPage, page) => {
        setNewPerPage(newPerPage)
        setPage(page)
    }

    const onEdit = (row) => {
        // nothing
    };

    const onApplySortFilter = (sort) => {
        fetchProductsData()
    }

    const onClearFilterChange = () => {
        setSearchText('');
        setChosenCategory('');
        setSort(-1);
    };

    const handleSearchFilter = (event) => {
        const { value } = event.target ?? {};
        setSearchText(value)
    }


    const renderTableView = () => {

        const tableContent = isLoaderEnabled ? (
            <div className="loaderContainer">
                <CSpinner color="secondary" />
            </div>
        ) : (
            <DataTable
                title={`Manage Products (${data.length})`}
                selectableRows={false}
                data={filteredUsers}
                columns={getProductColumns({ onEdit })}
                totalRows={totalRows}
                loading={loading}
                onChangePage={onChangePage}
                applyFilter={applyFilter}
                searchText={searchText}
                refreshFilter={fetchProductsData}
                subHeader={true}
                searchBy={"Product"}
                onChangeRowsPerPage={onChangeRowsPerPage}
                onRowClicked={navigateToProductDetails}
                pagination={true}
                onClearFilterChange={onClearFilterChange}
                onApplySortFilter={onApplySortFilter}
                sort={sort}
                onFilterValueChange={handleSearchFilter}
            />
        );

        return <div className="tableBorder">{tableContent}</div>;
    };

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader heading={"All Customers"} showAddProduct={false} showAvatar={!isMobileView()} showBrand={!isMobileView()} />
                <div className={`body flex-grow-1`}>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                    <>
                        {isMobile ?
                            <CustomerListMobile
                                data={filteredUsers}
                                isLoaderEnabled={isLoaderEnabled}
                                handleSearchFilter={handleSearchFilter}
                            />
                            : <CustomerListDesktop
                                renderTableView={renderTableView}
                            />}
                    </>
                </div>
                {/* <AppFooter
                    topLevelButtonText={"13 DAYS LEFT IN FREE TRAIL"}
                    topLevelButtonAction={() => { }}
                    secondaryButtonText={"GO PREMIUM"}
                    secondaryButtonAction={navigateToPricing}
                /> */}
            </div>
        </div>
    )
}

export default function Customers(props) {

    const navigate = useNavigate();

    const navigateToProduct = () => {
        return navigate('/products')
    }

    const navigateToProductDetails = () => {
        return navigate('/order')
    }

    const navigateToPricing = () => {
        return navigate('/pricing-list')
    }

    return <CustomerList {...props} navigationToProduct={navigateToProduct} navigateToProductDetails={navigateToProductDetails} navigateToPricing={navigateToPricing} />;
}
