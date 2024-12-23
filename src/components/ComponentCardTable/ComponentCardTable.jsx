import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import PropTypes from "prop-types";
import "./ComponentCardTable.scss";

const ComponentCardTable = ({ children, title, subtitle }) => {
  return (
    <Card className="bg-light">
      <CardTitle tag="h4" className={title ? "border-bottom py-3 mb-0" : ""}>
        {title}
      </CardTitle>

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
