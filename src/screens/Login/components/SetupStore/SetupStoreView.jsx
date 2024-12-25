import React from "react";
import UploadVideo from "./components/UploadProductVideo";
import ProductDetails from "./components/ProductDetailsStep";
import Done from "./components/DoneStep";
import { useAddProduct } from "../../../AddProduct/_hooks/useAddProduct";
import ComponentCard from "../../../../components/ComponentsCard/ComponentCard";
import Steps from "../../../../components/Steps/Steps";

const AddProduct = () => {
  const {
    uploadStepValidation,
    detailsStepValidation,
    createProduct,
    activeStep,
    setActiveStep,
    updateStore,
    mainState
  } = useAddProduct();

  const steps = [
    {
      name: "Upload Product Video",
      component: <UploadVideo updateStore={updateStore} setActiveStep={setActiveStep} />, // Pass setActiveStep
      validate: () => uploadStepValidation() // Pass as a function reference
    },
    {
      name: "Add Details",
      component: <ProductDetails updateStore={updateStore} mainState={mainState} />,
      validate: () => detailsStepValidation() // Pass as a function reference
    },
    {
      name: "Done",
      component: <Done createProduct={createProduct} />,
      validate: () => null
    }
  ];

  return (
    <div className="p-2 p-sm-3 p-md-4 p-lg-5">
      <ComponentCard>
        <Steps steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
      </ComponentCard>
    </div>
  );
};

export default AddProduct;
