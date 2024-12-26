import React, { useState } from "react";
import "react-table-v6/react-table.css";
import { Card, Modal, ModalBody, ModalHeader } from "reactstrap";
import * as Icon from "react-feather";
import ComponentCardTable from "../../components/ComponentCardTable/ComponentCardTable";
import CommonTable from "../../components/Table/CommonTable/CommonTable";
import OutletCard from "../../components/OutletCard/OutletCard";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import { useOrder } from "./_hooks/useOrderList";
import Button from "../../components/Button/Button";
import { orderListCategories } from "./OrderList.constants";
import "./OrderList.scss";

const OrderList = () => {
  const {
    payload,
    handleCategorySelect,
    columns,
    mapOrderDataToTable,
    state,
    onClearFilterChange,
    onApplySortFilter,
    isModalOpen,
    setIsModalOpen,
    modalData,
    handleSubmit
  } = useOrder();

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <OutletCard>
      <Card className="d-flex justify-content-between p-3 flex-row flex-wrap gap-3 bg-light">
        <CategoryFilter
          categories={orderListCategories}
          onSelect={handleCategorySelect}
          currentCategory={payload.categoryType}
        />

        <div className="d-flex align-items-center gap-3 bg-light">
          <Button label="Report" icon={<Icon.Download size={15} />} />
        </div>
      </Card>

      <ComponentCardTable title={"Manage Orders"} searchPlaceHolder={"Search Order ID, Name..."}>
        <CommonTable
          columns={columns}
          data={mapOrderDataToTable(state.orderList)}
          isLoading={state.loaderStatus}
          sortCallback={onApplySortFilter}
          filterCallback={onClearFilterChange}
          sort={payload.sort}
        />
      </ComponentCardTable>

      <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(false)} size="md">
        <ModalHeader toggle={() => setIsModalOpen(false)}>Order Details</ModalHeader>
        <ModalBody>
          <h6 className="fw-semibold">{modalData?.title}</h6>
          {modalData?.action && (
            <>
              <div className="mb-4 mt-3">
                <input
                  type="checkbox"
                  id="confirmCheckbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="confirmCheckbox" className="ms-2">
                  Yes
                </label>
              </div>
              <div className="d-flex gap-3">
                <Button label="Cancel" onClick={() => setIsModalOpen(false)} />
                <Button
                  label={modalData?.action}
                  onClick={() => handleSubmit()}
                  disabled={!isChecked}
                />
              </div>
            </>
          )}
        </ModalBody>
      </Modal>
    </OutletCard>
  );
};

export default OrderList;
