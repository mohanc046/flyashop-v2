import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { hideSpinner, showSpinner } from "../../../store/reducers/spinnerSlice";
import axios from "axios";
import { getServiceURL } from "../../../utils/utils";
import { FIXED_VALUES } from "../../../utils/constants";
import { showToast } from "../../../store/reducers/toasterSlice";
import { useEffect, useState } from "react";
const {
  statusCode: { SUCCESS }
} = FIXED_VALUES;

export const useOrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [orderInfo, setOrderInfo] = useState();

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      dispatch(showSpinner());

      let orderResponse = await axios.get(`${getServiceURL()}/order/${id}`);

      const {
        data: { statusCode = "500", message = "Issue while getting order details!", orderInfo = {} }
      } = orderResponse;

      if (statusCode === SUCCESS) {
        setOrderInfo(orderInfo);
        dispatch(hideSpinner());
        return;
      } else {
        dispatch(hideSpinner());
        dispatch(showToast({ type: "error", title: "Error", description: message }));
      }

      dispatch(hideSpinner());
    } catch (error) {
      dispatch(hideSpinner());
    } finally {
      dispatch(hideSpinner());
    }
  };

  return {
    orderInfo
  };
};
