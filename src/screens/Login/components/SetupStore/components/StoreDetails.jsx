import React, { Component } from "react";
import { Card, CardBody, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import _ from "lodash";
import { INITIAL_STATE } from "../../../login.constants";
import { notification } from "antd";
import { getServiceURL } from "../../../../../utils/utils";
import axios from "axios";
import { FIXED_VALUES } from "../../../../../utils/constants";
const {
  statusCode: { SUCCESS }
} = FIXED_VALUES;

class StoreDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "India",
      businessName: "",
      businessType: "Sports & Outdoors",
      errors: {
        country: "",
        businessName: "",
        businessType: ""
      }
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if (this.validateFields()) {
      this.props.updateStore(this.state);
      return true;
    }
    return false;
  };

  validateFields = () => {
    const { country, businessName, businessType } = this.state;
    let errors = {};

    if (!country.trim()) errors.country = "Country is required!";
    if (!businessName.trim()) errors.businessName = "Business Name is required!";
    if (!businessType.trim()) errors.businessType = "Business Type is required!";

    this.setState({ errors });
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  createStore = async ({ currency }) => {
    const { businessName, country, businessType } = this.state;

    try {
      const URL = this.getServiceURL();

      const loginResponse = await axios.post(`${URL}/store/create`, {
        location: country,
        businessName,
        businessType: [businessType],
        currency
      });

      const {
        data: { statusCode = "500", message = "Issue while creating store" }
      } = loginResponse;

      if (statusCode === SUCCESS) {
        notification.open({ type: "success", description: message });

        // Store data in localStorage as a string
        localStorage.setItem(
          "storeInfo",
          JSON.stringify({
            store: {
              businessName,
              businessType: [businessType],
              location: country
            }
          })
        );

        return true;
      }

      notification.open({ type: "warning", description: message });
      return false;
    } catch (error) {
      console.error("Error creating store:", error);
      notification.open({ type: "error", description: "Error while creating the store." });
      return true;
      // return false;
    }
  };

  initiateStoreCreation = async () => {
    const { businessName, country, businessType } = this.state;

    if (![businessType, businessName, country].includes("")) {
      const currencyIndex = _.findIndex(
        INITIAL_STATE.countryList,
        (countryName) => countryName === country
      );

      const currency = INITIAL_STATE.currencyList[currencyIndex];

      const result = await this.createStore({ currency });
      return result;
    } else {
      notification.open({
        type: "warning",
        description: "Kindly provide all the required fields."
      });
      return false;
    }
  };

  isValidated = async () => {
    if (this.validateFields()) {
      this.props.updateStore(this.state); // Assuming this.props.updateStore is required
      const result = await this.initiateStoreCreation();
      return result;
    }
    return false;
  };

  render() {
    const { country, businessName, businessType, errors } = this.state;

    return (
      <Col md="12" className="d-flex justify-content-center">
        <Card className="bg-white w-75">
          <CardBody className="d-flex flex-column align-items-center">
            <Form className="w-100">
              <Row className="justify-content-center">
                <Col md="6">
                  <FormGroup>
                    <Label>Country</Label>
                    <Input
                      type="select"
                      name="country"
                      value={country}
                      onChange={this.handleInputChange}
                      className={errors.country ? "is-invalid" : ""}>
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
                      onChange={this.handleInputChange}
                      className={errors.businessName ? "is-invalid" : ""}
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
                      onChange={this.handleInputChange}
                      className={errors.businessType ? "is-invalid" : ""}>
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
  }
}

export default StoreDetails;
