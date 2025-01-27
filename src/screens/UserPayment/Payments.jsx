import React from "react";
import "react-table-v6/react-table.css";
import { Card, CardTitle, Col, Row } from "reactstrap";
import OutletCard from "../../components/OutletCard/OutletCard";
import "./Payments.scss";
import { payments } from "./Payments.constants";
import PaymentCard from "./components/PaymentCard";
import { usePayments } from "./_hooks/usePayments";

const Plugins = () => {
  const {} = usePayments();

  return (
    <OutletCard>
      <Card className="d-flex justify-content-between flex-column flex-wrap gap-3 bg-light">
        <CardTitle tag="h4" className="mb-0">
          Payments
        </CardTitle>
        <Row className="d-flex flex-wrap mt-2">
          {payments.map((plugin, index) => (
            <Col ls="4" key={index}>
              <PaymentCard details={plugin} />
            </Col>
          ))}
        </Row>
      </Card>
    </OutletCard>
  );
};

export default Plugins;
