import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";
import Switch from "../../../components/Switch/Switch";
import { useNavigate } from "react-router-dom";
import { getStoreInfo } from "../../../utils/_hooks";
import { fetchProducts } from "../../../utils/api.service";
import ImgOrVideoRenderer from "../../../components/ImgOrVideoRenderer/ImgOrVideoRenderer";
import { isImageUrl } from "../../../utils/utils";

export const useProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    loaderStatus: false,
    productsList: [],
    currentPage: 1,
    totalPages: 0
  });

  const [payload, setPayload] = useState({
    storeName: getStoreInfo()?.store?.businessName || "DefaultStore",
    currentPage: 1,
    itemPerPage: 10,
    categoryType: "ALL",
    activeStatusTab: null,
    sort: -1
  });

  useEffect(() => {
    dispatch(setTitle("All Products"));
  }, []);

  useEffect(() => {
    loadProducts(payload);
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

  const loadProducts = async (payload) => {
    try {
      setState((prevState) => ({ ...prevState, loaderStatus: true }));

      const data = await fetchProducts(payload);
      if (data.statusCode === 200) {
        setState((prevState) => ({ ...prevState, productsList: data?.products }));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setState((prevState) => ({ ...prevState, loaderStatus: false }));
    }
  };

  const mapProductDataToTable = (products) =>
    products.map((product) => ({
      item_image: {
        url: product.images?.[0] || "",
        type: isImageUrl(product.images?.[0]) ? "image" : "video"
      },
      item_name: product.productName || "N/A",
      amount: `₹${product.price || 0}`,
      inventory: product.inventory?.quantity,
      status: product.isActive ? "active" : "hidden"
    }));

  const columns = [
    {
      label: "Item",
      key: "item_image",
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
    columns,
    state,
    payload,
    mapProductDataToTable,
    dispatch,
    handleNavigateAddproduct,
    onApplySortFilter,
    onClearFilterChange
  };
};
