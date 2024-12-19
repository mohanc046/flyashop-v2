import React, { useState } from "react";
import { Col, Row, Form, FormGroup, Label, Button, Input, ModalBody } from "reactstrap";
import whatsAppLogo from "../../../assets/images/whatsapp-logo.svg";

const WhatsAppModal = () => {
  const [formValues, setFormValues] = useState({
    businessPhoneNumber: "",
    assistanceName: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Form Values:", formValues);

    // Add further processing logic here (e.g., API call)
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ModalBody>
        <Row>
          <Col md={6} className="text-center">
            <img src={whatsAppLogo} alt="WhatsApp" width="100" />
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="businessPhoneNumber">Business Phone Number</Label>
              <Input
                className="form-control"
                type="text"
                name="businessPhoneNumber"
                id="businessPhoneNumber"
                value={formValues.businessPhoneNumber}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="assistanceName">Assistance Name</Label>
              <Input
                className="form-control"
                type="text"
                name="assistanceName"
                id="assistanceName"
                value={formValues.assistanceName}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Configure
              </Button>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <div>
            <h3>Instructions:</h3>
            <p>Here's how you can start using WhatsApp Chat Bubble on your Dukaan store:</p>
            <ol>
              <li>Click on Install</li>
              <li>
                In the input field, add your WhatsApp number prefixed with your country code (no
                verification required). For example, if your country is India, you will input
                91xxxxxxxxxx
              </li>
              <li>
                Once Installed, your customers can see the WhatsApp chat bubble at the bottom left
                of your store page
              </li>
            </ol>
          </div>
        </Row>
      </ModalBody>
    </Form>
  );
};

export default WhatsAppModal;
