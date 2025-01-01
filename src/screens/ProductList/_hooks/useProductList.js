import { useEffect, useRef, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(null);
  const debounceRef = useRef(null);
  const [state, setState] = useState({
    loaderStatus: false,
    productsList: [],
    currentPage: 1,
    totalPages: 0
  });

  const [payload, setPayload] = useState({
    storeName: getStoreInfo()?.store?.businessName || "DefaultStore",
    currentPage: 1,
    limit: 10,
    categoryType: "ALL",
    searchText: "",
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
    setPayload((prevState) => ({ ...prevState, limit: rows }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setPayload((prevState) => ({ ...prevState, currentPage: page }));
  };

  const loadProducts = async (payload) => {
    try {
      setState((prevState) => ({ ...prevState, loaderStatus: true }));

      const data = await fetchProducts(payload);
      if (data.statusCode === 200) {
        setTotalItems(data?.products?.length);
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
      _id: product._id,
      item_image: {
        url: product.images?.[0] || "",
        type: isImageUrl(product.images?.[0]) ? "image" : "video"
      },
      productName: product.productName || "N/A",
      productDescription: product.productDescription || "N/A",
      discountPrice: product.discountPrice || "",
      productCategory: product.categoryType || "",
      amount: `₹${product.price || 0}`,
      price: product.price,
      quantity: product.inventory?.quantity,
      sizes: product?.inventory?.sizes || "",
      colors: product?.inventory?.colors || "",
      shipmentWeight: product?.orderDetails?.shippingWeight || "",
      barcode: product?.orderDetails?.barcode || "",
      gstPercentage: product?.orderDetails?.gstPercentage || "",
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
          <h5 className="mb-0">{row.productName}</h5>
        </div>
      )
    },
    { label: "Amount", key: "amount" },
    { label: "Inventory", key: "quantity" },
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

  const handleNavigateProductDetails = (rowData) => {
    console.log(rowData);
    if (rowData?._id) {
      navigate(`/product/${rowData._id}`, {
        state: rowData
      });
    } else {
      console.error("Product ID is missing in rowData.");
    }
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
    onClearFilterChange,
    handleSearch,
    handlePerPageRowsChange,
    handlePageChange,
    currentPage,
    rowsPerPage,
    totalItems,
    handleNavigateProductDetails
  };
};
