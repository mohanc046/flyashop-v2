import React, { useState } from "react";
import { Col, Row, Form, FormGroup, Label, Button, Input, ModalBody } from "reactstrap";
import { config } from "../../../config";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/reducers/toasterSlice";
import axios from "axios";
import { getServiceURL } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { hideSpinner, showSpinner } from "../../../store/reducers/spinnerSlice";

const TawkModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const configurePlugin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      dispatch(showSpinner());
      const storeInfo = JSON.parse(localStorage.getItem("storeInfo"));
      if (!storeInfo || !storeInfo.store || !storeInfo.store.businessName) {
        throw new Error("Invalid store information.");
      }

      const storeName = storeInfo.store.businessName;

      const requestPayload = {
        pluginType: "TAWK",
        propertyId: formValues.propertyId,
        widgetId: formValues.widgetId,
        isActive: true
      };

      const response = await axios.put(
        `${getServiceURL()}/store/plugin/config/${storeName}`,
        requestPayload
      );

      const { statusCode = 500, message = "Issue while updating plugin config!" } =
        response.data || {};

      if (statusCode === 200) {
        const updatedStoreInfo = {
          ...storeInfo,
          store: {
            ...storeInfo.store,
            pluginConfig: {
              ...storeInfo.store.pluginConfig,
              tawk: requestPayload
            }
          }
        };

        localStorage.setItem("storeInfo", JSON.stringify(updatedStoreInfo));
        dispatch(
          showToast({
            type: "success",
            title: "Success",
            message: "Plugin configured successfully!"
          })
        );
        dispatch(hideSpinner());
        navigate("/home");
      } else {
        dispatch(hideSpinner());
        notification.open({ type: "warning", message });
      }
    } catch (error) {
      console.error("Error configuring plugin:", error.message || error);
      dispatch(
        showToast({ type: "error", title: "Error", message: "Issue while configuring plugin!" })
      );
      dispatch(hideSpinner());
    }
  };

  return (
    <Form onSubmit={configurePlugin}>
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
              <li>Create an account or log in to tawk.to.</li>
              <li>Create a property and the widget for your online store.</li>
              <li>Click on the settings icon at the bottom left of the page.</li>
              <li>
                Go to the <strong>Chat Widget</strong> section in the left sidebar (under the
                Channels heading).
              </li>
              <li>
                Find the section called <strong>Direct Chat Link</strong>. Copy the{" "}
                <code>&lt;PROPERTY_ID&gt;/&lt;WIDGET_ID&gt;</code> part from this link and paste it
                in Dukaan plugin's settings page.
                <br />
                For example, if your direct link is{" "}
                <code>https://tawk.to/chat/62c7e3667b967b1179989d99/1g7ed0iph</code>, then copy{" "}
                <code>62c7e3667b967b1179989d99/1g7ed0iph</code>.
              </li>
              <li>
                The chat widget should now be visible on your site. Contact Dukaan's support team
                for integration help.
              </li>
            </ol>
          </div>
        </Row>
      </ModalBody>
    </Form>
  );
};

export default TawkModal;
