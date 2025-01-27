import React from "react";
import { useSelector } from "react-redux";
import "./Spinner.scss"; // Add styles for the spinner

const Spinner = () => {
  const isLoading = useSelector((state) => state.spinner.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
