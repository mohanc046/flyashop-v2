import React, { useEffect, useState } from 'react'
import { CFooter } from '@coreui/react'
import './sideNav.css';
import { useNavigate } from 'react-router-dom';
const AppFooter = (props) => {


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const navigate = useNavigate();


  const {
    
    //topLevelButtonText = "13 DAYS LEFT IN FREE TRAIL",

    topLevelButtonAction = () => navigate('/pricing-list'),

    secondaryButtonText = "GO PREMIUM",

    secondaryButtonAction = () => navigate('/pricing-list'),

  } = props || {};


  return (windowWidth >= 768 ?

    <CFooter className='footerCustom desktop'>
      {/* <div className='footerLayout'>
        {props?.isImage ? <div>   <CImage align="center" src={config.LOGO_BLUE} height={50} /></div> : null}
        <div className="ms-1 FORT12">{`You have 13 days left in your free trial`}</div>
        <div>
          <CButton
            className="px-12 primary-color button FORT12"
            onClick={() => navigate('/pricing-list')}>
            {'Upgrade to Premium'}
          </CButton></div>
      </div> */}
    </CFooter>

    :
    // <CFooter className='footerCustom mobile'>
    //   <div className='mobileFooterLayout'>
    //     <CButton
    //       className="primary-color button FORT12 freeTrialButtonStyle"
    //       onClick={topLevelButtonAction}>
    //       {/* {topLevelButtonText} */}
    //     </CButton>
    //     <div
    //       className="ms-1 FORT12 goPremiumStyle"
    //       onClick={secondaryButtonAction}
    //     >
    //       {secondaryButtonText}
    //     </div>
    //   </div>
    // </CFooter>
    <div></div>
  )
}

export default React.memo(AppFooter)
