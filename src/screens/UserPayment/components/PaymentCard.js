import React from "react";
import { Button, Card, CardBody, CardTitle } from "reactstrap";

const PaymentCard = ({ details = [] }) => {
  return (
    <Card className="w-100 bg-white shadow-sm border rounded">
      <CardBody className="d-flex align-items-center">
        <div className="d-flex align-items-center">
          <img src={details.image} alt="user" width={60} className="rounded mb-3" />
          <div className="ms-3">
            <CardTitle tag="h5" className="mb-3">
              {details.title}
            </CardTitle>
            <span className="text-muted fs-8">{details.description}</span>
          </div>
        </div>
        <div className="ms-auto p-3">
          <Button color="primary">Setup</Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default PaymentCard;
