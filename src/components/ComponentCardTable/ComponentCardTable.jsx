import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import PropTypes from "prop-types";
import SearchInput from "../SearchInput/SearchInput";
import * as Icon from "react-feather";
import "./ComponentCardTable.scss";

const ComponentCardTable = ({
  children,
  title,
  subtitle,
  searchPlaceHolder,
  searchOnChange,
  searchValue,
  searchInputId,
  searchInputName
}) => {
  return (
    <Card className="bg-white">
      <CardTitle tag="h4" className={title ? "border-bottom py-3 mb-0" : ""}>
        {title}
      </CardTitle>
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
      </Card>

      <CardBody className="py-0 px-0 bg-white">
        <CardSubtitle className="text-muted mb-3">{subtitle || ""}</CardSubtitle>
        <div className="bg-white">{children}</div>
      </CardBody>
    </Card>
  );
};

ComponentCardTable.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.node,
  searchPlaceHolder: PropTypes.string,
  searchOnChange: PropTypes.func,
  searchValue: PropTypes.string,
  searchInputId: PropTypes.string,
  searchInputName: PropTypes.string
};

export default ComponentCardTable;
