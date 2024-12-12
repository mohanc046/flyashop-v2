import React from "react";
import { Route, Routes } from "react-router-dom";
import FullLayout from "../layouts/FullLayout";

const RouteConnecter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<FullLayout />} />
      </Routes>
    </>
  );
};

export default RouteConnecter;
