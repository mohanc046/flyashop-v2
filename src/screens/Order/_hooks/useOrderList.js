import { useEffect } from "react";
import productImage1 from "../../../assets/images/users/user1.jpg";
import productImage2 from "../../../assets/images/users/user2.jpg";
import productImage3 from "../../../assets/images/users/user3.jpg";
import productImage4 from "../../../assets/images/users/user4.jpg";
import productImage5 from "../../../assets/images/users/user5.jpg";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";
import Switch from "../../../components/Switch/Switch";

export const useOrder = () => {
  const dispatch = useDispatch();
  const categories = ["All", "Pending", "Accepted", "Rejected", "Shipped", "Delivered"];

  const handleCategorySelect = (category) => {
    console.log("Selected Category:", category);
  };

  useEffect(() => {
    dispatch(setTitle("All Orders"));
  }, []);

  const orderData = [
    {
      item_image: productImage1,
      item_name: "Product 1",
      orderId: "#1234567890",
      amount: "₹999",
      location: "New York",
      status: "Pending"
    },
    {
      item_image: productImage2,
      item_name: "Product 2",
      orderId: "#1234567891",
      amount: "₹799",
      location: "Los Angeles",
      status: "Delivered"
    },
    {
      item_image: productImage3,
      item_name: "Product 3",
      orderId: "#1234567892",
      amount: "₹599",
      location: "Chicago",
      status: "Pending"
    },
    {
      item_image: productImage4,
      item_name: "Product 4",
      orderId: "#1234567893",
      amount: "₹1099",
      location: "San Francisco",
      status: "Accepted"
    },
    {
      item_image: productImage5,
      item_name: "Product 5",
      orderId: "#1234567894",
      amount: "₹1299",
      location: "Miami",
      status: "Accepted"
    }
  ];

  const columns = [
    {
      label: "Item",
      key: "item_image",
      render: (value, row) => (
        <div className="d-flex align-items-center">
          <img
            src={value}
            alt="product"
            width="45"
            height="45"
            className="rounded-circle me-3" // Add some margin to the right of the image
          />
          <h5 className="mb-0">{row.item_name}</h5> {/* Render item name alongside the image */}
        </div>
      )
    },
    { label: "Order ID", key: "orderId" },
    { label: "Amount", key: "amount" },
    { label: "Location", key: "location" },
    {
      label: "Status",
      key: "status",
      render: (value, row) => (
        <div className="d-flex gap-2 align-items-center">
          <span
            className={`p-2 ${value === "Pending" ? "bg-danger" : value === "Delivered" ? "bg-success" : value === "Accepted" ? "bg-warning" : ""} rounded-circle d-inline-block ms-3`}
          />
          <span>{value}</span>
        </div>
      )
    }
  ];

  return {
    categories,
    handleCategorySelect,
    orderData,
    columns,
    dispatch
  };
};
