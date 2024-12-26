import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import "./Steps.scss";

const Steps = ({ steps, activeStep, setActiveStep }) => {
  const [error, setError] = useState("");

  const handleNext = () => {
    const validate = steps[activeStep]?.validate; // Get the validation function for the current step
    if (validate) {
      const validationError = validate();
      if (validationError) {
        setError(validationError); // Display the error message
        return;
      }
    }
    setError(""); // Clear error if validation passes
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setError(""); // Clear error when navigating back
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setError(""); // Clear error on reset
    setActiveStep(0);
  };

  return (
    <div className="example">
      <div className="step-progress">
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.name || `Step ${index + 1}`}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="step-content">
          {activeStep === steps.length ? (
            <div>
              <Typography>All steps completed</Typography>
              <Button onClick={handleReset} variant="outlined">
                Reset
              </Button>
            </div>
          ) : (
            <div>
              {error && <Typography color="red">{error}</Typography>}
              <Typography>{steps[activeStep]?.component || "No content"}</Typography>
              <div className="step-actions">
                <Button
                  disabled={activeStep === 0 || steps[activeStep].hideBackButton}
                  onClick={handleBack}
                  variant="outlined">
                  Back
                </Button>
                <Button onClick={handleNext} variant="contained" color="primary">
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Steps;
