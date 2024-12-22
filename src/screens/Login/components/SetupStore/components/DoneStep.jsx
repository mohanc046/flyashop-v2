import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col } from "reactstrap";

const DoneStep = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, [navigate]);

  return <Col md="12"></Col>;
};

export default DoneStep;
