import { Row, Col, Input, Button, Select, Switch } from "antd";
import "./pos-discounts.css"
import { config } from "../../../config";
import POSRightContainer from "../POSRightContainer/POSRightContainer";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons"
import POSLayout from "../POSLayout/POSLayout";

const POSDiscounts = (props) => {

    const items = [
        {
            name: "Festival-1 Offer",
            subTitle: "$ 120 Associated",
            channel: "POS",
            discount: 20,
            startDate: "15-06-2023",
            endDate: "22-06-2023",
            status: "active"
        },
        {
            name: "Weekend Sale",
            subTitle: "$ 90 Associated",
            channel: "Online Shop",
            discount: 10,
            startDate: "18-06-2023",
            endDate: "27-06-2023",
            status: "stopped"
        },
        {
            name: "Festival-1 Offer",
            subTitle: "$ 120 Associated",
            channel: "POS",
            discount: 20,
            startDate: "15-06-2023",
            endDate: "22-06-2023",
            status: "active"
        },
        {
            name: "Weekend Sale",
            subTitle: "$ 90 Associated",
            channel: "Online Shop",
            discount: 10,
            startDate: "18-06-2023",
            endDate: "27-06-2023",
            status: "stopped"
        },
        {
            name: "Festival-1 Offer",
            subTitle: "$ 120 Associated",
            channel: "POS",
            discount: 20,
            startDate: "15-06-2023",
            endDate: "22-06-2023",
            status: "active"
        },
        {
            name: "Weekend Sale",
            subTitle: "$ 90 Associated",
            channel: "Online Shop",
            discount: 10,
            startDate: "18-06-2023",
            endDate: "27-06-2023",
            status: "stopped"
        },
        {
            name: "Festival-1 Offer",
            subTitle: "$ 120 Associated",
            channel: "POS",
            discount: 20,
            startDate: "15-06-2023",
            endDate: "22-06-2023",
            status: "active"
        },
        {
            name: "Weekend Sale",
            subTitle: "$ 90 Associated",
            channel: "Online Shop",
            discount: 10,
            startDate: "18-06-2023",
            endDate: "27-06-2023",
            status: "stopped"
        },
        {
            name: "Festival-1 Offer",
            subTitle: "$ 120 Associated",
            channel: "POS",
            discount: 20,
            startDate: "15-06-2023",
            endDate: "22-06-2023",
            status: "active"
        },
        {
            name: "Weekend Sale",
            subTitle: "$ 90 Associated",
            channel: "Online Shop",
            discount: 10,
            startDate: "18-06-2023",
            endDate: "27-06-2023",
            status: "stopped"
        },
    ]

    return (
        <POSLayout screen="Discounts">
            <div className="pos-discounts-container">
                <Row style={{ height: "100%" }}>
                    <Col className="left" span={18}>
                        <div className="flex justify-content-between discounts-header">
                            <div className="flex gap-3">
                                <Button className="btn btn-primary">All</Button>
                                <Button className="btn btn-secondary">POS</Button>
                                <Button className="btn btn-secondary">Online Shop</Button>
                                <Button className="btn btn-secondary">POS & Online Shop</Button>
                            </div>
                            <div className="flex gap-3">
                                <Button className="btn report btn-secondary">Download<img src={config.DOWN_ARROW_ICON} /></Button>
                                <Button className="btn btn-primary">Add Discount</Button>
                            </div>
                        </div>
                        <div className="discounts-container">
                            {
                                true ?
                                    <>
                                        <div className="controls flex justify-content-between">
                                            <div className="flex">
                                                <Input prefix={<SearchOutlined />} className="search" placeholder="Offer Name or Product"></Input>
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
                                            <Col span={8} className="item-header-label">Offer Name</Col>
                                            <Col span={3} className="item-header-label text-center">Channel</Col>
                                            <Col span={3} className="item-header-label text-center">Discount</Col>
                                            <Col span={3} className="item-header-label text-center">Start Date</Col>
                                            <Col span={3} className="item-header-label text-center">End Date</Col>
                                            <Col span={3} className="item-header-label text-center">Status</Col>
                                            <Col span={1} className="item-header-label text-center"></Col>
                                        </Row>
                                        <div className="discounts">
                                            {
                                                items.map((item) => (
                                                    <Row className="content-row alignCenter">
                                                        <Col span={8} className="ps-1">
                                                            <div className="flex gap-3 align-items-center">
                                                                <div className="flex flex-column">
                                                                    <span className="title">{item.name}</span>
                                                                    <span className="sub-title">{item.subTitle}</span>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col span={3} className="item-header-label text-center">{item.channel}</Col>
                                                        <Col span={3} className="item-header-label text-center fw-semibold">${item.discount}</Col>
                                                        <Col span={3} className="item-header-label text-center">{item.startDate}</Col>
                                                        <Col span={3} className="item-header-label text-center">{item.endDate}</Col>
                                                        <Col span={3} className="item-header-label"><Switch className="discount-toggler" defaultChecked={item.status == "active"} />{item.status}</Col>
                                                        <Col span={1} className="item-header-label text-center"><MoreOutlined style={{ fontSize: 20, cursor: 'pointer' }} /></Col>
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

export default POSDiscounts;
