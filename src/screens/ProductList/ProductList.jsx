import React from "react";
import "react-table-v6/react-table.css";
import { Card } from "reactstrap";
import * as Icon from "react-feather";
import ComponentCardTable from "../../components/ComponentCardTable/ComponentCardTable";
import CommonTable from "../../components/Table/CommonTable/CommonTable";
import OutletCard from "../../components/OutletCard/OutletCard";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import { useProductList } from "./_hooks/useProductList";
import Button from "../../components/Button/Button";
import "./ProductList.scss";

const ProductList = () => {
  const { categories, handleCategorySelect, columns, productData } = useProductList();

  return (
    <OutletCard>
      <Card className="d-flex justify-content-between p-3 flex-row flex-wrap gap-3 bg-white">
        <CategoryFilter categories={categories} onSelect={handleCategorySelect} />

        <div className="d-flex align-items-center gap-3 bg-white flex-wrap">
          <Button label="Report" icon={<Icon.Download size={15} />} />
          <Button label="Add New Product" icon={<Icon.PlusCircle size={15} />} />
        </div>
      </Card>

      <ComponentCardTable title={"Manage Products"} searchPlaceHolder={"Search Product by Name..."}>
        <CommonTable columns={columns} data={productData} />
      </ComponentCardTable>
    </OutletCard>
  );
};

export default ProductList;
