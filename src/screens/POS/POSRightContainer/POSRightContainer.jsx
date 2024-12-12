import { Button, Col, Row } from "antd";
import React from "react";
import { config } from "../../../config";
import "./pos-right-container.css"

const POSRightContainer = (props) => {

    const renderPaymentOptions = () => {
        return (
            <Row className="payment-options">
                <Col className="payment-option active"><img src={config.CASH_ICON} alt="" /></Col>
                <Col className="payment-option"><img src={config.QR_CODE} alt="" /></Col>
                <Col className="payment-option"><img src={config.CREDIT_CARD_ICON} alt="" /></Col>
                <Col className="payment-option"><img src={config.MENU_ICON} alt="" /></Col>
            </Row>
        )
    }

    const renderNumPad = () => {
        return (
            <div className="num-pad">
                <div className="num-row">
                    <div className="option" span={8}>7</div>
                    <div className="option" span={8}>8</div>
                    <div className="option" span={8}>9</div>
                </div>
                <div className="num-row">
                    <div className="option" span={8}>4</div>
                    <div className="option" span={8}>5</div>
                    <div className="option" span={8}>6</div>
                </div>
                <div className="num-row">
                    <div className="option" span={8}>1</div>
                    <div className="option" span={8}>2</div>
                    <div className="option" span={8}>3</div>
                </div>
                <div className="num-row">
                    <div className="option" span={8}>0</div>
                    <div className="option" span={8}>00</div>
                    <div className="option" span={8}>.</div>
                </div>
            </div>
        )
    }

    const renderInvoiceDetails = () => {
        return (
            <div className="invoice-details">
                <p className="letter-base">Invoice #: 08099917</p>
                <div className="detail-items">
                    <span className="letter-bold">Subtotal</span>
                    <span className="letter-bold">$ 170.00</span>
                </div>
                <div className="detail-items">
                    <span className="letter-base">Discounts</span>
                    <span className="letter-base">$ 30.00</span>
                </div>
                <div className="detail-items">
                    <span className="letter-base">Tax (10%)</span>
                    <span className="letter-base">$ 7.00</span>
                </div>
                <div className="grand-total">
                    <span>Grand Total</span>
                    <span>$ 147.00</span>
                </div>
                <div className="mobile-no">
                    <span>Customer Mobile No</span>
                </div>
                {renderPaymentOptions()}
                <Row className="cash-received">
                    <Col span={7} className="label">Cash Received</Col>
                    <Col span={17} className="value"> $ 200.00</Col>
                </Row >
                <div className="balance">
                    <span>Balance</span>
                    <span>$ 53.00</span>
                </div>
                {renderNumPad()}
                <Button className="pay-btn">Pay & Print Receipt</Button>
            </div>
        )
    }

    return (
        <>
            <Row className="bills">
                <Col span={6} className="bill active">BILL 1</Col>
                <Col span={6} className="bill">BILL 2</Col>
                <Col span={6} className="bill">BILL 3</Col>
                <Col span={6} className="bill">BILL 4</Col>
            </Row>
            {renderInvoiceDetails()}
        </>
    )
}
export default POSRightContainer;
