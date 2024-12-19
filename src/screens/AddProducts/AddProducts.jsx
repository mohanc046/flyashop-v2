import React, { Component } from "react";
import StepZilla from "react-stepzilla";
import "./steps.scss";

import Step1 from "./components/UploadVideoStep";
import Step2 from "./components/ProductDetailsStep";
import Step3 from "./components/DoneStep";
import ComponentCard from "../../components/ComponentsCard/ComponentCard";

class FormSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.sampleStore = {
      email: "",
      gender: ""
    };
  }

  getStore = () => this.sampleStore;

  updateStore = (update) => {
    this.sampleStore = {
      ...this.sampleStore,
      ...update
    };
  };

  render() {
    const steps = [
      {
        name: "Upload Video",
        component: <Step1 getStore={this.getStore} updateStore={this.updateStore} />
      },
      {
        name: "Add Details",
        component: <Step2 getStore={this.getStore} updateStore={this.updateStore} />
      },
      {
        name: "Done",
        component: <Step3 getStore={this.getStore} updateStore={this.updateStore} />
      }
    ];

    return (
      <div className="p-5">
        <ComponentCard>
          <div className="example">
            <div className="step-progress">
              <StepZilla steps={steps} nextTextOnFinalActionStep="Save" />
            </div>
          </div>
        </ComponentCard>
      </div>
    );
  }
}

export default FormSteps;
