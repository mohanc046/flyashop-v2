import React from "react";
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LeftBg } from "../../assets/images/bg/login-bgleft.svg";
import { ReactComponent as RightBg } from "../../assets/images/bg/login-bg-right.svg";
import Logo from "../../layouts/logo/Logo";
import GoogleOAuthLogin from "../../components/SignInButton/google";
import FacebookOAuthLogin from "../../components/SignInButton/facebook";
import "./login.css";
import { CImage } from "@coreui/react";
import { config } from "../../config";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
  });

  return (
    <div className="loginBox">
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <Card className="d-flex align-items-center p-3 bg-white rounded">
              <Logo />
              <CardBody className="p-4 m-1">
                <h5 className="mb-3">Get Started with Flyashop</h5>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(fields) => {
                    // eslint-disable-next-line no-alert
                    alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                    navigate("/");
                  }}
                  render={({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="email">Email</Label>
                        <Field
                          name="email"
                          type="text"
                          className={`form-control${
                            errors.email && touched.email ? " is-invalid" : ""
                          }`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="primary" className="me-2">
                          Login
                        </Button>
                      </FormGroup>
                    </Form>
                  )}
                />
              </CardBody>
              <div class="d-flex flex-column align-items-center text-center my-3">
                <h5 class="mb-2">Or</h5>
                <h5 class="mb-3">Get started with</h5>
                <div class="d-flex justify-content-center gap-3">
                  <span>
                    <CImage align="center" src={config.APPLE} height={50} width={50} />
                  </span>
                  <span>
                    <GoogleOAuthLogin />
                  </span>
                  <span>
                    <FacebookOAuthLogin />
                  </span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
