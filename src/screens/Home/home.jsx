import React from "react";
import "react-table-v6/react-table.css";
import { Card, Col } from "reactstrap";
import OutletCard from "../../components/OutletCard/OutletCard";
import Button from "../../components/Button/Button";
import { useHome } from "./_hooks/useHome";
import { Eye } from "react-feather";
import AnalyticsCard from "./components/AnalyticsCard";
import VisitCard from "./components/VisitCard";

const Home = () => {
  const {} = useHome();

  return (
    <OutletCard>
      <Card
        className="d-flex flex-column gap-4 bg-white p-0"
        style={{
          maxHeight: "100vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}>
        <h3 className="fw-semibold m-0">Hi, Althaf Hussain!</h3>
        <h4 className="text-muted">
          Your Store is Active Now. Customers can visit the following shop link and place their
          orders.
        </h4>
        <AnalyticsCard />

        <div className="d-flex flex-wrap justify-content-between align-items-start">
          <Col lg={12} md={12}>
            <VisitCard />
          </Col>
        </div>
      </Card>
    </OutletCard>
  );
};

export default Home;
