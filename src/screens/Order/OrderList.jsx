import React from "react";
import "react-table-v6/react-table.css";
import { Card } from "reactstrap";
import * as Icon from "react-feather";
import ComponentCardTable from "../../components/ComponentCardTable/ComponentCardTable";
import CommonTable from "../../components/Table/CommonTable/CommonTable";
import OutletCard from "../../components/OutletCard/OutletCard";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import { useOrder } from "./_hooks/useOrderList";
import Button from "../../components/Button/Button";

const OrderList = () => {
  const { categories, handleCategorySelect, columns, orderData } = useOrder();

  return (
    <OutletCard>
      <Card className="d-flex justify-content-between p-3 flex-row flex-wrap gap-3 bg-light">
        <CategoryFilter categories={categories} onSelect={handleCategorySelect} />

        <div className="d-flex align-items-center gap-3 bg-light">
          <Button label="Report" icon={<Icon.Download size={15} />} />
        </div>
      </Card>

      <ComponentCardTable title={"Manage Orders"} searchPlaceHolder={"Search Order ID, Name..."}>
        <CommonTable columns={columns} data={orderData} />
      </ComponentCardTable>
    </OutletCard>
  );
};

export default OrderList;
