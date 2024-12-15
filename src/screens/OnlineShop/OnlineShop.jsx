import React from "react";
import "react-table-v6/react-table.css";
import { Card } from "reactstrap";
import OutletCard from "../../components/OutletCard/OutletCard";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import { useOnlineShop } from "./_hooks/useOnlineShop";
import "./OnlineShop.scss";
import Switch from "../../components/Switch/Switch";
import Button from "../../components/Button/Button";

const OnlineShop = () => {
  const { categories, handleCategorySelect } = useOnlineShop();

  return (
    <OutletCard>
      <Card className="d-flex flex-column justify-content-between flex-row flex-wrap gap-3 bg-white">
        <CategoryFilter categories={categories} onSelect={handleCategorySelect} />

        <div className="d-flex flex-column gap-3 bg-white mt-3">
          <div className="heading-container">
            <h3>Promotional Banners</h3>
            <Switch
              initialStatus={"hidden"}
              activeText="Active"
              hiddenText="Hidden"
              onToggle={(newStatus) => console.log("New Status: ", newStatus)} // Handle status toggle
            />
          </div>
          <h4 className="description">
            Make more attention of your customers by promotional banners displayed on top of your
            home page
          </h4>
          <h3 className="banners-count-title">Banners (0/6)</h3>
          <Button label="Save" onClick={() => console.log("Button Clicked!")} />
        </div>
      </Card>
    </OutletCard>
  );
};

export default OnlineShop;
