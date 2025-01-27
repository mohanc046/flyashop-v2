import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { hideToast } from "../../store/reducers/toasterSlice";

const Toaster = () => {
  const dispatch = useDispatch();
  const { isVisible, type, title, message } = useSelector((state) => state.toaster);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);

      return () => clearTimeout(timer); // Clear timeout on unmount or state change
    }
  }, [isVisible, dispatch]);

  const toastStyles = {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    zIndex: 1050,
    minWidth: "300px",
    backgroundColor: "#fff"
  };

  const getColor = () => {
    switch (type) {
      case "success":
        return "success";
      case "error":
        return "danger";
      case "info":
        return "info";
      case "warning":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <div style={toastStyles}>
      {isVisible && (
        <Toast isOpen={isVisible}>
          <ToastHeader className="bg-white" icon={getColor()}>
            {title}
          </ToastHeader>
          <ToastBody className="bg-white">{message}</ToastBody>
        </Toast>
      )}
    </div>
  );
};

export default Toaster;
