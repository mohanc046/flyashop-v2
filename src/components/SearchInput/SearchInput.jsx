import React from "react";
import { Form, Input } from "reactstrap";

const SearchInput = ({
  placeholder = "Search...",
  onChange,
  value,
  inputId = "searchInput",
  inputName = "searchInput",
}) => {
  return (
    <div className="">
      <Form>
        <div className="position-relative has-icon-left">
          <Input
            className="form-control"
            id={inputId}
            name={inputName}
            type="text"
            onChange={onChange}
            value={value}
            placeholder={placeholder}
          />
        </div>
      </Form>
    </div>
  );
};

export default SearchInput;
