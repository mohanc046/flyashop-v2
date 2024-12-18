import React from "react";
import { Row, Col, Button, Card } from "reactstrap";
import "../Home.scss";

const quickLinks = [
  {
    id: 1,
    title: "Add shop Address",
    description: "Shops with addresses build more trust",
    buttonText: "Edit"
  },
  {
    id: 2,
    title: "Link your social media",
    description: "Links social media helps 4 times more sales",
    buttonText: "Link"
  },
  {
    id: 3,
    title: "Get a custom Domain",
    description: "It helps you establish your brand and trust",
    buttonText: "Get"
  },
  {
    id: 4,
    title: "Pick a plan",
    description: "Edit more & add on your online shop",
    buttonText: "Pick"
  }
];

const QuickLinks = () => {
  return (
    <div className="lists-container">
      <Col md={10} className="list shadow-sm rounded">
        <h4 className="list-heading">Quick Links</h4>
        <Card className="p-3 bg-white">
          {quickLinks.map((item) => (
            <Row
              key={item.id}
              className="d-flex align-items-center mb-3 border-bottom pb-3 list-card">
              <Col xs={2}>
                <div
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    border: "2px dashed #777"
                  }}></div>
              </Col>
              <Col xs={6}>
                <strong>{item.title}</strong>
                <div style={{ fontSize: "12px", color: "#777" }}>{item.description}</div>
              </Col>
              <Col xs={4} className="d-flex justify-content-end">
                <Button variant="link" className="text-dark">
                  Edit
                </Button>
              </Col>
            </Row>
          ))}
        </Card>
      </Col>
    </div>
  );
};

export default QuickLinks;
