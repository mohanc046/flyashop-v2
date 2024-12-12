import { Row, Col, Input } from "antd";
import "./pos-home.css"
import { config } from "../../config";
import POSRightContainer from "./POSRightContainer/POSRightContainer";
import POSLayout from "./POSLayout/POSLayout";

const POSHome = (props) => {

    const options = [
        { name: "Return" },
        { name: "Exchange" },
        { name: "Cancel sale" },
        { name: "Add Delivery" },
        { name: "Duplicate" },
        { name: "Hold Order" },
        { name: "Add Product" },
        { name: "Show Stock" },
        { name: "Edit Access" },
        { name: "Edit Discount" },
        { name: "Price List" },
        { name: "Close Day" },
    ]
    const items = [
        {
            name: "CM Coconut Oil",
            subTitle: "0.5L",
            barcode: "T00023",
            unitPrice: 100.00,
            unit: "L",
            quantity: 1,
            discount: {
                type: "percentage",
                value: 20
            },
            total: 200.00
        },
        {
            name: "Sugar",
            subTitle: "35 minutes ago",
            barcode: "T00024",
            unitPrice: 10.00,
            unit: "KG",
            quantity: 2,
            discount: {
                type: "amount",
                value: 10
            },
            total: 90.00
        },
        {
            name: "CM Coconut Oil",
            subTitle: "0.5L",
            barcode: "T00023",
            unitPrice: 100.00,
            unit: "Pack",
            quantity: 1,
            discount: {
                type: "percentage",
                value: 20
            },
            total: 200.00
        },
        {
            name: "Sugar",
            subTitle: "35 minutes ago",
            barcode: "T00024",
            unitPrice: 10.00,
            unit: "KG",
            quantity: 2,
            discount: {
                type: "amount",
                value: 10
            },
            total: 90.00
        },
        {
            name: "CM Coconut Oil",
            subTitle: "0.5L",
            barcode: "T00023",
            unitPrice: 100.00,
            unit: "L",
            quantity: 1,
            discount: {
                type: "percentage",
                value: 20
            },
            total: 200.00
        },
        {
            name: "Sugar",
            subTitle: "35 minutes ago",
            barcode: "T00024",
            unitPrice: 10.00,
            unit: "KG",
            quantity: 2,
            discount: {
                type: "amount",
                value: 10
            },
            total: 90.00
        },
        {
            name: "CM Coconut Oil",
            subTitle: "0.5L",
            barcode: "T00023",
            unitPrice: 100.00,
            unit: "Pack",
            quantity: 1,
            discount: {
                type: "percentage",
                value: 20
            },
            total: 200.00
        },
        {
            name: "Sugar",
            subTitle: "35 minutes ago",
            barcode: "T00024",
            unitPrice: 10.00,
            unit: "KG",
            quantity: 2,
            discount: {
                type: "amount",
                value: 10
            },
            total: 90.00
        },
    ]

    return (
        <POSLayout screen="Home">
            <div className="pos-home-container">
                <Row style={{ height: "100%" }}>
                    <Col className="left" span={18}>
                        <Input className="search" placeholder="Scan Product or Enter item Code"></Input>
                        <div className="items-container">
                            {
                                items.length > 0 ?
                                    <>
                                        <Row className="header-row">
                                            <Col span={1} className="item-header-label">S.No</Col>
                                            <Col span={4} className="item-header-label ps-2">Item Name</Col>
                                            <Col span={3} className="item-header-label text-center">Barcode</Col>
                                            <Col span={3} className="item-header-label text-center">Unit Price</Col>
                                            <Col span={2} className="item-header-label text-center">Unit</Col>
                                            <Col span={4} className="item-header-label text-center">Quantity</Col>
                                            <Col span={2} className="item-header-label text-center">Discount</Col>
                                            <Col span={4} className="item-header-label text-center">Total (without Tax)</Col>
                                            <Col span={1} className="item-header-label"></Col>
                                        </Row>
                                        {
                                            items.map((item, index) => (
                                                <Row className="content-row alignCenter">
                                                    <Col span={1} className="serial-no">{index + 1}</Col>
                                                    <Col span={4} className="ps-1">
                                                        <div className="flex gap-3 align-items-center">
                                                            <img className="product-icon" src={config.COOKIES_IMAGE} alt="" />
                                                            <div className="flex flex-column">
                                                                <span className="title">{item.name}</span>
                                                                <span className="sub-title">{item.subTitle}</span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col span={3} className="item-header-label text-center">{item.barcode}</Col>
                                                    <Col span={3} className="item-header-label text-center fw-semibold">${item.unitPrice}</Col>
                                                    <Col span={2} className="item-header-label text-center">{item.unit}</Col>
                                                    <Col span={4} className="item-header-label">
                                                        <div className="quantity-container">
                                                            <button className="control">-</button>
                                                            <span className="value">{item.quantity}</span>
                                                            <button className="control">+</button>
                                                        </div>
                                                    </Col>
                                                    <Col span={2} className="item-header-label text-center">
                                                        {item.discount.type == "amount" && "$"}
                                                        {item.discount.value}
                                                        {item.discount.type == "percentage" && "%"}
                                                    </Col>
                                                    <Col span={4} className="item-header-label text-center">${item.total}</Col>
                                                    <Col span={1} className="item-header-label text-center">
                                                        <img src={config.DELETE_BLUE_ICON} alt="" />
                                                    </Col>
                                                </Row>
                                            ))
                                        }
                                    </>
                                    :
                                    <div className="empty-container">
                                        <img src={config.EMPTY_DATA_ICON} alt="" />
                                        <span className="title">No item added yet to bill!</span>
                                        <span className="description">Please scan a added product barcode or search item in above column to add. </span>
                                    </div>
                            }
                        </div>
                        <div className="options-container">
                            {
                                options.map(option => (
                                    <div className="options">
                                        <span>{option.name}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </Col>
                    <Col className="right" span={6}>
                        <POSRightContainer />
                    </Col>
                </Row>
            </div>
        </POSLayout>
    )
}

export default POSHome;