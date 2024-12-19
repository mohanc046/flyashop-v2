import React from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import { showToast } from "../../../store/reducers/toasterSlice";

const PaymentCard = ({ details = [] }) => {
  const dispatch = useDispatch();

  const handleShowToast = () => {
    dispatch(
      showToast({
        type: "success",
        title: "Success",
        message: "This is a success message!"
      })
    );
  };

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
          <Button color="primary" onClick={handleShowToast}>
            Setup
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default PaymentCard;
