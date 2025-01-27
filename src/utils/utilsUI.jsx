import React, { Fragment } from "react";

import { DownOutlined } from "@ant-design/icons";

import { Dropdown, Space } from "antd";

import _ from "lodash";

import { CButton, CCol, CRow } from "@coreui/react";

export const renderInputBox = (payload) => {
  const {
    name,
    placeholder,
    onChange,
    value,
    errorStatus,
    type,
    required = false,
    className,
  } = payload;
  return (
    <Fragment>
      <div className={className ? `${className} inputAlign` : "inputAlign"}>
        <input
          type={type || "string"}
          className={errorStatus ? "inputBoxError" : "inputBox"}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
        ></input>
        {required ? <span class="redColor">*</span> : null}
      </div>
    </Fragment>
  );
};

export const renderAddProductInputBox = (payload) => {
  const {
    name,
    placeholder,
    onChange,
    value,
    errorStatus,
    type,
    required = false,
    className,
  } = payload;
  return (
    <Fragment>
      <div className={className ? `${className} inputAlign` : "inputAlign"}>
        <input
          type={type || "string"}
          style={{ borderRadius: "20px" }}
          className={errorStatus ? "inputBoxError" : "inputBox"}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
        />
        {/* {required ? <span class="redColor">*</span>: null} */}
      </div>
    </Fragment>
  );
};

export const emptySpace = () => {
  return (
    <Fragment>
      <br></br>
      <br></br>
    </Fragment>
  );
};

export const MobileTabUI = (tabName) => {
  return (
    <Fragment>
      <div className="storeNameLabel">
        <span className="BOLD">Flyashop</span> video store
      </div>
      <br></br>
      <div className="tabLayoutMobileView">
        {["Setup", "Add Products", "Publish"].map((name) => (
          <div className={tabName === name ? "active" : "inactive"}>{name}</div>
        ))}
      </div>
    </Fragment>
  );
};

export const RenderEditProductViewMobileTabUI = (tabName) => {
  return (
    <Fragment>
      <div className="storeNameLabel">
        <span className="BOLD">Flyashop</span> video store
      </div>
      <br></br>
      <div className="tabLayoutMobileView">
        {["Edit Product"].map((name) => (
          <div className={tabName === name ? "active" : "inactive"}>{name}</div>
        ))}
      </div>
    </Fragment>
  );
};

export const renderTitle = (title, className, required = false) => {
  return (
    <p className={`text-medium-emphasis boldColor ${className}`}>
      {title} {required ? <span className="redColor">*</span> : null}
    </p>
  );
};

export const renderDropdown = (payload) => {
  const {
    name,
    value,
    onChange,
    list,
    placeholder,
    required = false,
    className = "",
    hideStar = false,
  } = payload;
  return (
    <div className={className ? `${className} inputAlign` : "inputAlign"}>
      <select
        className="inputBox"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        defaultValue={""}
        defaultChecked={false}
      >
        <option value="" disabled selected>
          {placeholder}
        </option>
        {list.map((each, index) => (
          <option key={index}>{each}</option>
        ))}
      </select>
      {required && !hideStar ? <span class="redColor">*</span> : null}
    </div>
  );
};

// export const renderCustomDropdown = (payload) => {
//   const { name, value, onChange, list, placeholder } = payload;
//   return <Dropdown
//     menu={{
//       items: list,
//       selectedKeys: [value],
//       onClick: function (value) {
//         onChange({ target: { value: value, name } })
//       }
//     }}
//     className='customDropDownContainer'
//     >
//     <a onClick={(e) => e.preventDefault()}>
//       <div className='customDropDownInnerContainer'>
//         <label className='dropDownLabel'>{placeholder}</label>
//         <DownOutlined />
//       </div>
//     </a>
//   </Dropdown>
// }

export const renderDropdownTwo = (payload) => {
  const { name, value, onChange, list, placeholder, className = "" } = payload;
  return (
    <select
      className={`${className} inputBox`}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      defaultValue={""}
    >
      <option value="" disabled selected>
        {placeholder}
      </option>
      {list.map((each, index) => (
        <option value={each.value} key={index}>
          {each.name}
        </option>
      ))}
    </select>
  );
};

export const renderButton = (payload) => {
  const { name, onClick, loaderStatus, className } = payload;
  return (
    <CRow>
      <CCol xs={12}>
        <CButton
          disabled={loaderStatus}
          className={
            className ? className : "px-12 primary-color button FORT12"
          }
          onClick={onClick}
        >
          {loaderStatus ? (
            <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <>{name}</>
          )}
        </CButton>
      </CCol>
    </CRow>
  );
};

export const renderFilterBox = (name, isActive = false, onClick) => {
  return (
    <div>
      <div
        name="searchTerm"
        key={name}
        onClick={() => onClick(name)}
        className={`${
          isActive
            ? "activeBox searchTableInputBoxSort margin-bot-8"
            : "searchTableInputBoxSort margin-bot-8"
        }`}
        placeholder={`Sort`}
      >
        {name}
      </div>
    </div>
  );
};

export const renderOrderTabUI = ({
  activeTab = "ALL",
  updateDashboardActiveTab,
}) => {
  return (
    <Fragment>
      <div className="tabLayoutMobileView">
        {[
          { name: "All", value: "ALL" },
          { name: "Shipped", value: "SHIPPED" },
          { name: "Pending", value: "PENDING" },
        ].map((each) => (
          <div
            className={activeTab === each.name ? "active" : "inactive"}
            onClick={() =>
              updateDashboardActiveTab({
                activeTab: each.name,
                activeTabValue: each.value,
              })
            }
          >
            {each.name}
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export const renderCalendarIconView = (payload) => {
  const { day, date, isActive = false } = payload;
  return (
    !_.isNil(date) &&
    !_.isEmpty(`${date}`) && (
      <div>
        <div
          name="searchTerm"
          className={`${
            isActive
              ? "activeBox calendarInputBox margin-bot-8"
              : "calendarInputBox margin-bot-8"
          }`}
          placeholder={`Sort`}
        >
          <div>
            <div
              className={
                isActive ? "calendarDateLabel" : "calendarDateLabelInActive"
              }
            >
              {date}
            </div>
            <div
              className={
                isActive ? "calendarDayLabel" : "calendarDayLabelInActive"
              }
            >
              {day}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export const renderHomeTabUI = ({
  activeTab = "ALL",
  updateDashboardActiveTab,
}) => {
  return (
    <Fragment>
      <div className="tabLayoutMobileView">
        {[
          { name: "All", value: "ALL" },
          { name: "Shipped", value: "SHIPPED" },
          { name: "Pending", value: "PENDING" },
        ].map((each) => (
          <div
            className={activeTab === each.name ? "active" : "inactive"}
            onClick={() =>
              updateDashboardActiveTab({
                activeTab: each.name,
                activeTabValue: each.value,
              })
            }
          >
            {each.name}
          </div>
        ))}
      </div>
    </Fragment>
  );
};
