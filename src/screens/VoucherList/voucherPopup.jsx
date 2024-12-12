import React, { useEffect, useState } from 'react';
import { config } from '../../config';
import { Col, Row, Button, Modal, Select, Tooltip, Input, DatePicker, notification } from 'antd';
import _ from 'lodash';
import moment from 'moment';

import './style.css';

const VoucherModal = (props) => {

  const [formInfo, setFormInfo] = useState({
    voucherCode: "",
    campaignName: "",
    campaignStartDate: "",
    campaignEndDate: "",
    offerType: "",
    offerValue: "",
    sellingChannel: [],
  });

  const [voucherId, setVoucherId] = useState("");

  const { isModalOpen = false, closeModal, createVoucherRecord, updateVoucherRecordDetails, loaderStatus = false, modalPropsData } = props || {};

  const isCreateFlow = _.isEmpty(modalPropsData);

  useEffect(() => {

    if(!_.isEmpty(modalPropsData)){

      const {
        campaignEndDate, campaignStartDate, offerName, offerType, offerValue,
        sellingChannel, voucherId, voucherCode
      } = modalPropsData;

      setVoucherId(voucherId);

      setFormInfo({
        voucherCode,
        campaignName: offerName,
        campaignStartDate,
        campaignEndDate,
        offerType,
        offerValue,
        sellingChannel
      })


    }else{
      setFormInfo({
        voucherCode: "",
        campaignName: "",
        campaignStartDate: "",
        campaignEndDate: "",
        offerType: "",
        offerValue: "",
        sellingChannel: [],
      })

      setVoucherId("")
    }

  },[props])
  return (
    <>
      <Modal
        title="Add discount"
        style={{
          top: 20,
        }}
        open={isModalOpen}

        onOk={() => closeModal()}
        onCancel={() => closeModal()}
        footer={[
          <Button
            className='voucherFooterButtonContainer'
            loading={loaderStatus}
            onClick={() => {

              const {
                voucherCode,
                campaignName,
                campaignStartDate,
                campaignEndDate,
                offerType,
                offerValue,
                sellingChannel
              } = formInfo;

              const isValid = _.every([
                voucherCode,
                campaignName,
                campaignStartDate,
                campaignEndDate,
                offerType,
                `${offerValue}`,
                sellingChannel
              ], value => {
                return !_.isEmpty(value)
              });

              if (isValid) {

                isCreateFlow ?
                  createVoucherRecord({
                    "voucherCode": formInfo.voucherCode,
                    "campaignName": formInfo.campaignName,
                    "campaignStartDate": moment(formInfo.campaignStartDate).format('YYYY-MM-DD'),
                    "campaignEndDate": moment(formInfo.campaignEndDate).format('YYYY-MM-DD'),
                    "offerType": formInfo.offerType,
                    "offerValue": formInfo.offerValue,
                    "sellingChannel": formInfo.sellingChannel
                  }, setFormInfo)
                  :
                  updateVoucherRecordDetails({
                    "voucherCode": formInfo.voucherCode,
                    "campaignName": formInfo.campaignName,
                    "campaignStartDate": moment(formInfo.campaignStartDate).format('YYYY-MM-DD'),
                    "campaignEndDate": moment(formInfo.campaignEndDate).format('YYYY-MM-DD'),
                    "offerType": formInfo.offerType,
                    "offerValue": formInfo.offerValue,
                    "sellingChannel": formInfo.sellingChannel,
                    voucherId
                  }, setFormInfo)

                return;
              }

              notification.open({ type: "warning", message: "Enter all mandatory fields for voucher creation!" })

            }
            }
          >
          {isCreateFlow ?   'Add discount' : 'Update Discount'}
          </Button>
        ]}
      >
        <>
          <label className='voucherLabelContainer'>Voucher Code</label>
          <Input
            className='voucherCodeTextContainer'
            placeholder="Enter voucher code"
            onChange={(event => {
              const voucherCode = event.target.value;
              setFormInfo({ ...formInfo, voucherCode })
            })}
            value={formInfo.voucherCode}
            suffix={
              <Tooltip title="Voucher">
                <img src={config.VOUCHER_CODE} alt='Voucher Image' />
              </Tooltip>
            }
          />
        </>

        <Row className='voucherRowTwoContainer'>
          <Col span={12} >
            <>
              <label className='voucherLabelContainer'>Offer Campaign Name</label>
              <Input
                className='voucherTypeContainer'
                placeholder="Campaign Name"
                value={formInfo.campaignName}
                onChange={(event => {
                  const campaignName = event.target.value;
                  setFormInfo({ ...formInfo, campaignName })
                })}
              />
            </>
          </Col>
          <Col span={12}>
            <>
              <label className='voucherLabelContainer'>Selling Channel</label>
              <Select
                key="sellingChannel"
                className='voucherDropdownContainer'
                placeholder="Selling Channel"
                optionFilterProp="children"
                value={formInfo.sellingChannel}
                onSelect={(value) => {
                  setFormInfo({ ...formInfo, sellingChannel: value })
                }}
                options={[
                  {
                    value: ['POS'],
                    label: 'POS',
                  },
                  {
                    value: ['OnlineShop'],
                    label: 'Online Shop',
                  },
                  {
                    value: ['POS', 'OnlineShop'],
                    label: 'POS & Online shop',
                  }
                ]}
              />
            </>
          </Col>

        </Row>


        <Row className='voucherRowTwoContainer'>
          <Col span={12}>
            <>
              <label className='voucherLabelContainer'>Set campaign start date</label>
              <DatePicker
                className='voucherDateContainer'
                value={formInfo.campaignStartDate ? moment(formInfo.campaignStartDate) : null}
                onChange={(date) => {
                  setFormInfo({ ...formInfo, campaignStartDate: date })
                }}
                placeholder='Start Date' />
            </>
          </Col>
          <Col span={12} >
            <>
              <label className='voucherLabelContainer'>Set campaign end date</label>
              <DatePicker
                disabled={_.isEmpty(formInfo.campaignStartDate)}
                className='voucherDateContainer'
                placeholder='End Date'
                value={formInfo.campaignEndDate ? moment(formInfo.campaignEndDate) : null}
                onChange={(date) => {
                  setFormInfo({ ...formInfo, campaignEndDate: date })
                }}
                disabledDate={(current) => current && current < moment(formInfo.campaignStartDate).startOf('day')}
              />
            </>
          </Col>
        </Row>


        <Row className='voucherRowTwoContainer'>

          <Col span={12}>
            <>
              <label className='voucherLabelContainer'>Offer Type</label>
              <Select
                key={'offerType'}
                className='voucherDropdownContainer'
                placeholder="Offer Type"
                optionFilterProp="children"
                value={formInfo.offerType}
                onSelect={(value) => {
                  setFormInfo({ ...formInfo, offerType: value })
                }}
                options={[
                  {
                    value: 'FLAT DISCOUNT',
                    label: 'Flat',
                  },
                  {
                    value: 'DISCOUNT PERCENT',
                    label: 'Discount',
                  }
                ]}
              />
            </>
          </Col>
          <Col span={12} >
            <>
              <label className='voucherLabelContainer'>Enter offer value</label>
              <Input
                type='number'
                className='voucherTypeContainer'
                placeholder="Enter voucher amount"
                value={formInfo.offerValue}
                onChange={(event => {
                  const offerValue = event.target.value;
                  setFormInfo({ ...formInfo, offerValue })
                })}
              />
            </>
          </Col>
        </Row>

      </Modal>
      <br />
      <br />
    </>
  );
};
export default VoucherModal;