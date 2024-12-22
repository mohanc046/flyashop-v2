import React from "react";
import StepZilla from "react-stepzilla";
import "./Steps.scss";

const Steps = ({ steps }) => {
  return (
    <div className="example">
      <div className="step-progress">
        <StepZilla steps={steps} nextTextOnFinalActionStep="Finish" />
      </div>
    </div>
  );
};

export default Steps;
