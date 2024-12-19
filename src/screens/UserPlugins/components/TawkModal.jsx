import React, { useState } from "react";
import { Col, Row, Form, FormGroup, Label, Button, Input, ModalBody } from "reactstrap";
import { config } from "../../../config";

const TawkModal = () => {
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
            <img src={config.TAWK_TO_LOGO} alt="TAWK" width="100" />
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="propertyId">Property ID</Label>
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
              <Label htmlFor="widgetId">Widget ID</Label>
              <Input
                className="form-control"
                type="text"
                name="widgetId"
                id="widgetId"
                value={formValues.widgetId}
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
            <p>To start using the Tawk.to plugin, you can follow these steps:</p>
            <ol>
              <li>Create an account or login to tawk.to</li>
              <li>Create a property and the widget for your online store</li>
              <li>Click on settings icon at the bottom left of the page</li>
              <li>
                Now, go to the Chat Widget section in the left sidebar (under channels heading)
              </li>
              <li>
                From this page, you'll find a section called Direct Chat Link. Copy the{" "}
                <code>&lt;PROPERTY_ID&gt;/&lt;WIDGET_ID&gt;</code> part from this link and paste it
                in Dukaan plugin's settings page. For example, if you're direct link is{" "}
                <code>https://tawk.to/chat/62c7e3667b967b1179989d99/1g7ed0iph</code>, then the code
                to be copied would be <code>62c7e3667b967b1179989d99/1g7ed0iph</code>
              </li>
              <li>
                The chat widget should be visible on your site now. You can reach out to Dukaan's
                support team for help with the integration
              </li>
            </ol>
          </div>
        </Row>
      </ModalBody>
    </Form>
  );
};

export default TawkModal;
