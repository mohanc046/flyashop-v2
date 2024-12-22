import React, { Component } from "react";

import Step1 from "./components/StoreDetails";
import Step2 from "./components/UploadProductVideo";
import Step3 from "./components/ProductDetailsStep";
import Step4 from "./components/DoneStep";
import ComponentCard from "../../../../components/ComponentsCard/ComponentCard";
import Steps from "../../../../components/Steps/Steps";

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
    console.log(update);
    this.sampleStore = {
      ...this.sampleStore,
      ...update
    };
  };

  render() {
    const steps = [
      {
        name: "Setup Store",
        component: <Step1 getStore={this.getStore} updateStore={this.updateStore} />
      },
      {
        name: "Upload Video",
        component: <Step2 getStore={this.getStore} updateStore={this.updateStore} />
      },
      {
        name: "Product Details",
        component: <Step3 getStore={this.getStore} updateStore={this.updateStore} />
      },
      {
        name: "Done",
        component: <Step4 getStore={this.getStore} updateStore={this.updateStore} />
      }
    ];

    return (
      <div className="p-2 p-sm-3 p-md-4 p-lg-5">
        <ComponentCard>
          <Steps steps={steps} />
        </ComponentCard>
      </div>
    );
  }
}

export default FormSteps;
