import React from "react";
import "./pos-layout.css";
import POSHeader from "./POSHeader";
import POSLeftNav from "./POSLeftNav";

const POSLayout = (props) => {
    const { screen } = props;
    return (
        <>
            <POSHeader />
            <div className="flex">
                <POSLeftNav screen={screen} />
                {props.children}
            </div>
        </>
    )
}

export default POSLayout;