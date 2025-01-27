import React from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import Toaster from "../components/Toaster/Toaster";

const BlankLayout = () => (
  <>
    <Outlet />
    <Toaster />
    <Spinner />
  </>
);

export default BlankLayout;
