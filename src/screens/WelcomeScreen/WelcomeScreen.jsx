import { CButton, CImage } from "@coreui/react";
import { config } from "../../config";
import { renderButton } from "../../utils/utilsUI";
import { Fragment, useEffect, useState } from "react";
import "./welcomeScreen.css";
import { Radio } from 'antd';
import _ from "lodash";

const WelcomeScreen = (props) => {

    const steps = [
        {
            icon1: config.CLOCK_ICON,
            icon2: config.STATISTICS_ICON,
            title: "Add your all products and sell",
            subTitle: "Remember to keep track of your professional accomplishments."
        },
        {
            icon1: config.CLOCK_ICON,
            icon2: config.STATISTICS_ICON,
            title: "Include details with video",
            subTitle: "Remember to keep track of your professional accomplishments."
        },
        {
            icon1: config.BELL_ICON,
            icon2: config.STATISTICS_ICON,
            title: "Track your sale and get the report",
            subTitle: "Remember to keep track of your professional accomplishments."
        },
    ]
    const [selectedStep, setSelectedStep] = useState(0);
    const [selectedStepContent, setSelectedStepContent] = useState(steps[0]);

    const goNextStep = () => {
        setSelectedStep(prevState => prevState + 1);
    }
    useEffect(() => {
        if (selectedStep) {
            setSelectedStepContent(_.get(steps, selectedStep - 1, {}));
        }
    }, [selectedStep])

    const handleStart = () => {
        window.location.reload();
    }

    return (
        <div className="welcome-screen-container  d-flex flex-column">
            {
                selectedStep === 0 ?
                    <Fragment>
                        <div className="flex2 d-flex flex-column justify-content-center top">
                            <div className="image-container d-flex justify-content-center">
                                <CImage src={config.WELCOME_SCREEN_IMAGE} />
                            </div>
                            <div className="content-container">
                                <h1 className="title">Discover Your Dream shoppe here</h1>
                                <p className="sub-title">Explore all the sale features based on your interest and technology</p>
                            </div>
                        </div>
                        <div className="btn-grp">
                            <Radio.Group button defaultValue={1} onChange={() => { }} className="radio-grp d-flex justify-content-between">
                                <Radio value={1}>I'm Just Starting</Radio>
                                <Radio value={4}>I’m Already selling </Radio>
                            </Radio.Group>
                            {
                                renderButton({
                                    name: "Get Started",
                                    className: "get-started-btn primary-color button btn",
                                    onClick: goNextStep,
                                })
                            }
                        </div>
                    </Fragment>
                    :
                    <div className="onboarding-container d-flex flex-column h-100">
                        <div className="container flex2">
                            <div className="image-container">
                                <CImage src={selectedStepContent.icon1} />
                                <CImage src={selectedStepContent.icon2} />
                            </div>
                            <div className="steps">
                                {
                                    _.map(steps, (step, index) => {
                                        return (
                                            <span className={`step ${selectedStep > index ? "active" : ""}`}></span>
                                        )
                                    })
                                }
                            </div>
                            <div className="content">
                                <h1 className="title">{selectedStepContent.title}</h1>
                                <p className="sub-title">{selectedStepContent.subTitle}</p>
                            </div>
                        </div>
                        <div className="btn-grp d-flex justify-content-between align-items-center">
                            {
                                selectedStep !== steps.length ?
                                    <>
                                        {
                                            renderButton({
                                                name: "SKIP",
                                                className: "skip-btn button btn",
                                                onClick: () => { },
                                            })
                                        }
                                        {
                                            renderButton({
                                                name: "NEXT",
                                                className: "next-btn primary-color button btn",
                                                onClick: goNextStep,
                                            })
                                        }
                                    </> :
                                    <CButton
                                        // disabled={loaderStatus}
                                        className={"primary-color button start-btn"}
                                        onClick={handleStart}
                                    >Start
                                    </CButton>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

export default WelcomeScreen;
