import React, { useState } from "react";
import { Col, Row, Form, FormGroup, Label, Button, Input, ModalBody } from "reactstrap";
import whatsAppLogo from "../../../assets/images/whatsapp-logo.svg";
import { getServiceURL } from "../../../utils/utils";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showToast } from "../../../store/reducers/toasterSlice";
import { useNavigate } from "react-router-dom";
import { hideSpinner, showSpinner } from "../../../store/reducers/spinnerSlice";

const WhatsAppModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const configurePlugin = async (e) => {
    e.preventDefault();

    try {
      dispatch(showSpinner());
      const storeInfo = JSON.parse(localStorage.getItem("storeInfo"));
      if (!storeInfo || !storeInfo.store || !storeInfo.store.businessName) {
        throw new Error("Invalid store information.");
      }

      const storeName = storeInfo.store.businessName;

      const requestPayload = {
        pluginType: "WHATSAPP",
        phoneNumber: formValues.businessPhoneNumber,
        userName: formValues.assistanceName,
        isActive: true
      };

      // Send the update request
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
              whatsApp: requestPayload
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
        dispatch({ type: "warning", title: "Warning", message });
        dispatch(hideSpinner());
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
