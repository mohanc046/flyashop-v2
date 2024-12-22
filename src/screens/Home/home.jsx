import React from "react";
import "react-table-v6/react-table.css";
import { Card, Col } from "reactstrap";
import OutletCard from "../../components/OutletCard/OutletCard";
import { useHome } from "./_hooks/useHome";
import AnalyticsCard from "./components/AnalyticsCard";
import CommonTable from "../../components/Table/CommonTable/CommonTable";
import { getUserProfile } from "../../utils/_hooks";
import _ from "lodash";

const Home = () => {
  const { columns, state, mapOrderDataToTable } = useHome();
  const userInfo = getUserProfile();

  return (
    <OutletCard>
      <Card
        className="d-flex flex-column gap-4 bg-light p-4"
        style={{
          maxHeight: "100vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}>
        <h3 className="fw-semibold m-0">{`Hi, ${_.get(userInfo, "firstName", "User")}`}</h3>
        <h4 className="text-muted">
          Your Store is Active Now. Customers can visit the following shop link and place their
          orders.
        </h4>
        <AnalyticsCard />
        <div className="d-flex flex-wrap justify-content-between align-items-start">
          <Col lg={12} md={12}>
            <CommonTable
              columns={columns}
              data={mapOrderDataToTable(state.orderList)}
              title="Orders"
              isLoading={state.loaderStatus}
            />
          </Col>
        </div>
      </Card>
    </OutletCard>
  );
};

export default Home;
