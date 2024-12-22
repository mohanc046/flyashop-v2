import React, { Component } from "react";
import { Card, CardBody, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productDescription: "",
      productCategory: "",
      price: "",
      discountedPrice: "",
      quantity: "",
      sizes: "",
      colors: "",
      shipmentWeight: "",
      barcode: "",
      gstPercentage: "",
      errors: {
        productName: "",
        productDescription: "",
        productCategory: "",
        price: "",
        discountedPrice: "",
        quantity: "",
        sizes: "",
        colors: "",
        shipmentWeight: "",
        barcode: "",
        gstPercentage: ""
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
    const {
      productName,
      productDescription,
      productCategory,
      price,
      quantity,
      barcode,
      gstPercentage
    } = this.state;
    let errors = {};

    if (!productName.trim()) errors.productName = "Product Name is required!";
    if (!productDescription.trim()) errors.productDescription = "Product Description is required!";
    if (!productCategory.trim()) errors.productCategory = "Product Category is required!";
    if (!price.trim() || isNaN(price)) errors.price = "Valid Price is required!";
    if (!quantity.trim() || isNaN(quantity)) errors.quantity = "Valid Quantity is required!";
    if (!barcode.trim()) errors.barcode = "Barcode is required!";
    if (!gstPercentage.trim() || isNaN(gstPercentage))
      errors.gstPercentage = "Valid GST Percentage is required!";

    this.setState({ errors });
    return Object.keys(errors).length === 0; // Returns true if no errors
  };

  isValidated = () => {
    if (this.validateFields()) {
      this.props.updateStore(this.state);
      return true;
    }
    return false;
  };

  render() {
    const {
      productName,
      productDescription,
      productCategory,
      price,
      discountedPrice,
      quantity,
      sizes,
      colors,
      shipmentWeight,
      barcode,
      gstPercentage,
      errors
    } = this.state;

    return (
      <Col md="12">
        <Card className="bg-white">
          <CardBody>
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label>Product Name</Label>
                    <Input
                      type="text"
                      name="productName"
                      value={productName}
                      onChange={this.handleInputChange}
                      className={errors.productName ? "is-invalid" : ""}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Product Description</Label>
                    <Input
                      type="text"
                      name="productDescription"
                      value={productDescription}
                      onChange={this.handleInputChange}
                      className={errors.productDescription ? "is-invalid" : ""}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Product Category</Label>
                    <Input
                      type="select"
                      name="productCategory"
                      value={productCategory}
                      onChange={this.handleInputChange}
                      className={errors.productCategory ? "is-invalid" : ""}>
                      <option>Game & Sports</option>
                      <option>Home & Appliances</option>
                      <option>Electronics</option>
                      <option>Furnitures</option>
                      <option>Office Products</option>
                      <option>Eye Glass</option>
                      <option>Kitchen</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Price</Label>
                    <Input
                      type="number"
                      name="price"
                      value={price}
                      onChange={this.handleInputChange}
                      className={errors.price ? "is-invalid" : ""}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Discounted Price</Label>
                    <Input
                      type="number"
                      name="discountedPrice"
                      value={discountedPrice}
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      name="quantity"
                      value={quantity}
                      onChange={this.handleInputChange}
                      className={errors.quantity ? "is-invalid" : ""}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Sizes</Label>
                    <Input
                      type="select"
                      name="sizes"
                      value={sizes}
                      onChange={this.handleInputChange}
                      className={errors.sizes ? "is-invalid" : ""}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Colors</Label>
                    <Input
                      type="select"
                      name="colors"
                      value={colors}
                      onChange={this.handleInputChange}>
                      <option>Red</option>
                      <option>Blue</option>
                      <option>White</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Shipment Weight</Label>
                    <Input
                      type="select"
                      name="shipmentWeight"
                      value={shipmentWeight}
                      onChange={this.handleInputChange}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>Barcode</Label>
                    <Input
                      type="text"
                      name="barcode"
                      value={barcode}
                      onChange={this.handleInputChange}
                      className={errors.barcode ? "is-invalid" : ""}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label>GST Percentage</Label>
                    <Input
                      type="number"
                      name="gstPercentage"
                      value={gstPercentage}
                      onChange={this.handleInputChange}
                      className={errors.gstPercentage ? "is-invalid" : ""}
                    />
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

export default Step3;
