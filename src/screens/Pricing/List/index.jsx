import { useState } from "react";

import '../pricing.css';

import { config } from "../../../config";

export const PricingCard = () => {

    const [pricingList, setPricingList] = useState([
        {
            isActive: true,
            label: "$49.99 / YEAR",
            price: "46.99",
            duration: "Year",
            description: "12 month membership",
            discountDescription: "BEST DEAL -58%"
        },
        {
            isActive: false,
            label: "$39.99 / 6 MONTH",
            price: "39.99",
            duration: "Year",
            description: "6 month membership",
        },
        {
            isActive: false,
            label: "$9.99m / MONTH",
            price: "9.99",
            duration: "Month",
            description: "1 month membership",
        }
    ])

    const updateSelection = (label) => {
        let updatedPricingSelection = pricingList.map(entry => {
            return { ...entry, isActive: `${entry.label}` === `${label}` }
        })
        setPricingList(updatedPricingSelection)
    }

    return <div>
        {pricingList.map((each) => {

            const { isActive = false, discountDescription = null } = each || {};

            return (
                <div class={isActive ? 'selectedOrderCardContainer' : 'orderCardContainer'} onClick={() => updateSelection(each.label)}>
                    <div class='pricing-item'>
                        <div class='pricingSelection'>
                            <img src={each.isActive ? config.CHECKED_ICON : config.NON_CHECKED_ICON} />
                        </div>
                        <div class='pricing-details'>
                            <div class='product-name FORT12 BOLD'>{each.label}</div>
                            <div class={isActive ? "selectedOrderDescriptionLabel" : 'orderDescriptionLabel'}> {each.description}</div>
                            {
                                isActive && discountDescription &&
                                <div className="discountLayout">
                                        <label className="discountLabel">{discountDescription}</label>
                                </div>
                            }
                        </div>
                        <div class='detailsContainer'>
                            <label className="detailLabel">Details</label>
                        </div>
                    </div>
                </div>
            )
        })}
    </div>

}