import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";
import { useEffect, useRef, useState } from "react";
import { getStoreInfo } from "../../../utils/_hooks";
import { formatDateToDDMMYYYY } from "../../../utils/utils";
import { fetchListOfVouchers } from "../../../utils/api.service";
import Switch from "../../../components/Switch/Switch";

export const useDiscounts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(null);
  const debounceRef = useRef(null);
  const [addDiscountState, setAddDiscountState] = useState({
    voucherCode: "",
    offerCampaignName: "",
    sellingChannel: "",
    campaignStartDate: "",
    campaignEndDate: "",
    offerType: "",
    offerValue: ""
  });
  const [state, setState] = useState({
    loaderStatus: false,
    vouchersList: []
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
    dispatch(setTitle("Manage Discounts and Offers"));
  }, []);

  useEffect(() => {
    loadVouchers(payload);
  }, [payload]);

  const loadVouchers = async (payload) => {
    try {
      setState((prevState) => ({ ...prevState, loaderStatus: true }));

      const data = await fetchListOfVouchers(payload);
      if (data.statusCode === 200) {
        setTotalItems(data?.listOfVouchers?.length);
        setState((prevState) => ({ ...prevState, vouchersList: data?.listOfVouchers }));
      }
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    } finally {
      setState((prevState) => ({ ...prevState, loaderStatus: false }));
    }
  };

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

  const mapVouchersDataToTable = (vouchers) =>
    vouchers.map((voucher) => ({
      _id: voucher._id,
      campaignName: voucher.campaignName || "N/A",
      sellingChannel: voucher.sellingChannel || "N/A",
      offerValue: `${voucher.offerValue}%` || "N/A",
      campaignStartDate: formatDateToDDMMYYYY(voucher.campaignStartDate) || "N/A",
      campaignEndDate: formatDateToDDMMYYYY(voucher.campaignEndDate) || "N/A",
      status: voucher.isActive ? "active" : "hidden"
    }));

  const columns = [
    {
      label: "Offer Name",
      key: "campaignName"
    },
    { label: "Channel", key: "sellingChannel" },
    { label: "Discount", key: "offerValue" },
    { label: "Start Date", key: "campaignStartDate" },
    { label: "End Date", key: "campaignEndDate" },
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

  return {
    payload,
    handleCategorySelect,
    columns,
    mapVouchersDataToTable,
    state,
    onClearFilterChange,
    onApplySortFilter,
    handleSearch,
    handlePerPageRowsChange,
    handlePageChange,
    currentPage,
    totalItems,
    rowsPerPage
  };
};
