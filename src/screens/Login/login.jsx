import React, { useEffect, useState } from "react";
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as LeftBg } from "../../assets/images/bg/login-bgleft.svg";
import { ReactComponent as RightBg } from "../../assets/images/bg/login-bg-right.svg";
import Logo from "../../layouts/logo/Logo.js";
import GoogleOAuthLogin from "../../components/SignInButton/google.jsx";
import FacebookOAuthLogin from "../../components/SignInButton/facebook.jsx";
import "./login.css";
import { CImage } from "@coreui/react";
import { config } from "../../config.js";
import OTPView from "./components/OTPView.jsx";
import SetupStore from "./components/SetupStore/SetupStoreView.jsx";
import { INITIAL_STATE } from "./login.constants.js";
import { LoginService } from "./login.service.jsx";
import { getStoreInfo } from "../../utils/_hooks/index.js";
import _ from "lodash";

const Login = () => {
  const navigate = useNavigate();
  const { initiateLoginWithEmail, verifyLoginOTP } = LoginService();

  const [state, setState] = useState({
    screen: "LOGIN",
    title: "Get Started with Flayashop",
    email: "",
    otp: null
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required")
  });

  const navigateToDashboard = () => {
    const storeInfo = getStoreInfo();

    if (!_.isEmpty(storeInfo)) {
      navigate("/home");
      console.log("navigation:", storeInfo);
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          screen: "CREATE_STORE"
        };
      });
    }
  };

  return (
    <div className="loginBox">
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          {state.screen === "CREATE_STORE" ? (
            <Col lg="12">
              <SetupStore state={state} />
            </Col>
          ) : (
            <Col lg="12" className="loginContainer">
              <Card className="d-flex align-items-center p-3 bg-white rounded">
                <div className="d-flex flex-column align-items-center">
                  <Logo />
                  <h4 className="mb-3 fw-semibold">{state.title}</h4>
                </div>
                {state.screen === "LOGIN" && (
                  <CardBody className="p-4 m-1">
                    <Formik
                      initialValues={INITIAL_STATE}
                      validationSchema={validationSchema}
                      onSubmit={(fields) =>
                        initiateLoginWithEmail({
                          email: fields.email,
                          setState
                        })
                      }
                      render={({ errors, touched }) => (
                        <Form>
                          <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Field
                              name="email"
                              type="text"
                              className={`form-control input${
                                errors.email && touched.email ? " is-invalid" : ""
                              }`}
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Button type="submit" color="primary" className="me-2">
                              Get Started
                            </Button>
                          </FormGroup>
                        </Form>
                      )}
                    />
                    <div class="d-flex flex-column align-items-center text-center my-3">
                      <h5 class="mb-2">Or</h5>
                      <h5 class="mb-3">Get started with</h5>
                      <div class="d-flex justify-content-center gap-3">
                        <span className="cursor-pointer">
                          <CImage align="center" src={config.APPLE} height={50} width={50} />
                        </span>
                        <span className="cursor-pointer">
                          <GoogleOAuthLogin changeState={setState} />
                        </span>
                        <span className="cursor-pointer">
                          <FacebookOAuthLogin changeState={setState} />
                        </span>
                      </div>
                    </div>
                  </CardBody>
                )}

                {state.screen === "OTP" && (
                  <OTPView
                    state={state}
                    verifyOTP={verifyLoginOTP}
                    navigateToDashboard={navigateToDashboard}
                    setState={setState}
                  />
                )}
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Login;
