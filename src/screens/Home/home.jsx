import React from "react";
import "react-table-v6/react-table.css";
import { Card } from "reactstrap";
import OutletCard from "../../components/OutletCard/OutletCard";
import "./Home.scss";
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
      {/* <Card className="d-flex flex-column justify-content-between flex-row flex-wrap gap-3 bg-white">
        <div className="d-flex flex-column gap-3 bg-white mt-3">
          <div className="heading-container">
            <h3 className="welcomeUser">Hi, Althaf Hussain!</h3>
          </div>
          <h4 className="description">
            Your Store is Active Now. Customers can visit the following shop link and place their
            orders.
          </h4>
          <Card className="store-lnk-container">
            <Card className="lnk-container">
              <h2 className="lnk-text">Shop Link : http://localhost:3000/store/ecommerce</h2>
              <Button label="Visit" icon={<Eye size={20} />} />
            </Card>
          </Card>
          <AnalyticsCard />
          <div className="bottom-view">
            <PendingOrders />
            <QuickLinks />
          </div>
        </div>
      </Card> */}
    </OutletCard>
  );
};

export default Home;
