import React from "react";
import "react-table-v6/react-table.css";
import { Card } from "reactstrap";
import ComponentCardTable from "../../components/ComponentCardTable/ComponentCardTable";
import CommonTable from "../../components/Table/CommonTable/CommonTable";
import OutletCard from "../../components/OutletCard/OutletCard";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import "./Customer.scss";
import { useCustomer } from "./_hooks/useCustomer";

const Customer = () => {
  const { categories, handleCategorySelect, columns, productData } = useCustomer();

  return (
    <OutletCard>
      <Card className="d-flex justify-content-between p-3 flex-row flex-wrap gap-3 bg-white">
        <CategoryFilter categories={categories} onSelect={handleCategorySelect} />
      </Card>

      <ComponentCardTable title={"Manage Customers"} searchPlaceHolder={"Search by Name..."}>
        <CommonTable columns={columns} data={productData} />
      </ComponentCardTable>
    </OutletCard>
  );
};

export default Customer;
