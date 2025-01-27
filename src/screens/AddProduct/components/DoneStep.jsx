import React, { useEffect } from "react";

const DoneStep = ({ createProduct }) => {
  useEffect(() => {
    createProduct();
  }, [createProduct]);

  return null;
};

export default DoneStep;
