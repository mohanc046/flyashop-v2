import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../Settings.scss";
import { setTitle } from "../../../store/reducers/headerTitleSlice";
import { getStoreInfo } from "../../../utils/_hooks";

export const useSettings = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Settings"));
  }, []);

  const columns = [
    {
      label: "Domain Name",
      key: "domainName"
    },
    { label: "Date Added", key: "addedAt" },
    {
      label: "Status",
      key: "status",
      render: (value, row) => (
        <div className="d-flex align-items-center live">
          <h5 className="mb-0">{value}</h5>
        </div>
      )
    },
    { label: "Provider", key: "provider" }
  ];

  const data = [
    {
      key: "1",
      domainName: `https://flyashop.com/store/${getStoreInfo()?.store?.businessName}`,
      addedAt: "Feb 27, 2024",
      status: ["LIVE"],
      provider: "Godaddy"
    }
  ];

  return { columns, data };
};
