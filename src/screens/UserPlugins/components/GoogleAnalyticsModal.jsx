import React, { useState } from "react";
import { Col, Row, Form, FormGroup, Label, Button, Input, ModalBody } from "reactstrap";
import { config } from "../../../config";

const GoogleAnalyticsModal = () => {
  const [formValues, setFormValues] = useState({
    propertyId: "",
    widgetId: ""
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
            <img src={config.GOOGLE_ANALYTICS} alt="Google Analytics" width="100" />
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="propertyId">Analytics Property ID</Label>
              <Input
                className="form-control"
                type="text"
                name="propertyId"
                id="propertyId"
                value={formValues.propertyId}
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
            <p>Here's how you can start using Google Analytics:</p>
            <ol>
              <li>
                To start using Google Analytics, create an account on it or log in (if you have one)
              </li>
              <li>Once logged in, click on Admin</li>
              <li>
                Select the account from the menu in the <code>ACCOUNT</code> column.
              </li>
              <li>
                Select the property from the menu in the <code>PROPERTY</code> column.
              </li>
              <li>
                Under <code>PROPERTY</code>, click Data Streams, then click on Tracking Info
              </li>
              <li>
                Now, select <code>Tracking/Measurement</code> Code
              </li>
              <li>
                Copy the <code>Tracking ID</code> displayed at the top of the page
              </li>
              <li>Now, Install the Google Analytics plugin on Dukaan</li>
              <li>Click on Settings and it’ll ask for Analytics Property ID</li>
              <li>
                Paste the <code>Tracking ID</code> here to complete the installation
              </li>
            </ol>
          </div>
        </Row>
      </ModalBody>
    </Form>
  );
};

export default GoogleAnalyticsModal;
