import React, { useState } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import ComponentCard from "../../components/ComponentCard";
import * as data from "../../views/tables/ReacTableData";

const ProductList = () => {
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null); // To store data of the row being edited
  const [jsonData, setJsonData] = useState(data.dataTable); // Load initial data

  // Toggle the modal
  const toggle = () => {
    setModal(!modal);
  };

  // Handle form submission for editing
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = jsonData.map((row, index) =>
      index === editData.index
        ? {
            ...row,
            item: event.target.item.value,
            amount: event.target.amount.value,
            inventory: event.target.inventory.value,
            status: event.target.status.value,
          }
        : row
    );
    setJsonData(updatedData);
    setModal(false);
  };

  // Prepare data for React Table
  const data2 = jsonData.map((row, index) => ({
    ...row,
    actions: (
      <div className="text-center">
        <Button
          color="inverse"
          size="sm"
          onClick={() => {
            setEditData({ index, ...row });
            toggle();
          }}
        >
          <i className="fa fa-edit" />
        </Button>
      </div>
    ),
  }));

  return (
    <div>
      <ComponentCard title="All Products">
        <ReactTable
          columns={[
            {
              Header: "Item",
              accessor: "item",
            },
            {
              Header: "Amount",
              accessor: "amount",
            },
            {
              Header: "Inventory",
              accessor: "inventory",
            },
            {
              Header: "Status",
              accessor: "status",
            },
            // {
            //   Header: "Actions",
            //   accessor: "actions",
            //   sortable: false,
            //   filterable: false,
            // },
          ]}
          defaultPageSize={10}
          showPaginationBottom
          className="-striped -highlight"
          data={data2}
          filterable
        />
      </ComponentCard>

      {/* Edit Modal */}
      {editData && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="item"
                  id="item"
                  defaultValue={editData.item}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="amount">Amount</Label>
                <Input
                  type="text"
                  name="amount"
                  id="amount"
                  defaultValue={editData.amount}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="inventory">Inventory</Label>
                <Input
                  type="text"
                  name="inventory"
                  id="inventory"
                  defaultValue={editData.inventory}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  type="text"
                  name="status"
                  id="status"
                  defaultValue={editData.status}
                  required
                />
              </FormGroup>
              <Button type="submit" color="primary">
                Save Changes
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
