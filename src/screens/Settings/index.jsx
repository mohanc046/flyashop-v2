import React, { useState } from "react";

import { AppHeader, AppSidebar } from "../../components/index";

import { useNavigate } from "react-router-dom";

import { getServiceURL, isMobileView } from "../../utils";

import CustomHeader from "../../components/CustomHeader";

import "./index.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { config } from "../../config";

import { Button, Col, Form, Input, Row, notification } from "antd";

import DomainCardView from "./domain";

import _ from "lodash";

import { useStoreState, useStoreActions } from "../../store/hooks";
import axios from "axios";
import CustomModal from "../../components/Modal/modal";
import DomainCardMobileView from "./DomainCardMobileView";

const renderIndividualSettingCardView = (payload) => {
  const { icon, title, description, navigate } = payload;

  return (
    <div className="settingTileCardViewContainer" onClick={() => navigate()}>
      <div className="settingLeftCardContainer">
        <img src={icon} />
      </div>
      <div className="settingCenterCardContainer">
        <div className="settingTitleLabel">{title}</div>
        <div className="settingDescriptionLabel">{description}</div>
      </div>
      <div className="settingRightCardContainer">
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </div>
  );
};

export default function Setting() {
  const navigate = useNavigate();

  const userInfo = useStoreState((state) => state.user);

  const updateUserDetails = useStoreActions(
    (action) => action.user.updateStore
  );

  const userDetails = userInfo.data;

  const { firstName, lastName, existingStoreInfo = [] } = userDetails;

  const existingStoreDetails = _.get(existingStoreInfo, "[0]") || {};

  const storeInfo = _.get(existingStoreInfo, "[0].store") || {};

  const {
    bankAccountDetails = {},
    businessName = "",
    fullAddress = "",
  } = storeInfo || {};

  const [form] = Form.useForm();

  const [currentContainer, setCurrentContainer] = useState("Store Details");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        fullAddress: values.address,
        bankAccountDetails: {
          bankAccountNumber: values.bankAccNo,
          ifscCode: values.bankIfsc,
        },
      };
      await axios.put(`${getServiceURL()}/store/${storeInfo._id}`, payload);

      updateUserDetails({
        ...userDetails,
        existingStoreInfo: [
          {
            ...existingStoreDetails,
            store: {
              ...storeInfo,
              ...payload,
            },
          },
        ],
      });

      notification.open({
        type: "success",
        message: "Store Updated Successfully!",
      });
    } catch (error) {
      notification.open({ type: "success", message: "Store Update Failed!" });
    }
    setLoading(false);
  };

  const renderShopDetails = () => {
    return (
      <Col span={17} offset={1}>
        <CustomModal
          isOpen={openDeleteModal}
          onSubmit={() => setOpenDeleteModal(false)}
          onCancel={() => setOpenDeleteModal(false)}
          title={"Delete Store"}
          children={
            <span className="delete-store-warning">
              Are you sure to delete the store
            </span>
          }
          width={400}
          submitLabel={"Delete"}
          className="delete-store-modal"
        />
        <div className="details">
          <h4 className="title">Store Details</h4>
          <p className="description">
            Update and customise your store's information
          </p>
          <Form
            initialValues={{
              storeLink: `store/${businessName}`,
              storeName: `${businessName}`.toLocaleUpperCase(),
              mobileNumber: _.get(userDetails, "mobileNumber", ""),
              email: _.get(userDetails, "email", ""),
              country: "India",
              address: fullAddress,
              bankAccNo: _.get(bankAccountDetails, "bankAccountNumber", ""),
              bankIfsc: _.get(bankAccountDetails, "ifscCode", ""),
            }}
            onFinish={handleSubmit}
            form={form}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name={"storeLink"}
                  label="Store Link"
                  required={true}
                >
                  <Input
                    disabled={true}
                    placeholder="Please enter store link"
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={"storeName"}
                  label="Store Name"
                  required={true}
                >
                  <Input
                    disabled={true}
                    placeholder="Please enter store name"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name={"mobileNumber"}
                  label="Mobile Number"
                  required={true}
                >
                  <Input
                    disabled={true}
                    placeholder="Please enter mobile number"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name={"email"} label="Email Address" required={true}>
                  <Input
                    disabled={true}
                    placeholder="Please enter email address"
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={"country"} label="Country" required={true}>
                  <Input placeholder="Please enter country"></Input>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item name={"address"} label="Address" required={true}>
                  <Input placeholder="Please enter address"></Input>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name={"bankAccNo"}
                  label="Bank Acc No"
                  required={true}
                >
                  <Input placeholder="Please enter bank account no"></Input>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={"bankIfsc"} label="Bank IFSC" required={true}>
                  <Input placeholder="Please enter bank IFSC"></Input>
                </Form.Item>
              </Col>
            </Row>
            <div className="delete-store">
              <span onClick={() => setOpenDeleteModal(true)}>
                {" "}
                Delete My Store
              </span>
            </div>
          </Form>
        </div>
        <div className="save-btn">
          <Button
            type="submit"
            loading={loading}
            onClick={() => form.submit()}
            className="btn btn-primary primary-color"
          >
            Save
          </Button>
        </div>
        <div className="developer-tools">
          <h4 className="title">Developer tools</h4>
          <p className="description">
            {" "}
            Use the FLAYA APIs to integrate FLAYA services in your apps.{" "}
            <span className="view-btn">View API docs</span>{" "}
          </p>
        </div>
      </Col>
    );
  };

  const renderContainer = () => {
    return (
      <Col span={17} offset={1}>
        {isMobileView() ? (
          <DomainCardMobileView businessName={businessName} />
        ) : (
          <DomainCardView businessName={businessName} />
        )}
      </Col>
    );
  };

  const renderWebUI = () => {
    return (
      <div>
        <AppSidebar />
        <AppHeader
          heading={"Store Settings"}
          showBrand={false}
          showAvatar={true}
        />
        <div className="settings-container">
          <Row>{renderContainer()}</Row>
        </div>
      </div>
    );
  };

  const renderMobileUI = () => {
    return (
      <div>
        <AppSidebar />
        <div className="bg-light">
          <AppHeader
            heading={"Settings"}
            showAddProduct={false}
            showAvatar={!isMobileView()}
            showBrand={!isMobileView()}
          />
          <Row>{renderContainer()}</Row>
        </div>
      </div>
    );
  };

  return <>{window.innerWidth <= 768 ? renderMobileUI() : renderWebUI()}</>;
}
