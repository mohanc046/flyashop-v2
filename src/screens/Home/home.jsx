import React from "react";
import "react-table-v6/react-table.css";
import { Card } from "reactstrap";
import OutletCard from "../../components/OutletCard/OutletCard";
import Button from "../../components/Button/Button";
import { useHome } from "./_hooks/useHome";
import { Eye } from "react-feather";
import AnalyticsCard from "./components/AnalyticsCard";
import PendingOrders from "./components/PendingOrders";
import QuickLinks from "./components/QuickLinks";

const Home = () => {
  const {} = useHome();

  return (
    <OutletCard>
      <Card
        className="d-flex flex-column gap-4 p-3 bg-white"
        style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <h3 className="fw-semibold">Hi, Althaf Hussain!</h3>
        <h4 className="text-muted">
          Your Store is Active Now. Customers can visit the following shop link and place their
          orders.
        </h4>
        <Card className="rounded-3 p-3 bg-white">
          <div className="row align-items-center">
            <div className="col-12 col-md-10 mb-3 mb-md-0">
              <h2 className="fs-5 text-break mb-0">
                Shop Link:{" "}
                <a href="http://localhost:3000/store/ecommerce" className="text-decoration-none">
                  http://localhost:3000/store/ecommerce
                </a>
              </h2>
            </div>
            <div className="col-12 col-md-2 text-md-end">
              <Button label="Visit" icon={<Eye size={20} />} />
            </div>
          </div>
        </Card>

        <AnalyticsCard />
        <div className="d-flex flex-wrap justify-content-between">
          <PendingOrders />
        </div>
      </Card>
    </OutletCard>
  );
};

export default Home;
