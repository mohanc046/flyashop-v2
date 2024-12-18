import React from "react";
import "react-table-v6/react-table.css";
import { Card, Col, Row } from "reactstrap";
import OutletCard from "../../components/OutletCard/OutletCard";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import "./Plugins.scss";
import { usePlugins } from "./_hooks/usePlugins";
import { pluginDetails, pluginsCategories } from "./Plugins.constants";
import PluginCard from "./components/PluginCard";

const Plugins = () => {
  const { handleCategorySelect } = usePlugins();

  return (
    <OutletCard>
      <Card className="d-flex justify-content-between flex-column flex-wrap bg-white">
        <CategoryFilter categories={pluginsCategories} onSelect={handleCategorySelect} />
        <Row className="d-flex flex-wrap mt-4">
          {pluginDetails.map((plugin, index) => (
            <Col ls="4" key={index}>
              <PluginCard details={plugin} />
            </Col>
          ))}
        </Row>
      </Card>
    </OutletCard>
  );
};

export default Plugins;
