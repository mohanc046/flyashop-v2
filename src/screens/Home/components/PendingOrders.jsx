import React from "react";
import { Row, Col, Button, Card } from "reactstrap";

const pendingOrders = [
  { id: 1, name: "sample", days: 49 },
  { id: 2, name: "sample", days: 49 },
  { id: 3, name: "sample", days: 49 },
  { id: 4, name: "sample", days: 49 }
];

const PendingOrders = () => {
  return (
    <div className="container py-4">
      <Col md={10} className="mx-auto">
        <h4 className="mb-4">Pending Orders ({pendingOrders.length})</h4>
        <Card className="p-3 bg-white shadow-sm rounded">
          {pendingOrders.map((order) => (
            <Row key={order.id} className="d-flex align-items-center mb-3 border-bottom pb-3">
              <Col xs={2} className="d-flex justify-content-center">
                <div
                  className="rounded-circle bg-secondary"
                  style={{ width: "40px", height: "40px" }}></div>
              </Col>
              <Col xs={6}>
                <strong>{order.name}</strong>
                <div className="text-muted small">{order.days} days ago</div>
              </Col>
              <Col xs={4} className="d-flex justify-content-end">
                <Button color="link" className="text-decoration-none">
                  Reject
                </Button>
                <Button color="primary" className="ms-2">
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
