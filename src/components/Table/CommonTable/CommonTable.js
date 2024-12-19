import React from "react";
import PropTypes from "prop-types";
import { CardTitle, Table } from "reactstrap";
import "./CommonTable.scss";

const CommonTable = ({ title, columns, data }) => {
  return (
    <div className="bg-white rounded p-3">
      {title && (
        <CardTitle tag="h4" className="border-bottom pb-3 mb-0">
          {title}
        </CardTitle>
      )}
      <Table className="no-wrap align-middle table-bg" responsive>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-top">
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommonTable;
