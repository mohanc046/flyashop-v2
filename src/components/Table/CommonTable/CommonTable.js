import React from "react";
import PropTypes from "prop-types";
import { CardTitle, Table, Spinner } from "reactstrap";
import "./CommonTable.scss";

const CommonTable = ({ title, columns, data, isLoading }) => {
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
