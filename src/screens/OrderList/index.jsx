import React, { Component, Fragment, useEffect } from "react";

import moment from "moment";

import { ArrowRightOutlined, HistoryOutlined } from "@ant-design/icons";

import "../ProductList/style.css";

import "./orderList.css";

import axios from "axios";

import DataTable from "../../components/tableUI";

import { getProductColumns } from "./formPayload";

import { AppSidebar, AppFooter, AppHeader } from "../../components/index";

import { Toaster } from "react-hot-toast";

import { notification } from "antd";

import { useNavigate } from "react-router-dom";

import { getFormattedCurrency, isMobileView } from "../../utils";

import { renderFilterBox, renderOrderTabUI } from "../../utils/utilsUI";

import { ReceivedList } from "./List/received";

import { CalendarFilter } from "../../components/Calander";

import { useStoreState, useStoreActions } from "../../store/hooks";

import _ from "lodash";

import { CSpinner } from "@coreui/react";

import { getServiceURL } from "../../utils";

import { Modal } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faDownload } from "@fortawesome/free-solid-svg-icons";

class List extends Component {
  state = {
    page: 1,
    newPerPage: 10,
    isLoaderEnabled: false,
    loading: false,
    data: [],
    storeName: "",
    chosenCategory: ["ALL"],
    searchText: "",
    totalRows: 0,
    sort: -1,
    isModalOpen: false,
    remarks: "",
    buttonName: "Submit",
  };

  delayTimer = null;

  componentDidMount() {
    const storeName = _.get(this.props, "storeName", "");
    this.setState({
      ...this.state,
      data: [],
      isLoaderEnabled: _.get(this.props, "isLoaderEnabled", false),
      storeName,
      chosenCategory: ["ALL"],
    });
    this.triggerListOfProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.storeName !== this.props.storeName) {
      this.setState(
        {
          storeName: this.props.storeName,
        },
        () => {
          this.triggerListOfProducts();
        }
      );
    }
  }

  updateChosenCategory = (categoryId) => {
    const { newPerPage, page, searchText, sort } = this.state;

    this.fetchUsers({
      newPerPage,
      page,
      category: [categoryId],
      searchText,
      sort,
    });
  };

  updateModel = (row, status) => {
    const config = {
      Accept: "Do you want to accept the order?",
      Reject: "Do you want to reject the order?",
      Ship: "Do you want to ship the order?",
      Cancel: "Do you want to cancel the order?",
      Delivery: "Do you want to delivery the order?",
      Track: "Do you want to add the tracking code?",
    };
    const statusMapping = {
      Accept: "ACCEPTED",
      Reject: "REJECTED",
      Ship: "SHIPPED",
      Cancel: "CANCELLED",
      Delivery: "DELIVERED",
      Track: "Add",
      Activity: "Activity",
    };
    this.setState({
      statusHistory: row.statusHistory,
      trackingId: row.trackingId ? row.trackingId : "",
      remarks: "",
      decision: "",
      orderId: row.orderId,
      status: row.status,
      fieldName: statusMapping[status],
      isModalOpen: true,
      message: config[status] || "Do You Want To Proceed?",
      buttonName: status,
    });
  };

  showModal = (row, status) => this.updateModel(row, status);

  handleOk = async () => {
    try {
      const { remarks, decision, orderId, status, trackingId, fieldName } =
        this.state;
      if (fieldName === "Activity") {
        return this.setState({ isModalOpen: false });
      }
      if (decision === "Add" && !trackingId) {
        return notification.open({
          type: "error",
          message: "Kindly Enter The Tracking Code",
        });
      } else if (decision === "REJECTED") {
        if (!remarks)
          return notification.open({
            type: "error",
            message: "Kindly Enter the Remarks",
          });
      } else if (!decision) {
        return notification.open({
          type: "error",
          message: "Kindly Enter All the Required Field",
        });
      }
      const payload = {
        orderId,
        decision,
        remarks,
        status,
        trackingId,
      };
      let URL = getServiceURL();

      this.setState({ isLoaderEnabled: true });

      let orderResponse = await axios.post(`${URL}/order/updateOrderStatus`, {
        ...payload,
      });

      const { statusCode } = orderResponse?.data || {};

      this.setState({ isModalOpen: false });

      if (statusCode === 200) {
        this.triggerListOfProducts();
        return notification.open({
          type: "success",
          message: "Updated Successfully",
        });
      }
      return notification.open({
        type: "error",
        message: "Error While Updating status",
      });
    } catch (error) {
      return notification.open({
        type: "error",
        message: "Error While Updating status",
      });
    } finally {
      this.setState({ isLoaderEnabled: false });
    }
  };

  handleCancel = () => this.setState({ isModalOpen: false });

  triggerListOfProducts = () => {
    const { newPerPage, page, sort = -1 } = this.state;

    this.setState({ totalRows: 0 });

    this.fetchUsers({ newPerPage, page, sort, category: ["ALL"] });
  };

  applyFilter = () => {
    this.triggerListOfProducts();
  };

  fetchUsers = async ({ newPerPage, page, category = [""], sort }) => {
    this.setState({ loading: true });

    const { searchText } = this.state;

    await this.fetchOrders({
      pageNumber: page,
      limit: newPerPage,
      category,
      searchText,
      sort,
    });
  };

  async fetchOrders({
    limit,
    pageNumber,
    category = [""],
    searchText = "",
    sort = -1,
  }) {
    const categoryType = category;

    this.setState({ chosenCategory: categoryType, sort });

    let URL = getServiceURL();

    const storeName = _.get(this.props, "storeName", "");

    let orderResponse = await axios.get(
      `${URL}/order/store/${storeName}?page=${pageNumber}&itemsPerPage=${limit}&category=${categoryType}&searchText=${searchText}&sort=${sort}`
    );

    const { orderList = [], totalOrderCount = 0 } = orderResponse?.data || {};

    const data = [];

    for (let index = 0; index < orderList.length; index++) {
      const {
        status,
        totalOrderCost,
        orderId,
        products,
        _id,
        shippingAddress = {},
        trackingId = "",
        statusHistory = [],
      } = orderList[index];
      const image = _.get(products, "[0].product.images[0]");
      const productName = _.get(products, "[0].product.productName");
      const { state = "", pinCode = "" } = shippingAddress || {};
      data.push({
        orderId,
        status,
        price: getFormattedCurrency(totalOrderCost),
        action: status,
        image,
        productName,
        location: `${state}, ${pinCode}`,
        _id,
        trackingId,
        statusHistory,
      });
    }
    this.setState({
      data,
      isLoaderEnabled: false,
      loading: false,
      totalRows: totalOrderCount,
    });
  }

  onApplySortFilter = (sort) => {
    const { chosenCategory, searchText, newPerPage, page } = this.state;

    const updatedSortValue = sort > 0 ? -1 : 1;

    this.fetchUsers({
      newPerPage,
      page,
      category: chosenCategory,
      searchText,
      sort: updatedSortValue,
    });
  };

  onClearFilterChange = () => {
    this.setState({
      searchText: "",
      chosenCategory: [""],
      sort: -1,
      loading: true,
    });

    this.fetchOrders({
      limit: 10,
      pageNumber: 1,
      category: [""],
      searchText: "",
      sort: -1,
    });
  };

  onChangePage = (page) => {
    const { chosenCategory, newPerPage, sort } = this.state;

    this.fetchUsers({ newPerPage, page, category: chosenCategory, sort });
  };

  onChangeRowsPerPage = () => {
    const { chosenCategory, newPerPage, sort } = this.state;

    this.fetchUsers({ newPerPage, page, category: chosenCategory, sort });
  };

  onFilterValueChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(() => {
      const { newPerPage, page, chosenCategory, sort = -1 } = this.state;
      this.fetchUsers({
        newPerPage,
        page,
        category: chosenCategory,
        searchText: value,
        sort,
      });
    }, 500);
  };

  onValueChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateCustomerDetails = (state) => {
    const {
      customerName = "",
      customerEmail = "",
      isGst = "",
      gstNo = "",
      panNumber = "",
      pinCode = "",
      address = "",
      phone = "",
      website = "",
      notes = "",
    } = state;

    const mandatoryList = [
      customerName,
      customerEmail,
      isGst,
      pinCode,
      address,
      phone,
      website,
      notes,
    ];

    isGst === "Yes" ? mandatoryList.push(gstNo) : mandatoryList.push(panNumber);

    return mandatoryList.includes("");
  };

  updateState = (state) => this.setState(state);

  clearAllFormFields = () => {
    this.updateState({
      isEdit: false,
      loading: false,
      visible: false,
      customerName: "",
      customerEmail: "",
      isGst: "",
      gstNo: "",
      panNumber: "",
      pinCode: "",
      address: "",
      phone: "",
      website: "",
      notes: "",
    });
  };

  onEdit = (row) => {
    const {
      customerId,
      customerName,
      customerEmail,
      isGst,
      gstNo,
      panNumber,
      pinCode,
      address,
      phone,
      website,
      notes,
    } = row;
    this.setState({
      visible: true,
      customerId,
      customerName,
      customerEmail,
      isGst,
      gstNo,
      panNumber,
      pinCode,
      address,
      phone,
      website,
      notes,
    });
  };

  renderWebUI = () => {
    const {
      data = [],
      totalRows = 0,
      loading = false,
      chosenCategory = [""],
      sort = -1,
      searchText = "",
    } = this.state;

    const storeName = _.get(this.props, "storeName", "");

    return (
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader heading={"All Orders"} />
          <div className={`body flex-grow-1`}>
            <Toaster position="top-right" reverseOrder={false} />
            <Fragment>
              <div className="layout-alignment" id="dataTable">
                <div className="addNewProductButtonUI">
                  <div>
                    <div className="flex">
                      {[
                        { key: "All", value: "ALL" },
                        { key: "Pending", value: "PENDING" },
                        { key: "Accepted", value: "ACCEPTED" },
                        { key: "Rejected", value: "REJECTED" },
                        { key: "Shipped", value: "SHIPPED" },
                        { key: "Delivered", value: "DELIVERED" },
                      ].map((item) =>
                        renderFilterBox(
                          _.get(item, "key"),
                          chosenCategory.includes(_.get(item, "value", "")),
                          () => this.updateChosenCategory(_.get(item, "value"))
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      className="addNewProductButton"
                      onClick={() =>
                        this.props.fetchOrderList({
                          storeName,
                          searchText,
                          sort,
                          category: _.get(chosenCategory, "[0]", ""),
                        })
                      }
                    >
                      Report &nbsp;
                      {this.props.reportLoaderStatus ? (
                        <CSpinner
                          className="downloadReportContainer"
                          color="secondary"
                        />
                      ) : (
                        <FontAwesomeIcon icon={faDownload} />
                      )}
                    </button>
                    {/* <button className="addNewProductButton" onClick={() => this.setState({ visible: true, isEdit: false })}>Create Order</button> */}
                  </div>
                </div>
                <div className="tableBorder">
                  {this.state.isLoaderEnabled ? (
                    <div className="loaderContainer">
                      <CSpinner color="secondary" />
                    </div>
                  ) : (
                    <DataTable
                      title={`Manage Orders (${_.size(data)})`}
                      onFilterValueChange={this.onFilterValueChange}
                      selectableRows={false}
                      data={data}
                      columns={getProductColumns({
                        onEdit: this.onEdit,
                        showModal: this.showModal,
                      })}
                      totalRows={totalRows}
                      loading={loading}
                      onChangePage={this.onChangePage}
                      applyFilter={this.applyFilter}
                      searchText={this.state.searchText}
                      refreshFilter={this.triggerListOfProducts}
                      subHeader={true}
                      searchBy={"Order ID, Name or Name"}
                      onChangeRowsPerPage={this.onChangeRowsPerPage}
                      pagination={true}
                      onRowClicked={this.props.navigateToOrderDetails}
                      onApplySortFilter={this.onApplySortFilter}
                      onClearFilterChange={this.onClearFilterChange}
                      sort={sort}
                    />
                  )}
                </div>
              </div>
            </Fragment>
          </div>
          <AppFooter />
        </div>
      </div>
    );
  };

  renderMobileTabUI = () => {
    const {
      activeTab,
      activeTabValue = "ALL",
      updateDashboardActiveTab,
    } = this.props || {};
    return (
      <Fragment>
        <div className="mobileOrderLayout">
          {renderOrderTabUI({ activeTab, updateDashboardActiveTab })}
          <CalendarFilter />
          <div className="orderListSubSectionMobileLayout">
            {this.state.isLoaderEnabled ? (
              <div className="loaderContainer">
                <CSpinner color="secondary" />
              </div>
            ) : (
              <ReceivedList
                activeTabValue={activeTabValue}
                storeName={this.state.storeName}
                scrollHeight={"400px"}
                itemPerPage={10}
              />
            )}
          </div>
        </div>
      </Fragment>
    );
  };

  renderMobileUI = () => {
    return (
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader
            heading={"Orders"}
            showAddProduct={false}
            showAvatar={!isMobileView()}
            showBrand={!isMobileView()}
          />
          <div className={`body flex-grow-1`}>
            <Toaster position="top-right" reverseOrder={false} />
            {this.renderMobileTabUI()}
          </div>
          <AppFooter />
        </div>
      </div>
    );
  };

  renderPopup = () => {
    const {
      isModalOpen,
      remarks,
      message,
      fieldName,
      buttonName,
      trackingId = "",
      statusHistory = [],
    } = this.state;
    return (
      <Modal
        title="Order Details"
        cancelText={"Close"}
        okText={buttonName}
        open={isModalOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        {fieldName === "Activity" ? (
          <div>
            <div className="flexHeading">Application Timeline:</div>
            {statusHistory.map((entry) => {
              return (
                <div className="history">
                  <div className="faceIcon">
                    <HistoryOutlined className={"TransitionArrow"} />
                  </div>
                  <div className="flexColHistory">
                    <div className="historyDate">
                      {moment(entry.createdAt).format("DD MMM, YYYY, hh:mm A")}
                    </div>
                    <div>
                      {"Application status changed:"}{" "}
                      <span className={"BadgeGroup"}>
                        {entry.from ? (
                          <>
                            <span className={"StateBadge"}>{entry.from}</span>
                            <ArrowRightOutlined className={"TransitionArrow"} />
                          </>
                        ) : null}
                        <span className={"StateBadge"}>{entry.to}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Fragment>
            {this.state.isLoaderEnabled ? (
              <div className="loaderContainer">
                <CSpinner color="secondary" />
              </div>
            ) : (
              <div>
                <div>
                  <h6 className="message-pop">{message}</h6>
                  <div class="flex">
                    <label class="radio">
                      <input
                        name={"decision"}
                        type="radio"
                        value={fieldName}
                        onClick={(e) => {
                          this.setState({ decision: fieldName });
                        }}
                      />
                      <span class="radio-custom"></span>
                      Yes
                    </label>
                  </div>
                </div>
                {fieldName === "Add" ? (
                  <div>
                    <input
                      className="tracking-input"
                      placeholder="Enter Tracking Code"
                      type="string"
                      name="trackingId"
                      value={trackingId}
                      onChange={(e) => {
                        this.setState({ [e.target.name]: e.target.value });
                      }}
                    ></input>
                  </div>
                ) : fieldName === "REJECTED" ? (
                  <div>
                    <textarea
                      name="remarks"
                      placeholder="Enter Remarks"
                      onChange={(e) => {
                        this.setState({ [e.target.name]: e.target.value });
                      }}
                    >
                      {remarks}
                    </textarea>
                  </div>
                ) : null}
              </div>
            )}
          </Fragment>
        )}
      </Modal>
    );
  };
  render() {
    return (
      <>
        {this.renderPopup()}
        {isMobileView() ? this.renderMobileUI() : this.renderWebUI()}
      </>
    );
  }
}

export default function OrderList(props) {
  let orderDetails = useStoreState((state) => state.order.data);

  let userDetails = useStoreState((state) => state.user.data);

  let dashboardDetails = useStoreState(
    (state) => state.adminOrder.data.dashboard
  );

  const businessName = _.get(
    userDetails,
    "existingStoreInfo.[0].store.domainName",
    ""
  );

  let updateHomePageOrders = useStoreActions(
    (action) => action.adminOrder.updateHomePageOrders
  );

  let updateDashboardActiveTab = useStoreActions(
    (action) => action.adminOrder.updateDashboardActiveTab
  );

  let fetchCategoryList = useStoreActions(
    (action) => action.shop.fetchCategoryList
  );

  let storeInformation = useStoreState((state) => state.shop.data);

  let fetchOrderList = useStoreActions(
    (action) => action.report.fetchOrderList
  );

  let reportDataStore = useStoreState((state) => state.report.data);

  const { isLoading = false } = reportDataStore || {};

  const { categoryList = [] } = storeInformation || {};

  const resetOrderState = () => {
    updateHomePageOrders({
      orderList: [],
      totalOrderCount: 0,
      isLoaderEnabled: false,
      currentPage: 0,
      totalPages: 1,
    });
  };

  useEffect(() => {
    resetOrderState();
    fetchCategoryList();
    return () => {
      resetOrderState();
    };
  }, []);

  const { storeOrders = [], isLoaderEnabled = false } = orderDetails || {};

  const navigate = useNavigate();

  const navigateToOrderDetails = (orderInfo) => {
    const orderId = _.get(orderInfo, "_id", "");

    return navigate(`/order/${orderId}`);
  };

  const { activeTab, activeTabValue } = dashboardDetails || {};

  return (
    <List
      {...props}
      navigateToOrderDetails={navigateToOrderDetails}
      isLoaderEnabled={isLoaderEnabled}
      storeOrders={storeOrders}
      storeName={businessName}
      activeTab={activeTab}
      activeTabValue={activeTabValue}
      updateDashboardActiveTab={updateDashboardActiveTab}
      categoryList={categoryList}
      fetchOrderList={fetchOrderList}
      reportLoaderStatus={isLoading}
    />
  );
}
