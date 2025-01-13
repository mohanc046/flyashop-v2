import React from "react";
import PropTypes from "prop-types";
import { CardTitle, Spinner, Card, Button, Table } from "reactstrap";
import "./CommonTable.scss";
import SearchInput from "../../SearchInput/SearchInput";
import * as Icon from "react-feather";
import _ from 'lodash';
const CommonTable = ({
  title,
  columns,
  data,
  isLoading,
  searchPlaceHolder,
  searchOnChange,
  searchValue,
  searchInputId,
  searchInputName,
  hideSearch = false,
  hidePagination = false,
  filterCallback,
  sortCallback,
  sort,
  currentPage,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
  handleRowClick
}) => {
  // Ensure rowsPerPage is valid
  const validRowsPerPage = rowsPerPage > 0 ? rowsPerPage : 1;
  const totalPages = Math.ceil(totalItems / validRowsPerPage);

  return (
    <div className="bg-white rounded p-3">
      {title && (
        <CardTitle tag="h4" className="border-bottom pb-3 mb-0">
          {title}
        </CardTitle>
      )}
      {!hideSearch && (
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
              <Button
                color="secondary"
                size="sm"
                className="d-flex align-items-center gap-2"
                onClick={() => (sortCallback ? sortCallback(sort) : null)}>
                {sort > 0 ? <Icon.ChevronDown size={15} /> : <Icon.ChevronUp size={15} />}
                Sort
              </Button>
              <Button
                color="secondary"
                size="sm"
                className="d-flex align-items-center gap-2"
                onClick={filterCallback}>
                <Icon.Filter size={15} />
                Filter
              </Button>
            </div>
          </div>
        </Card>
      )}

      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}>
          <Spinner color="primary" />
        </div>
      ) : (
        <div className="table-container">
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
                      <td key={column.key} onClick={() => _.get(column, 'renderClickAction', true) ? handleRowClick?.(row) : {}}>
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
        </div>
      )}

      {!hidePagination && (
        <div className="pagination-outer-container">
          <div className="pagination-container flex-wrap gap-3">
            <div className="rows-per-page">
              <label htmlFor="rowsPerPage" className="rows-label">
                Rows per page:
              </label>
              <select
                id="rowsPerPage"
                value={rowsPerPage}
                onChange={(e) =>
                  onRowsPerPageChange ? onRowsPerPageChange(Number(e.target.value)) : null
                }
                className="rows-select ms-2">
                {[10, 20, 50].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="custom-pagination">
              <button
                className={`pagination-btn first ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => onPageChange && onPageChange(1)}>
                &lt;&lt;
              </button>
              <button
                className={`pagination-btn previous ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => onPageChange && onPageChange(currentPage - 1)}>
                &lt;
              </button>

              {[...Array(totalPages ? totalPages : [])].map((_, i) => (
                <button
                  key={i}
                  className={`pagination-btn number ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => onPageChange && onPageChange(i + 1)}>
                  {i + 1}
                </button>
              ))}

              <button
                className={`pagination-btn next ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}>
                &gt;
              </button>
              <button
                className={`pagination-btn last ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() => currentPage < totalPages && onPageChange(totalPages)}>
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
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
  isLoading: PropTypes.bool.isRequired, // Loading state
  searchPlaceHolder: PropTypes.string,
  searchOnChange: PropTypes.func,
  searchValue: PropTypes.string,
  searchInputId: PropTypes.string,
  searchInputName: PropTypes.string,
  filterCallback: PropTypes.func,
  sortCallback: PropTypes.func,
  sort: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired
};

export default CommonTable;
