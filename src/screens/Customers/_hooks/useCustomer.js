import { useEffect } from "react";
import productImage1 from "../../../assets/images/users/user1.jpg";
import productImage2 from "../../../assets/images/users/user2.jpg";
import productImage3 from "../../../assets/images/users/user3.jpg";
import productImage4 from "../../../assets/images/users/user4.jpg";
import productImage5 from "../../../assets/images/users/user5.jpg";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";
import Switch from "../../../components/Switch/Switch";

export const useCustomer = () => {
  const dispatch = useDispatch();
  const categories = [{ label: "All", value: "ALL" }];

  const handleCategorySelect = (category) => {
    console.log("Selected Category:", category);
  };

  useEffect(() => {
    dispatch(setTitle("All Customers"));
  }, []);

  const productData = [
    {
      item_image: productImage1,
      item_name: "Customer 1",
      inventory: "city name",
      amount: "840248293",
      status: "-" // Status should be "active" or "hidden"
    },
    {
      item_image: productImage2,
      item_name: "Customer 2",
      inventory: "city name",
      amount: "840248293",
      status: "-"
    },
    {
      item_image: productImage3,
      item_name: "Customer 3",
      inventory: "city name",
      amount: "840248293",
      status: "-" // Status should be "active" or "hidden"
    },
    {
      item_image: productImage4,
      item_name: "Customer 4",
      inventory: "city name",
      amount: "840248293",
      status: "-"
    },
    {
      item_image: productImage5,
      item_name: "Customer 5",
      inventory: "city name",
      amount: "840248293",
      status: "-"
    }
  ];

  const columns = [
    {
      label: "Customer Name",
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
    { label: "Mobile Number", key: "amount" },
    { label: "City", key: "inventory" },
    {
      label: "Total Sales",
      key: "status"
    }
  ];

  return {
    categories,
    handleCategorySelect,
    productData,
    columns,
    dispatch
  };
};
