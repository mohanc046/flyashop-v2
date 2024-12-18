import React from "react";
import { Col, Row } from "reactstrap";
import * as Icon from "react-feather";
import DashCard from "../../../components/DashCard/DashCard";
import "../Home.scss";

const AnalyticsCard = () => {
  const cardData = [
    {
      count: "1,093",
      title: "Total Visitors",
      icon: <Icon.Users size={30} />,
      percentage: "10.2 +1.01%",
      color: "#00c292"
    },
    {
      count: "256",
      title: "Sales Received",
      icon: <Icon.CheckCircle size={30} />,
      percentage: "0 +1.01%",
      color: "#00c292"
    },
    {
      count: "170",
      title: "My Products",
      icon: <Icon.Box size={30} />,
      percentage: "2.5 +1.01%",
      color: "#00c292"
    },
    {
      count: "5",
      title: "Total Sale",
      icon: <Icon.DollarSign size={30} />,
      percentage: "4.6 +1.01%",
      color: "#00c292"
    }
  ];

  return (
    <Row>
      {cardData.map((card, index) => (
        <Col lg="3" md="6" key={index}>
          <DashCard>
            <div className="card-top">
              <div>
                <h1 className="count-text">{card.count}</h1>
                <h5 className="card-title-text">{card.title}</h5>
              </div>
              <div className="card-icon">{card.icon}</div>
            </div>
            <h4 className="percentage-text">
              <Icon.ArrowUpRight size={20} color={card.color} /> {card.percentage} this week
            </h4>
          </DashCard>
        </Col>
      ))}
    </Row>
  );
};

export default AnalyticsCard;
