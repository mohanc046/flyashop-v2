import React from "react";
import { Space, Table, Tag } from "antd";
const columns = [
  {
    title: "Domain Name",
    dataIndex: "domainName",
    key: "domainName",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Date Added",
    dataIndex: "addedAt",
    key: "addedAt",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => (
      <>
        {status.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Provider",
    dataIndex: "provider",
    key: "provider",
  },
];
const getData = ({ businessName }) => [
  {
    key: "1",
    domainName: `https://flyashop.com/store/${businessName}`,
    addedAt: "Feb 27, 2024",
    status: ["LIVE"],
    provider: "Godaddy",
  },
];

const DomainCardMobileView = (props) => {
  const { businessName = "businessName" } = props || {};
  return (
    <div>
      <div className="domainPartnerContainer">
        <h1 className="domainHeaderContainer">Domains</h1>
        <p className="domainDescriptionContainer">
          Set up and personalize your store's web address.
        </p>
      </div>

      <div className="domainNamePartnerContainer">
        <div>
          <h1 className="domainHeaderContainer">Domain Name</h1>
          <p className="domainDescriptionContainer">
            {`https://flyashop.com/store/${businessName}`}
          </p>
        </div>

        <div className="live">Live</div>
      </div>

      <div className="domainPartnerContainer">
        <h1 className="domainHeaderContainer">Provider</h1>
        <p className="domainDescriptionContainer">Godaddy</p>
        <p className="domainDescriptionContainer">Feb 27, 2024</p>
      </div>

      <div className="connectExternalDomainContainer">
        <div className="connectInnerContainer">
          <div>
            <h6 className="connectExternalDomainHeaderContainer">
              Connect external domain
            </h6>
            <span className="domainDescriptionContainer">
              You can connect your existing domain to Flyashop in just a few
              minutes
            </span>
          </div>
        </div>

        {/* Video player section */}
        <div className="videoPlayerContainer">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/88A60ki-9d0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DomainCardMobileView;
