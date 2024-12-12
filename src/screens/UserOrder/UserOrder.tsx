import { faBell , faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import React, { useState, useEffect } from 'react'
import { config } from "../../config";
import StarRatingComponent from 'react-star-rating-component';
import './UserOrder.css'

export default function Orders() {

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

    const [state, setState] = useState({ screen: 'WELCOME' });

    const renderDesktopVersion = () => {
        return <div className="">
        </div>
    }

    const renderMobileVersion = () => {
        return <div>
            <div className="header-mob-layout spaceBetween">
                <div><FontAwesomeIcon icon={faArrowLeft} /></div>
                <div className="BOLD FONT18">My Order</div>
                <div><FontAwesomeIcon icon={faBell} /></div>
            </div>
            <div className="shop-mob-layout">
             <br></br> <br></br>  
            <div className="flex alignCenter orderImage"><img className="imageFullSize" src={config.P1}/></div>
            <br></br> 
                <div className="flex spaceBetween">
                    <div>
                        <div className="BOLD-TEXT">Item Name</div>
                        <div>Size: 7.60 fl</div>
                    </div>
                    <div>
                        <div>   <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={3}
                            onStarClick={() => {}} /></div>
                        <div className="FONT12">(150 reviews)</div>
                    </div>
                </div>
                <br></br> 
                <div className="flex spaceBetween">
                    <div className="BOLD-TEXT">$29.99</div>
                    <div><button className="greenColor addButton"> <span>-</span> 2 <span>+</span> </button></div>
                </div>
                <br></br>        <br></br> 
                <div className="flex spaceBetween">
                    <button className="primary-color button FORT12 orderButton">Add to Cart</button>
                    <span className="width10"></span>
                    <button className="primary-color button FORT12 orderButton">Buy</button>
                </div>
            </div>
        </div>
    }

    return <> <div>
        {windowWidth <= 768 ? renderMobileVersion() : renderDesktopVersion()}
    </div>
    </>
};