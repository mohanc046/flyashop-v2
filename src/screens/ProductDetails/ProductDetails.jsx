import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import _ from "lodash";
import { getServiceURL } from "../../utils/utils";
import { getAuthToken } from "../../utils/_hooks";
import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const { state: propsState } = useLocation();

  const [state, setState] = useState({
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
  });
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    if (propsState) {
      setState((prevState) => ({
        ...prevState,
        productName: propsState.productName || "",
        productDescription: propsState.productDescription || "",
        productCategory: propsState.productCategory || "",
        price: propsState.price || "",
        discountedPrice: propsState.discountPrice || "",
        quantity: propsState.quantity || "",
        sizes: propsState.sizes || "",
        colors: propsState.colors || "",
        shipmentWeight: propsState.shipmentWeight || "",
        barcode: propsState.barcode || "",
        gstPercentage: propsState.gstPercentage || ""
      }));
    }
    console.log(propsState);
    getCategoryList();
  }, [propsState]);

  const getCategoryList = async () => {
    try {
      const response = await fetch(`${getServiceURL()}/category`, {
        method: "GET",
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      if (response.ok) {
        const data = await response.json();
        const categoryList = _.get(data, "categoryList", []);
        const list = categoryList.map((e) => {
          return { value: e.value, name: e.key };
        });
        setCategoryList(list);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));

    updateStore({ [name]: value });
  };

  const updateStore = (newData) => {
    setState((prevState) => ({
      ...prevState,
      ...newData
    }));
  };

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
    gstPercentage
  } = state;

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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}>
                    <option value="">Select a category</option>
                    {categoryList.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Price</Label>
                  <Input type="number" name="price" value={price} onChange={handleInputChange} />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Discounted Price</Label>
                  <Input
                    type="number"
                    name="discountedPrice"
                    value={discountedPrice}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Sizes</Label>
                  <Input type="select" name="sizes" value={sizes} onChange={handleInputChange}>
                    <option></option>
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
                  <Input type="select" name="colors" value={colors} onChange={handleInputChange}>
                    <option></option>
                    <option>red</option>
                    <option>blue</option>
                    <option>white</option>
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
                    onChange={handleInputChange}>
                    <option></option>
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
                  <Input type="text" name="barcode" value={barcode} onChange={handleInputChange} />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>GST Percentage</Label>
                  <Input
                    type="number"
                    name="gstPercentage"
                    value={gstPercentage}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProductDetails;
