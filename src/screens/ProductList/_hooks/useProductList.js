import { useEffect } from "react";
import productImage1 from "../../../assets/images/users/user1.jpg";
import productImage2 from "../../../assets/images/users/user2.jpg";
import productImage3 from "../../../assets/images/users/user3.jpg";
import productImage4 from "../../../assets/images/users/user4.jpg";
import productImage5 from "../../../assets/images/users/user5.jpg";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";
import Switch from "../../../components/Switch/Switch";
import { useNavigate } from "react-router-dom";

export const useProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    console.log("Selected Category:", category);
  };

  useEffect(() => {
    dispatch(setTitle("All Products"));
  }, []);

  const productData = [
    {
      item_image: productImage1,
      item_name: "Product 1",
      inventory: "7",
      amount: "₹799",
      status: "active" // Status should be "active" or "hidden"
    },
    {
      item_image: productImage2,
      item_name: "Product 2",
      inventory: "3",
      amount: "₹199",
      status: "active"
    },
    {
      item_image: productImage3,
      item_name: "Product 3",
      inventory: "5",
      amount: "₹1,499",
      status: "hidden" // Status should be "active" or "hidden"
    },
    {
      item_image: productImage4,
      item_name: "Product 4",
      inventory: "20",
      amount: "₹120",
      status: "hidden"
    },
    {
      item_image: productImage5,
      item_name: "Product 5",
      inventory: "2",
      amount: "₹299",
      status: "active"
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
    { label: "Amount", key: "amount" },
    { label: "Inventory", key: "inventory" },
    {
      label: "Status",
      key: "status",
      render: (value, row) => (
        <Switch
          initialStatus={value} // Ensure value is a string like "active" or "hidden"
          activeText="Active"
          hiddenText="Hidden"
          onToggle={(newStatus) => console.log("New Status: ", newStatus)} // Handle status toggle
        />
      )
    }
  ];

  const handleNavigateAddproduct = () => {
    navigate("/product-list/add-product");
  };

  return {
    handleCategorySelect,
    productData,
    columns,
    dispatch,
    handleNavigateAddproduct
  };
};
