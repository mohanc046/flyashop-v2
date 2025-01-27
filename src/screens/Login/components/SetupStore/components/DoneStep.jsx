import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DoneStep = ({ createProduct }) => {
  const navigate = useNavigate();

  useEffect(() => {
    createProduct();
  }, [navigate, createProduct]);

  return null;
};

export default DoneStep;
