import React from "react";
import { Row, Col, Button, Card } from "reactstrap";
import "../Home.scss";

const pendingOrders = [
  { id: 1, name: "sample", days: 49 },
  { id: 2, name: "sample", days: 49 },
  { id: 3, name: "sample", days: 49 },
  { id: 4, name: "sample", days: 49 }
];

const PendingOrders = () => {
  return (
    <div className="lists-container">
      <Col md={10} className="list shadow-sm rounded">
        <h4 className="list-heading">Pending Orders({pendingOrders.length})</h4>
        <Card className="p-3 bg-white">
          {pendingOrders.map((order) => (
            <Row
              key={order.id}
              className="d-flex align-items-center mb-3 border-bottom pb-3 list-card">
              <Col xs={2}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#ddd"
                  }}></div>
              </Col>
              <Col xs={6}>
                <strong>{order.name}</strong>
                <div style={{ fontSize: "12px", color: "#777" }}>{order.days} days ago</div>
              </Col>
              <Col xs={4} className="d-flex justify-content-end">
                <Button variant="link" className="text-dark">
                  Reject
                </Button>
                <Button variant="primary" className="ms-2">
                  Accept
                </Button>
              </Col>
            </Row>
          ))}
        </Card>
      </Col>
    </div>
  );
};

export default PendingOrders;
