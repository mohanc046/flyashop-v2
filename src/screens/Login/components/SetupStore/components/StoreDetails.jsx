import React, { useState } from "react";
import { Card, CardBody, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";

const StoreDetails = ({ updateStore }) => {
  const [state, setState] = useState({
    country: "",
    businessName: "",
    businessType: ""
  });

  const { country, businessName, businessType } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));

    updateStore({ ...state, [name]: value });
  };

  return (
    <Col md="12" className="d-flex justify-content-center">
      <Card className="bg-white w-75">
        <CardBody className="d-flex flex-column align-items-center">
          <Form className="w-100">
            <Row className="justify-content-center">
              <Col md="6">
                <FormGroup>
                  <Label>Country</Label>
                  <Input type="select" name="country" value={country} onChange={handleInputChange}>
                    <option></option>
                    <option>India</option>
                    <option>USA</option>
                    <option>China</option>
                    <option>Australia</option>
                    <option>United Kingdom</option>
                    <option>Indonesia</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md="6">
                <FormGroup>
                  <Label>Business Name</Label>
                  <Input
                    type="text"
                    name="businessName"
                    value={businessName}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md="6">
                <FormGroup>
                  <Label>Business Type</Label>
                  <Input
                    type="select"
                    name="businessType"
                    value={businessType}
                    onChange={handleInputChange}>
                    <option></option>
                    <option>Sports & Outdoors</option>
                    <option>Home & Kitchen</option>
                    <option>Toys & Games</option>
                    <option>Beauty & Personal Care</option>
                    <option>Health Care</option>
                    <option>Household & Baby Care</option>
                    <option>Kitchen & Dining</option>
                    <option>Office Products</option>
                    <option>Garden & Outdoor</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default StoreDetails;
