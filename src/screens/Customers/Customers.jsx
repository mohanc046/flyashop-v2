import React from "react";
import "react-table-v6/react-table.css";
import { Card } from "reactstrap";
import ComponentCardTable from "../../components/ComponentCardTable/ComponentCardTable";
import CommonTable from "../../components/Table/CommonTable/CommonTable";
import OutletCard from "../../components/OutletCard/OutletCard";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import "./Customers.scss";
import { useCustomer } from "./_hooks/useCustomer";

const Customer = () => {
  const {
    categories,
    handleCategorySelect,
    columns,
    state,
    payload,
    onApplySortFilter,
    onClearFilterChange,
    handleSearch,
    handlePerPageRowsChange,
    handlePageChange,
    currentPage,
    totalItems,
    rowsPerPage
  } = useCustomer();

  return (
    <OutletCard>
      <Card className="d-flex justify-content-between p-3 flex-row flex-wrap gap-3 bg-light">
        <CategoryFilter
          categories={categories}
          onSelect={handleCategorySelect}
          currentCategory={"ALL"}
        />
      </Card>

      <ComponentCardTable title={"Manage Customers"} searchPlaceHolder={"Search by Name..."}>
        <CommonTable
          columns={columns}
          data={state.customersList}
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

export default Customer;
