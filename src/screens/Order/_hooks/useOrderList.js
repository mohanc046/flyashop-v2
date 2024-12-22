import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";
import { getStoreInfo } from "../../../utils/_hooks";
import ImgOrVideoRenderer from "../../../components/ImgOrVideoRenderer/ImgOrVideoRenderer";
import { getServiceURL, isImageUrl } from "../../../utils/utils";
import axios from "axios";

export const useOrder = () => {
  const dispatch = useDispatch();
  const categories = ["All", "Pending", "Accepted", "Rejected", "Shipped", "Delivered"];
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
    activeStatusTab: null
  });

  const handleCategorySelect = (category) => {
    console.log("Selected Category:", category);
  };

  useEffect(() => {
    fetchOrders(payload);
    dispatch(setTitle("All Orders"));
  }, []);

  const fetchOrders = async (payload) => {
    try {
      setState((prevState) => ({ ...prevState, loaderStatus: true }));

      const { storeName, currentPage, itemPerPage, categoryType, activeStatusTab } = payload;
      const URL = getServiceURL();
      const response = await axios.get(
        `${URL}/order/store/${storeName}?page=${currentPage}&itemsPerPage=${itemPerPage}&category=${categoryType}`
      );

      const {
        data: { message, orderList = [], totalPages = 0 }
      } = response;

      if (response?.status === 200) {
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
            className={`p-2 ${
              value === "PENDING"
                ? "bg-danger"
                : value === "Delivered"
                  ? "bg-success"
                  : value === "ACCEPTED"
                    ? "bg-warning"
                    : ""
            } rounded-circle`}
          />
          <span>{value}</span>
        </div>
      )
    }
  ];

  return {
    categories,
    handleCategorySelect,
    columns,
    state,
    dispatch,
    mapOrderDataToTable
  };
};
