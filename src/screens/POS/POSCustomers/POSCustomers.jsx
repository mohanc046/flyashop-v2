import { Row, Col, Input, Button, Select } from "antd";
import "./pos-customers.css"
import { config } from "../../../config";
import POSRightContainer from "../POSRightContainer/POSRightContainer";
import { SearchOutlined } from "@ant-design/icons"
import POSLayout from "../POSLayout/POSLayout";

const POSCustomers = (props) => {

    const items = [
        {
            name: "Person 1",
            subTitle: "35 minutes ago",
            customerId: "#11370261",
            mobile: "+91 9895989525",
            city: "Chennai",
            totalOrders: 1,
            totalSales: 318.00
        },
        {
            name: "Person 2",
            subTitle: "35 minutes ago",
            customerId: "#11370261",
            mobile: "+91 9895989525",
            city: "Chennai",
            totalOrders: 18,
            totalSales: 1318.00
        },
        {
            name: "Person 1",
            subTitle: "35 minutes ago",
            customerId: "#11370261",
            mobile: "+91 9895989525",
            city: "Chennai",
            totalOrders: 1,
            totalSales: 318.00
        },
        {
            name: "Person 2",
            subTitle: "35 minutes ago",
            customerId: "#11370261",
            mobile: "+91 9895989525",
            city: "Chennai",
            totalOrders: 18,
            totalSales: 1318.00
        },
        {
            name: "Person 1",
            subTitle: "35 minutes ago",
            customerId: "#11370261",
            mobile: "+91 9895989525",
            city: "Chennai",
            totalOrders: 1,
            totalSales: 318.00
        },
        {
            name: "Person 2",
            subTitle: "35 minutes ago",
            customerId: "#11370261",
            mobile: "+91 9895989525",
            city: "Chennai",
            totalOrders: 18,
            totalSales: 1318.00
        },
        {
            name: "Person 1",
            subTitle: "35 minutes ago",
            customerId: "#11370261",
            mobile: "+91 9895989525",
            city: "Chennai",
            totalOrders: 1,
            totalSales: 318.00
        },
        {
            name: "Person 2",
            subTitle: "35 minutes ago",
            customerId: "#11370261",
            mobile: "+91 9895989525",
            city: "Chennai",
            totalOrders: 18,
            totalSales: 1318.00
        },
        {
            name: "Person 1",
            subTitle: "35 minutes ago",
            customerId: "#11370261",
            mobile: "+91 9895989525",
            city: "Chennai",
            totalOrders: 1,
            totalSales: 318.00
        },
        {
            name: "Person 2",
            subTitle: "35 minutes ago",
            customerId: "#11370261",
            mobile: "+91 9895989525",
            city: "Chennai",
            totalOrders: 18,
            totalSales: 1318.00
        },

    ]

    return (
        <POSLayout screen="Customers">
            <div className="pos-customers-container">
                <Row style={{ height: "100%" }}>
                    <Col className="left" span={18}>
                        <div className="flex justify-content-between customers-header">
                            <div className="flex gap-3">
                                <Button className="btn btn-primary">All</Button>
                                <Button className="btn btn-secondary">Pending</Button>
                                <Button className="btn btn-secondary">Imported</Button>
                            </div>
                            <div className="flex gap-3">
                                <Button className="btn report btn-secondary">Download<img src={config.DOWN_ARROW_ICON} /></Button>
                                <Button className="btn btn-secondary">Import</Button>
                            </div>
                        </div>
                        <div className="customers-container">
                            {
                                true ?
                                    <>
                                        <div className="controls flex justify-content-between">
                                            <div className="flex">
                                                <Input prefix={<SearchOutlined />} className="search" placeholder="Name or City"></Input>
                                            </div>
                                            <div className="flex gap-3">
                                                <Button className="btn btn-secondary">Sort<img src={config.SORT_ICON} /></Button>
                                                <Select
                                                    className="duration-dropdown"
                                                    placeholder="Select"
                                                    defaultValue={"This Week"}
                                                    options={[{ label: "This Week", value: "This Week" }]}
                                                ></Select>
                                            </div>
                                        </div>
                                        <Row className="header-row mt-3 mb-3">
                                            <Col span={5} className="item-header-label">Customer Name</Col>
                                            <Col span={3} className="item-header-label text-center">Customer ID</Col>
                                            <Col span={4} className="item-header-label text-center">Mobile</Col>
                                            <Col span={4} className="item-header-label text-center">City</Col>
                                            <Col span={4} className="item-header-label text-center">Total Orders</Col>
                                            <Col span={4} className="item-header-label text-center">Total Sales</Col>
                                        </Row>
                                        <div className="customers">
                                            {
                                                items.map((item) => (
                                                    <Row className="content-row alignCenter">
                                                        <Col span={5} className="ps-1">
                                                            <div className="flex gap-3 align-items-center">
                                                                <img className="customer-icon" src={config.COOKIES_IMAGE} alt="" />
                                                                <div className="flex flex-column">
                                                                    <span className="title">{item.name}</span>
                                                                    <span className="sub-title">{item.subTitle}</span>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col span={3} className="item-header-label text-center">{item.customerId}</Col>
                                                        <Col span={4} className="item-header-label text-center">${item.mobile}</Col>
                                                        <Col span={4} className="item-header-label text-center">{item.city}</Col>
                                                        <Col span={4} className="item-header-label text-center">{item.totalOrders}</Col>
                                                        <Col span={4} className="item-header-label text-center">{item.totalSales}</Col>
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

export default POSCustomers;
