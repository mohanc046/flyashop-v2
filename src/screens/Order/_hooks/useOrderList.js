import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";
import { getStoreInfo } from "../../../utils/_hooks";
import ImgOrVideoRenderer from "../../../components/ImgOrVideoRenderer/ImgOrVideoRenderer";
import { getServiceURL, isImageUrl } from "../../../utils/utils";
import axios from "axios";
import { statusActions, statusColors } from "../OrderList.constants";
import { Button } from "reactstrap";
import { showToast } from "../../../store/reducers/toasterSlice";

export const useOrder = () => {
  const dispatch = useDispatch();
  const [modalData, setModalData] = useState({ title: "", action: "", row: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    console.log(isModalOpen);
  }, [isModalOpen]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const [state, setState] = useState({
    loaderStatus: false,
    orderList: [],
    currentPage: 1,
    totalPages: 0
  });

  const [payload, setPayload] = useState({
    storeName: getStoreInfo()?.store?.businessName || "DefaultStore",
    currentPage: 1,
    itemPerPage: 10,
    categoryType: "ALL",
    searchText: "",
    activeStatusTab: null,
    sort: -1
  });

  useEffect(() => {
    dispatch(setTitle("All Orders"));
  }, []);

  useEffect(() => {
    fetchOrders(payload);
  }, [payload]);

  const onApplySortFilter = (sort) => {
    const updatedSortValue = sort > 0 ? -1 : 1;
    setPayload((prevState) => ({ ...prevState, sort: updatedSortValue }));
  };

  const onClearFilterChange = () => {
    setPayload((prevState) => ({
      ...prevState,
      currentPage: 1,
      categoryType: "ALL",
      activeStatusTab: null
    }));
  };

  const handleCategorySelect = (category) => {
    setPayload((prevState) => ({ ...prevState, categoryType: category }));
  };

  const handleSearch = (event) => {
    const searchQuery = event.target.value;

    // Clear the previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setPayload((prevState) => ({ ...prevState, searchText: searchQuery }));
    }, 500);
  };

  const handlePerPageRowsChange = (rows) => {
    setRowsPerPage(rows);
    setPayload((prevState) => ({ ...prevState, itemPerPage: rows }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPayload((prevState) => ({ ...prevState, currentPage: page }));
  };

  const fetchOrders = async (payload) => {
    try {
      setState((prevState) => ({ ...prevState, loaderStatus: true }));

      const {
        storeName,
        currentPage,
        itemPerPage,
        categoryType,
        sort,
        activeStatusTab,
        searchText
      } = payload;
      const URL = getServiceURL();
      const response = await axios.get(
        `${URL}/order/store/${storeName}?page=${currentPage}&itemsPerPage=${itemPerPage}&category=${categoryType}&searchText=${searchText}&sort=${sort}`
      );

      const {
        data: { message, orderList = [], totalPages = 0, totalOrderCount = 0 }
      } = response;

      if (response?.status === 200) {
        setTotalItems(totalOrderCount);
        let filteredOrderList = [...orderList];

        if (activeStatusTab) {
          const statusMapping = {
            Received: "PENDING",
            Shipped: "SHIPPED",
            Delivered: "DELIVERED"
          };

          const filterStatus = statusMapping[activeStatusTab];
          if (filterStatus) {
            filteredOrderList = filteredOrderList.filter((order) => order.status === filterStatus);
          }
        }

        const formattedOrderList = filteredOrderList.map((order) => {
          const product = order.products?.[0]?.product || {};
          const mediaUrl = product.images?.[0] || "";
          const mediaType = isImageUrl(mediaUrl) ? "image" : "video";

          return {
            item_media: { url: mediaUrl, type: mediaType },
            item_name: product.productName || "N/A",
            orderId: order.orderId || "N/A",
            amount: `₹${order.totalOrderCost || 0}`,
            location: `${order.shippingAddress?.street || ""}, ${order.shippingAddress?.state || ""}`,
            status: order.status || "Pending"
          };
        });

        setState((prevState) => ({
          ...prevState,
          orderList: formattedOrderList,
          currentPage,
          totalPages
        }));
      } else {
        console.error(message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setState((prevState) => ({ ...prevState, loaderStatus: false }));
    }
  };

  const mapOrderDataToTable = (orders) =>
    orders.map((order) => ({
      item_media: order.item_media,
      item_name: order.item_name,
      orderId: order.orderId,
      amount: order.amount,
      location: order.location,
      status: order.status
    }));

  const renderButtons = (status, row) => {
    const actions = statusActions[status] || [];
    return actions.map(({ label, action }) => (
      <Button
        key={action}
        color="primary"
        size="sm"
        className="me-2"
        onClick={() => handleButtonClick(action, row)}>
        {label}
      </Button>
    ));
  };

  const handleButtonClick = (action, row) => {
    const titles = {
      Reject: "Do you want to reject the order?",
      Accept: "Do you want to accept the order?",
      Cancel: "Do you want to cancel the order?",
      Ship: "Do you want to cancel the order?",
      Deliver: "Do you want to delivery the order?",
      Track: "Do you want to add the tracking code?",
      Activity: "Application Timeline:"
    };

    setModalData({
      title: titles[action] || "Action",
      action,
      row
    });
    toggleModal();
  };

  const handleSubmit = () => {
    dispatch(showToast({ type: "success", title: "Success", message: "Updated Successfully" }));
    console.log("Action submitted:", modalData.action, modalData.row);

    const payload = {
      orderId: "",
      decision: "",
      remarks: "",
      status: "",
      trackingId: ""
    };

    toggleModal();
  };

  const columns = [
    {
      label: "Item",
      key: "item_media",
      render: (value, row) => (
        <div className="d-flex align-items-center gap-3">
          <ImgOrVideoRenderer
            className="me-3"
            src={value.url}
            width="45"
            height="45"
            description="product media"
            videoStyles={{ borderRadius: "50%" }}
          />
          <h5 className="mb-0">{row.item_name}</h5>
        </div>
      )
    },
    { label: "Order ID", key: "orderId" },
    { label: "Amount", key: "amount" },
    { label: "Location", key: "location" },
    {
      label: "Status",
      key: "status",
      render: (value) => (
        <div className="d-flex gap-2 align-items-center">
          <span
            className="p-2 rounded-circle"
            style={{ backgroundColor: statusColors[value] || "#333" }}
          />
          <span>{value}</span>
        </div>
      )
    },
    {
      label: "Actions",
      key: "actions",
      render: (value, row) => renderButtons(row.status, row)
    }
  ];

  return {
    handleCategorySelect,
    columns,
    state,
    dispatch,
    mapOrderDataToTable,
    payload,
    onApplySortFilter,
    onClearFilterChange,
    isModalOpen,
    setIsModalOpen,
    modalData,
    handleSubmit,
    handleSearch,
    handlePerPageRowsChange,
    handlePageChange,
    currentPage,
    totalItems,
    rowsPerPage
  };
};
