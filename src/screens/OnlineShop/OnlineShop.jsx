import React from "react";
import "react-table-v6/react-table.css";
import { Card } from "reactstrap";
import OutletCard from "../../components/OutletCard/OutletCard";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import { useOnlineShop } from "./_hooks/useOnlineShop";
import "./OnlineShop.scss";
import Switch from "../../components/Switch/Switch";
import Button from "../../components/Button/Button";
import { onlineShopCategories } from "./OnlineShop.constants";
import { PlusCircleOutlined } from "@ant-design/icons";

const OnlineShop = () => {
  const { handleCategorySelect, banners, fileUpload, saveBanner } = useOnlineShop();

  return (
    <OutletCard>
      <Card className="d-flex flex-column justify-content-between flex-row flex-wrap gap-3 bg-light">
        <CategoryFilter
          categories={onlineShopCategories}
          onSelect={handleCategorySelect}
          currentCategory="Banners"
        />

        <div className="d-flex flex-column gap-3 bg-light mt-3">
          <div className="heading-container">
            <h3>Promotional Banners</h3>
            <Switch
              initialStatus="hidden"
              activeText="Active"
              hiddenText="Hidden"
              onToggle={(newStatus) => console.log("New Status: ", newStatus)} // Handle status toggle
            />
          </div>
          <h4 className="description">
            Attract more attention from your customers with promotional banners displayed on the top
            of your homepage.
          </h4>
          <h3 className="banners-count-title">Banners ({banners.filter(Boolean).length}/6)</h3>

          <div className="banners-grid">
            {banners.map((banner, index) => (
              <div
                key={index}
                className="banner-card"
                onClick={() => document.getElementById(`banner-upload-${index}`).click()}>
                {banner ? (
                  <img src={banner} alt={`Banner ${index + 1}`} className="banner-image" />
                ) : (
                  <div className="add-banner-content">
                    <PlusCircleOutlined />
                    <p>Add Banner</p>
                  </div>
                )}
                <input
                  type="file"
                  id={`banner-upload-${index}`}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(event) => fileUpload(event, index)}
                />
              </div>
            ))}
          </div>

          <Button label="Save" onClick={() => saveBanner()} />
        </div>
      </Card>
    </OutletCard>
  );
};

export default OnlineShop;
