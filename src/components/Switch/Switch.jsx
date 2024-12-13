import React from "react";
import PropTypes from "prop-types";
import "./Switch.scss";

const Switch = ({
  initialStatus,
  activeText = "Active",
  hiddenText = "Hidden",
  onToggle,
}) => {
  const [isActive, setIsActive] = React.useState(initialStatus === "active");

  const handleToggle = () => {
    const newStatus = !isActive;
    setIsActive(newStatus);

    if (onToggle) {
      onToggle(newStatus ? "active" : "hidden");
    }
  };

  return (
    <div className="switch-container d-flex align-items-center">
      <label className="switch">
        <input type="checkbox" checked={isActive} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
      <span className="ms-2 status-text">
        {isActive ? activeText : hiddenText}
      </span>
    </div>
  );
};

Switch.propTypes = {
  initialStatus: PropTypes.string.isRequired,
  activeText: PropTypes.string,
  hiddenText: PropTypes.string,
  onToggle: PropTypes.func,
};

export default Switch;
