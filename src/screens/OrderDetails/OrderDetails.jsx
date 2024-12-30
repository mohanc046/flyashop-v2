import React from "react";
import { Card, CardBody, CardHeader, Row, Col, Button, ListGroup, ListGroupItem } from "reactstrap";
import { useOrderDetails } from "./_hooks/useOrderDetails";
import { statusColors } from "../Order/OrderList.constants";
import ImgOrVideoRenderer from "../../components/ImgOrVideoRenderer/ImgOrVideoRenderer";

const OrderDetails = () => {
  const { orderInfo } = useOrderDetails();

  return (
    <div className="container my-4">
      {/* Order Details Section */}
      <Card className="mb-4 bg-white">
        <CardBody>
          <Row className="align-items-center">
            <Col md="8">
              <h6 className="fw-bold">{`Order ID ${orderInfo?.orderId}`}</h6>
            </Col>
            <Col md="4" className="text-end">
              <span
                className="badge p-2"
                style={{ backgroundColor: statusColors[orderInfo?.status] || "#333" }}>
                {orderInfo?.status}
              </span>
            </Col>
          </Row>
          <hr />
          <Row className="align-items-center">
            <Col md="2">
              <ImgOrVideoRenderer
                src={orderInfo?.products[0]?.product?.images[0] || "https://via.placeholder.com/80"}
                width="65"
                height="65"
                description="product media"
                className="img-fluid rounded-circle"
                videoStyles={{ borderRadius: "50%" }}
              />
            </Col>
            <Col md="6">
              <h6>{orderInfo?.products[0]?.product?.productName || "Product Name"}</h6>
              <p className="text-muted">₹{orderInfo?.products[0]?.product?.price} per piece</p>
              <p className="text-muted">
                {orderInfo?.products[0]?.quantity} X ₹{orderInfo?.products[0]?.product?.price}
              </p>
            </Col>
            <Col md="4" className="text-end">
              <ListGroup flush>
                <ListGroupItem className="border-0 px-0 d-flex justify-content-between bg-white">
                  <span>Item total</span>
                  <strong>
                    ₹{orderInfo?.products[0]?.quantity * orderInfo?.products[0]?.product?.price}
                  </strong>
                </ListGroupItem>
                <ListGroupItem className="border-0 px-0 d-flex justify-content-between bg-white">
                  <span>Delivery</span>
                  <strong>₹0</strong>
                </ListGroupItem>
                <ListGroupItem className="border-0 px-0 d-flex justify-content-between bg-white">
                  <span>Grand Total</span>
                  <strong>₹{orderInfo?.totalOrderCost}</strong>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* Customer Details Section */}
      <Card className="mb-4 bg-white">
        <CardHeader>
          <Row>
            <Col>Customer Details</Col>
            {/* <Col className="text-end">
              <Button color="link" className="p-0 text-primary">
                View Profile
              </Button>
            </Col> */}
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <p>
                <strong>Name</strong>
              </p>
              <p className="text-muted">{orderInfo?.userId?.name}</p>
            </Col>
            <Col md="4">
              <p>
                <strong>Email</strong>
              </p>
              <p className="text-muted">{orderInfo?.userId?.email}</p>
            </Col>
            <Col md="4">
              <p>
                <strong>Location</strong>
              </p>
              <p className="text-muted">{orderInfo?.shippingAddress?.street}</p>
            </Col>
            <Col md="4">
              <p>
                <strong>City</strong>
              </p>
              <p className="text-muted">{orderInfo?.shippingAddress?.state}</p>
            </Col>
            <Col md="4">
              <p>
                <strong>State</strong>
              </p>
              <p className="text-muted">{orderInfo?.shippingAddress?.state}</p>
            </Col>
            <Col md="4">
              <p>
                <strong>PinCode</strong>
              </p>
              <p className="text-muted">{orderInfo?.shippingAddress?.pinCode}</p>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* Activity Section */}
      <Row>
        <Col md="4">
          <Card className="mb-4 bg-white">
            <CardHeader>Activity</CardHeader>
            <CardBody>
              <p className="text-muted mb-0">
                <strong>Order Placed</strong>
              </p>
              <p className="text-muted mb-0">{orderInfo?.userId?.email}</p>
              <p className="text-muted">{new Date(orderInfo?.orderDate).toLocaleString()}</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderDetails;
