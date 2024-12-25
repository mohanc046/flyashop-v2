import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../store/reducers/headerTitleSlice";
import { showToast } from "../../../store/reducers/toasterSlice";
import { getServiceURL } from "../../../utils/utils";
import { hideSpinner, showSpinner } from "../../../store/reducers/spinnerSlice";
import { getAuthToken } from "../../../utils/_hooks";
import { useNavigate } from "react-router-dom";

export const useAddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mainState, setMainState] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const updateStore = (newData) => {
    setMainState((prevState) => ({
      ...prevState,
      ...newData
    }));
  };

  useEffect(() => {
    dispatch(setTitle("Add Product"));
  }, []);

  const uploadStepValidation = () => {
    if (!mainState.productImage) {
      dispatch(
        showToast({
          type: "error",
          title: "Error",
          message: "Product Image is required"
        })
      );
      return true;
    }
    return false;
  };

  const detailsStepValidation = () => {
    const fields = [
      { field: mainState.productName, message: "Product Name is required." },
      { field: mainState.productDescription, message: "Product Description is required." },
      { field: mainState.productCategory, message: "Product category is required." },
      { field: mainState.price, message: "Price is required." },
      { field: mainState.discountedPrice, message: "Discount Price is required." },
      { field: mainState.quantity, message: "Quantity is required." },
      { field: mainState.sizes, message: "Sizes is required." },
      { field: mainState.colors, message: "Colors is required." },
      { field: mainState.shipmentWeight, message: "Shipment Weight is required." },
      { field: mainState.gstPercentage, message: "GST Percentage is required." }
    ];

    for (const { field, message } of fields) {
      if (!field) {
        dispatch(
          showToast({
            type: "error",
            title: "Error",
            message
          })
        );
        return true;
      }
    }

    return false;
  };

  const createProduct = async () => {
    const payload = {
      productName: mainState.productName,
      productDescription: mainState.productDescription,
      categoryType: mainState.productCategory,
      price: mainState.price,
      images: [mainState.productImage],
      discountPrice: mainState.discountedPrice || "",
      inventory: {
        quantity: mainState.quantity,
        sizes: [mainState.sizes],
        colors: [mainState.colors]
      },
      orderDetails: {
        shippingWeight: mainState.shipmentWeight,
        barcode: mainState.barcode || "",
        gstPercentage: mainState.gstPercentage
      }
    };

    try {
      dispatch(showSpinner());
      const response = await fetch(`${getServiceURL()}/product/create`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "content-type": "application/json"
        }
      });
      if (response.ok) {
        await response.json();
        dispatch(hideSpinner());
        dispatch(
          showToast({
            type: "success",
            title: "Success",
            message: "Products created successful!"
          })
        );
        setTimeout(() => {
          navigate("/product-list");
        }, 2000);
      }
    } catch (error) {
      dispatch(
        showToast({
          type: "error",
          title: "Error",
          message: "Issue while creation products"
        })
      );
    } finally {
      dispatch(hideSpinner());
    }
  };

  return {
    uploadStepValidation,
    detailsStepValidation,
    createProduct,
    activeStep,
    setActiveStep,
    updateStore,
    mainState
  };
};
