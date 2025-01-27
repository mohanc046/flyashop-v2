import React from "react";
import { useDiscounts } from "./_hooks/useDiscounts";
import OutletCard from "../../components/OutletCard/OutletCard";
import { Card } from "reactstrap";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import Button from "../../components/Button/Button";
import * as Icon from "react-feather";
import ComponentCardTable from "../../components/ComponentCardTable/ComponentCardTable";
import CommonTable from "../../components/Table/CommonTable/CommonTable";
import { discountsCategories } from "./Discounts.constants";

const Discounts = () => {
  const {
    payload,
    handleCategorySelect,
    columns,
    mapVouchersDataToTable,
    state,
    onClearFilterChange,
    onApplySortFilter,
    handleSearch,
    handlePerPageRowsChange,
    handlePageChange,
    currentPage,
    totalItems,
    rowsPerPage
  } = useDiscounts();

  return (
    <OutletCard>
      <Card className="d-flex justify-content-between p-3 flex-row flex-wrap gap-3 bg-light">
        <CategoryFilter
          categories={discountsCategories}
          onSelect={handleCategorySelect}
          currentCategory={payload.categoryType}
        />

        <div className="d-flex align-items-center gap-3 bg-light">
          <Button
            label="Add Discount"
            icon={<Icon.PlusCircle size={15} />}
            // onClick={() => downloadReport()}
          />
        </div>
      </Card>

      <ComponentCardTable title={"Manage Discounts"} searchPlaceHolder={"Search Order ID, Name..."}>
        <CommonTable
          columns={columns}
          data={mapVouchersDataToTable(state.vouchersList)}
          isLoading={state.loaderStatus}
          sortCallback={onApplySortFilter}
          filterCallback={onClearFilterChange}
          sort={payload.sort}
          searchOnChange={handleSearch}
          onRowsPerPageChange={handlePerPageRowsChange}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalItems={totalItems}
          rowsPerPage={rowsPerPage}
        />
      </ComponentCardTable>
    </OutletCard>
  );
};

export default Discounts;
