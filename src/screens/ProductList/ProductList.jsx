import React from "react";
import "react-table-v6/react-table.css";
import { Button, Card } from "reactstrap";
import * as Icon from "react-feather";
import ComponentCardTable from "../../components/ComponentCardTable/ComponentCardTable";
import CommonTable from "../../components/Table/CommonTable/CommonTable";
import OutletCard from "../../components/OutletCard/OutletCard";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import { useProductList } from "./_hooks/useProductList";

const ProductList = () => {
  const { categories, handleCategorySelect, columns, productData } =
    useProductList();

  return (
    <OutletCard>
      <Card className="d-flex justify-content-between p-3 flex-row flex-wrap gap-3 bg-white">
        <CategoryFilter
          categories={categories}
          onSelect={handleCategorySelect}
        />

        <div className="d-flex align-items-center gap-3 bg-white">
          <Button
            color="secondary"
            size="sm"
            className="d-flex align-items-center gap-2"
          >
            <Icon.Download size={15} /> Report
          </Button>
          <Button
            color="secondary"
            size="sm"
            className="d-flex align-items-center gap-2"
          >
            <Icon.PlusCircle size={15} /> Add New Product
          </Button>
        </div>
      </Card>

      <ComponentCardTable
        title={"Manage Products"}
        searchPlaceHolder={"Search Product by Name..."}
      >
        <CommonTable columns={columns} data={productData} />
      </ComponentCardTable>
    </OutletCard>
  );
};

export default ProductList;
