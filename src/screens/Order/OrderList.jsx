import React from "react";
import "react-table-v6/react-table.css";
import { Button, Card } from "reactstrap";
import * as Icon from "react-feather";
import ComponentCardTable from "../../components/ComponentCardTable/ComponentCardTable";
import CommonTable from "../../components/Table/CommonTable/CommonTable";
import OutletCard from "../../components/OutletCard/OutletCard";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import { useOrder } from "./_hooks/useOrderList";

const OrderList = () => {
  const { categories, handleCategorySelect, columns, orderData } = useOrder();

  return (
    <OutletCard>
      <Card className="d-flex justify-content-between p-3 flex-row flex-wrap gap-3 bg-white">
        <CategoryFilter categories={categories} onSelect={handleCategorySelect} />

        <div className="d-flex align-items-center gap-3 bg-white">
          <Button color="secondary" size="sm" className="d-flex align-items-center gap-2">
            <Icon.Download size={15} /> Report
          </Button>
        </div>
      </Card>

      <ComponentCardTable title={"Manage Orders"} searchPlaceHolder={"Search Order ID, Name..."}>
        <CommonTable columns={columns} data={orderData} />
      </ComponentCardTable>
    </OutletCard>
  );
};

export default OrderList;
