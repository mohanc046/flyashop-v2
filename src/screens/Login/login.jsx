import React, { Fragment, useEffect, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CRow,
  CImage
} from '@coreui/react'
import { useStoreActions, useStoreState } from '../../store/hooks';
import { isValid } from '../../utils/validation';
import { useNavigate } from "react-router-dom";
import { config } from '../../config';
import _ from 'lodash';
import './login.css'
import { renderInputBox, renderTitle, emptySpace, renderDropdown, MobileTabUI } from '../../utils/utilsUI';
import GoogleOAuthLogin from '../../components/SignInButton/google';
import FacebookOAuthLogin from '../../components/SignInButton/facebook';
import { FIXED_VALUES } from '../../utils/constants';
import OtpInput from 'react-otp-input';
import { notification } from 'antd';


const INITIAL_STATE = {
  email: "",
  otp: "",
  businessName: "",
  businessType: "",
  country: "",
  isLoaderStatus: false,
  isLoaderEnabled: false,
  countryList: ["India", "USA", "China", "Australia", "United Kingdom", "Indonesia"],
  currencyList: ["INR", "USD" , "CNY" , "AUD" , "GBP", "IDR"]
}

const Login = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  let loginStoreDetails = useStoreState(state => state.login);

  let userStoreDetails = useStoreState(state => state.user);

  let shopDetails = useStoreState(state => state.shop);

  const {
    errorStatus, isLoaderEnabled, email = "",
    otp = "", businessName, businessType, country, isOTPSent = false, isOTPVerified = false, 
  } = loginStoreDetails.data;

  const { isLoaderStatus = false } = shopDetails.data;


  const { screenType = "" } = userStoreDetails.data;

  let updateState = useStoreActions(action => action.login.updateStore);

  let createStore = useStoreActions(action => action.shop.createStore);

  let updateShopStore = useStoreActions(action => action.shop.updateStore);

  let updateUserStore = useStoreActions(action => action.user.updateStore);

  let initiateLoginWithEmail = useStoreActions(action => action.login.initiateLoginWithEmail);

  let verifyLoginOTP = useStoreActions(action => action.login.verifyLoginOTP);

  const navigate = useNavigate();

  const moveToNext = (data) => {

    initiateLoginWithEmail(data)

  }

  const initiateStoreCreation = (data) => {

    // currencyList
    let { businessName = "", country = "", businessType = "" } = data;

    if (_.isEmpty(businessType)) businessType = "";
   
    if (![businessType,businessName , country].includes("")) {
      const currencyIndex = _.findIndex(INITIAL_STATE.countryList , (countyName) => countyName === country);
      const currency = INITIAL_STATE.currencyList[currencyIndex];
      createStore({
        ...data, currency
      })
    } else {
      notification.open({ type: "success", description: "Kindly Provide All the Required Fields" })
    }

  }

  const navigateToDashboard = () =>{
    navigate('/home')
  }

  const navigateToCart = () => {
    navigate('/user-cart')
  }

  const navigateToProducts = () =>{
    navigate('/products')
  }

  const [state, setState] = useState({
    screen: 'LOGIN',
    title: 'Get Started with Flayashop',
    tabName: "Setup",
    subTitle: "",
    loginMethod: {
      name: 'Get Started',
      onClick: moveToNext
    }
  });

  const loginBtnStyles = { height: state.screen === 'OTP' ? 54 : 64, borderRadius: 30, fontSize: 16, fontWeight: 600, lineHeight: '20px' };


  useEffect(() => {
    if (isOTPSent) {
      const loginMethod = {
        name: 'Verify',
        onClick: verifyOTP
      }
      setState({
        ...state, title: 'Verify code',
        screen: "OTP", subTitle: 'Enter the 4-digit code we have sent to',
        loginMethod
      });
    }

    if (isOTPVerified || screenType === "CREATE_STORE") {
      const loginMethod = {
        name: 'Create Store',
        onClick: initiateStoreCreation
      }
      setState({ ...state, title: 'Set up your video store', screen: "CREATE_STORE", subTitle: '', loginMethod });

    }

  }, [isOTPSent, isOTPVerified, screenType])


  const verifyOTP = (data) => {

    verifyLoginOTP(data)

  }

  const updateAndValidateFormField = (event) => {

    const { name, value } = event.target;

    let validationResult = !isValid(name, value);

    updateState({ [name]: value, errorStatus: { ...errorStatus, [name]: validationResult } })

  }

  useEffect(() => {
    updateState(INITIAL_STATE);
    return () => updateState(INITIAL_STATE);
  }, [])  

  const renderButton = (payload) => {
    const { name, onClick, data, styles = {} } = payload;
    return <CRow className=''>
      <CCol xs={12}>
        <CButton
          className={`px-12 primary-color button loginButton ${state.screen === "OTP" ? "btn-at-bottom" : ""}`}
          style={styles}
          onClick={() => onClick(data)}>
          {(isLoaderEnabled || isLoaderStatus) ?
            <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            :
            <> {name}</>
          }
        </CButton>
      </CCol>
    </CRow>
  }

  const renderThirdParty = ({ title }) => {
    return <Fragment>
      <CRow className='textCenter'>
        <span className='BOLD FORT12'>Or</span>
        <span className='BOLD FORT12'>{title}</span>
      </CRow>
      <br></br>
      <CRow className='textCenter'>
        <div className='flexCenter'>
          <span className='margin7Right'><CImage align="center" src={config.APPLE} height={50} width={50} /></span>
          <span className='margin7Right'><GoogleOAuthLogin /></span> 
          <span className='margin7Right'><FacebookOAuthLogin /></span> 
        </div>
      </CRow>
      {emptySpace()}
      {emptySpace()}
      <CRow className='FORT12 textCenter'>
        <span> By continuing, you agree to our <span className='underline'>Terms of Use</span> and <span className='underline'>Privacy Policy</span>.</span>
      </CRow>
    </Fragment>
  }

  const resentUI = () => {
    return <CRow className='FORT12 gap-1'>
      <span className='textCenter'> Didn't receive the code? </span>
      <span className='underline BOLD textCenter' onClick={() => initiateLoginWithEmail({ email })}>Re-send code</span>
    </CRow>
  }

  const renderDeskTopVersion = () => {
    return <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody style={{ position: 'relative' }}>
                  <CForm>
                    <CImage align="center" src={config.LOGO_BLUE} height={75} />
                    <br />
                    {renderTitle(state.title)}

                    {state.subTitle && <CRow className='FORT12'>
                      <span> {state.subTitle}
                        <br></br><span className='underline'>{email}</span></span>
                      {emptySpace()}
                      {emptySpace()}
                    </CRow>}

                    {state.screen === 'LOGIN' && renderInputBox({
                      name: "email",
                      value: email,
                      placeholder: 'Enter Your Email',
                      onChange: updateAndValidateFormField,
                      errorStatus: _.get(errorStatus, 'email', false)
                    })}

                    {state.screen === 'OTP' &&
                      <div className='otp-container d-flex justify-content-center'>
                        <OtpInput
                          value={otp}
                          onChange={(value) => updateAndValidateFormField({ target: { name: 'otp', value } })}
                          numInputs={4}
                          renderSeparator={<span> </span>}
                          renderInput={(props) => <input name='otp' {...props} />} />
                      </div>
                    }

                    {state.screen === 'CREATE_STORE' && <Fragment>
                      {renderDropdown({
                        name: "country",
                        value: country,
                        list: INITIAL_STATE.countryList,
                        placeholder: 'Select Your Country',
                        onChange: updateAndValidateFormField
                      })}
                      {renderInputBox({
                        name: "businessName",
                        value: businessName,
                        placeholder: 'Enter Your Business Name',
                        onChange: updateAndValidateFormField
                      })}
                      {renderDropdown({
                        name: "businessType",
                        value: businessType,
                        list: ["", ...FIXED_VALUES.BUSINESS_TYPE],
                        placeholder: 'Select Your Business type',
                        onChange: updateAndValidateFormField
                      })}
                    </Fragment>}

                    {emptySpace()}
                    {renderButton({ ...state.loginMethod, data: { email, otp, updateUserStore, businessName, businessType, country, navigateToDashboard, navigateToProducts, updateShopStore, navigateToCart }, styles: loginBtnStyles })}
                    {emptySpace()}
                    {state.screen === 'LOGIN' && renderThirdParty({ title: 'Get started with' })}
                    {state.screen === 'OTP' && resentUI()}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  }

  const renderRememberMeAndForgotPassword = () => {
    return (
      <CContainer className="remember-me-container">
        <CRow className="d-flex flex-row justify-content-between">
          <CCol xs={6} className='remember-me d-flex align-items-center gap-1'>
            <CImage src={config.TICK} height={75} />
            <span>Remember Me</span>
          </CCol>
          <CCol xs={6} className='forgot-password d-flex align-items-center justify-content-end'>
            <span>Forgot Password?</span>
          </CCol>
        </CRow>
      </CContainer>
    )
  }

  const renderLoginMobileOne = () => {
    let buttonLabel = state.screen === 'OTP' ? 'Verify': 'Sign In';
    if (state.screen === 'CREATE_STORE') buttonLabel = 'Create Store'
    return <Fragment>
      {state.screen === 'LOGIN' && <Fragment>
        <div className='textCenter loginHead'>Login here</div>
        <div className='textCenter loginSubHead'>Welcome back you’ve <br></br>
          been missed!</div>
        <br></br>
      </Fragment>}

      {state.screen === 'OTP' && <Fragment>
        <h4 className='otp-title'> Enter your verification code</h4>

        <div className='FONT14 textCenter'>Enter the 4-digit code we have sent to <br></br> <span className='FONT14 underline'>{email}</span></div>
        <br></br>   <br></br>   <br></br> <br></br> 
      </Fragment>}
      {state.screen === 'LOGIN' &&
        <>
          {
          renderInputBox({
            name: "email",
            value: email,
            placeholder: 'Enter Your Email',
            onChange: updateAndValidateFormField,
            errorStatus: _.get(errorStatus, 'email', false)
          })
          }
          {
            renderRememberMeAndForgotPassword()
          }
        </>
      }
      {state.screen === 'OTP' &&
        <div className='otp-container d-flex justify-content-center'>
          <OtpInput
            value={otp}
            onChange={(value) => updateAndValidateFormField({ target: { name: 'otp', value } })}
            numInputs={4}
            renderSeparator={<span> </span>}
            renderInput={(props) => <input name='otp' {...props} />} />
        </div>
      }
      {state.screen === 'CREATE_STORE' && <Fragment>
        {MobileTabUI(state.tabName)}
        {renderDropdown({
          name: "country",
          value: country,
          list: INITIAL_STATE.countryList,
          placeholder: 'Select Your Country',
          onChange: updateAndValidateFormField
        })}
        {renderInputBox({
          name: "businessName",
          value: businessName,
          placeholder: 'Business Name',
          onChange: updateAndValidateFormField
        })}
        {renderDropdown({
          name: "businessType",
          value: businessType,
          list: ["", ...FIXED_VALUES.BUSINESS_TYPE],
          placeholder: 'Business type',
          onChange: updateAndValidateFormField
        })}
      </Fragment>}
      {emptySpace()}
      {state.screen === 'OTP' && resentUI()}
      <div className='fullWidth'>
        {renderButton({ ...state.loginMethod, name: buttonLabel, data: { email, otp, updateUserStore, businessName, businessType, country, navigateToDashboard, navigateToProducts, updateShopStore, navigateToCart }, styles: loginBtnStyles })}
      </div>
      {emptySpace()}
      {state.screen === 'LOGIN' && renderThirdParty({ title: 'Sign In with' })}

    </Fragment>
  }

  const renderMobileVersion = () => {
   
    return <div className={state.screen === 'CREATE_STORE' ? "mobileLoginLayout": "mobileLoginLayout justifyCenter"}>
      {renderLoginMobileOne()}
    </div>
  }

  return (
    windowWidth <= 768 ? renderMobileVersion() : renderDeskTopVersion()
  )
}

export default Login
