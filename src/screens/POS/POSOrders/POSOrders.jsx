import { Row, Col, Input, Button, Select } from "antd";
import "./pos-orders.css"
import { config } from "../../../config";
import POSRightContainer from "../POSRightContainer/POSRightContainer";
import { SearchOutlined } from "@ant-design/icons"
import POSLayout from "../POSLayout/POSLayout";

const POSOrders = (props) => {

    const items = [
        {
            name: "Person 1",
            subTitle: "35 minutes ago",
            orderId: "#11370261",
            amount: 318.00,
            location: "Rd. Santa Ana, Illinois 85486 ",
            status: "Delivered",
            channel: "POS"
        },
        {
            name: "Muhammed",
            subTitle: "35 minutes ago",
            orderId: "#11370261",
            amount: 318.00,
            location: "Rd. Santa Ana, Illinois 85486 ",
            status: "Delivered",
            channel: "Online Shop"
        },
        {
            name: "Person 1",
            subTitle: "35 minutes ago",
            orderId: "#11370261",
            amount: 318.00,
            location: "Rd. Santa Ana, Illinois 85486 ",
            status: "Delivered",
            channel: "POS"
        },
        {
            name: "Muhammed",
            subTitle: "35 minutes ago",
            orderId: "#11370261",
            amount: 318.00,
            location: "Rd. Santa Ana, Illinois 85486 ",
            status: "Delivered",
            channel: "Online Shop"
        },
        {
            name: "Person 1",
            subTitle: "35 minutes ago",
            orderId: "#11370261",
            amount: 318.00,
            location: "Rd. Santa Ana, Illinois 85486 ",
            status: "Delivered",
            channel: "POS"
        },
        {
            name: "Muhammed",
            subTitle: "35 minutes ago",
            orderId: "#11370261",
            amount: 318.00,
            location: "Rd. Santa Ana, Illinois 85486 ",
            status: "Delivered",
            channel: "Online Shop"
        },
        {
            name: "Person 1",
            subTitle: "35 minutes ago",
            orderId: "#11370261",
            amount: 318.00,
            location: "Rd. Santa Ana, Illinois 85486 ",
            status: "Delivered",
            channel: "POS"
        },
        {
            name: "Muhammed",
            subTitle: "35 minutes ago",
            orderId: "#11370261",
            amount: 318.00,
            location: "Rd. Santa Ana, Illinois 85486 ",
            status: "Delivered",
            channel: "Online Shop"
        },
        {
            name: "Person 1",
            subTitle: "35 minutes ago",
            orderId: "#11370261",
            amount: 318.00,
            location: "Rd. Santa Ana, Illinois 85486 ",
            status: "Delivered",
            channel: "POS"
        },
        {
            name: "Muhammed",
            subTitle: "35 minutes ago",
            orderId: "#11370261",
            amount: 318.00,
            location: "Rd. Santa Ana, Illinois 85486 ",
            status: "Delivered",
            channel: "Online Shop"
        },
    ]

    return (
        <POSLayout screen="Orders">
            <div className="pos-orders-container">
                <Row style={{ height: "100%" }}>
                    <Col className="left" span={18}>
                        <div className="flex justify-content-between orders-header">
                            <div className="flex gap-3">
                                <Button className="btn btn-primary">All</Button>
                                <Button className="btn btn-secondary">POS</Button>
                                <Button className="btn btn-secondary">Online Shop</Button>
                            </div>
                            <div className="flex gap-3">
                                <Button className="btn report btn-secondary">Report<img src={config.DOWN_ARROW_ICON} /></Button>
                                <Button className="btn btn-secondary">Create Order</Button>
                            </div>
                        </div>
                        <div className="orders-container">
                            {
                                true ?
                                    <>
                                        <div className="controls flex justify-content-between">
                                            <div className="flex">
                                                <Input prefix={<SearchOutlined />} className="search" placeholder="Order Id name or name"></Input>
                                            </div>
                                            <div className="flex gap-3">
                                                <Button className="btn btn-secondary">Sort<img src={config.SORT_ICON} /></Button>
                                                <Button className="btn btn-secondary">Online Shop<img src={config.FILTER_ICON} /></Button>
                                                <Select
                                                    className="duration-dropdown"
                                                    placeholder="Select"
                                                    defaultValue={"This Week"}
                                                    options={[{ label: "This Week", value: "This Week" }]}
                                                ></Select>
                                            </div>
                                        </div>
                                        <Row className="header-row mt-3 mb-3">
                                            <Col span={6} className="item-header-label">Customer Name</Col>
                                            <Col span={3} className="item-header-label text-center">Order ID</Col>
                                            <Col span={3} className="item-header-label text-center">Amount</Col>
                                            <Col span={6} className="item-header-label">Location</Col>
                                            <Col span={3} className="item-header-label text-center">Status</Col>
                                            <Col span={3} className="item-header-label text-center">Channel</Col>
                                        </Row>
                                        <div className="orders">
                                            {
                                                items.map((item) => (
                                                    <Row className="content-row alignCenter">
                                                        <Col span={6} className="ps-1">
                                                            <div className="flex gap-3 align-items-center">
                                                                <img className="customer-icon" src={config.COOKIES_IMAGE} alt="" />
                                                                <div className="flex flex-column">
                                                                    <span className="title">{item.name}</span>
                                                                    <span className="sub-title">{item.subTitle}</span>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col span={3} className="item-header-label text-center">{item.orderId}</Col>
                                                        <Col span={3} className="item-header-label text-center fw-semibold">${item.amount}</Col>
                                                        <Col span={6} className="item-header-label">{item.location}</Col>
                                                        <Col span={3} className="item-header-label text-center">
                                                            {item.status}
                                                        </Col>
                                                        <Col span={3} className="item-header-label text-center">{item.channel}</Col>
                                                    </Row>
                                                ))
                                            }
                                        </div>
                                    </>
                                    :
                                    <div className="empty-container">
                                        <img src={config.EMPTY_DATA_ICON} alt="" />
                                        <span className="title">No item added yet to bill!</span>
                                        <span className="description">Please scan a added product barcode or search item in above column to add. </span>
                                    </div>
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

export default POSOrders;
