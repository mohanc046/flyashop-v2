import React from "react";
import PropTypes from "prop-types";
import { CardTitle, Spinner, Card, Button, Table } from "reactstrap";
import "./CommonTable.scss";
import SearchInput from "../../SearchInput/SearchInput";
import * as Icon from "react-feather";

const CommonTable = ({
  title,
  columns,
  data,
  isLoading,
  searchPlaceHolder,
  searchOnChange,
  searchValue,
  searchInputId,
  searchInputName
}) => {
  return (
    <div className="bg-white rounded p-3">
      {title && (
        <CardTitle tag="h4" className="border-bottom pb-3 mb-0">
          {title}
        </CardTitle>
      )}
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}>
          <Spinner color="primary" />
        </div>
      ) : (
        <Card className="bg-white">
          <div className="d-flex justify-content-between align-items-center px-1 py-3 flex-wrap gap-3 border-bottom">
            <div className="me-3">
              <SearchInput
                placeholder={searchPlaceHolder}
                onChange={searchOnChange}
                value={searchValue}
                inputId={searchInputId}
                inputName={searchInputName}
              />
            </div>
            <div className="d-flex gap-2">
              <Button color="secondary" size="sm" className="d-flex align-items-center gap-2">
                <Icon.ChevronUp size={15} /> Sort
              </Button>
              <Button color="secondary" size="sm" className="d-flex align-items-center gap-2">
                <Icon.Filter size={15} />
                Filter
              </Button>
            </div>
          </div>
          <Table className="no-wrap align-middle table-bg" responsive>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-top">
                    {columns.map((column) => (
                      <td key={column.key}>
                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      )}
    </div>
  );
};

CommonTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired, // Column header
      key: PropTypes.string.isRequired, // Key to map row data
      render: PropTypes.func // Optional custom render function
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired // Loading state
};

export default CommonTable;
