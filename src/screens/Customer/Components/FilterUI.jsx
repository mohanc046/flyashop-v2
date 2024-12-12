import React from 'react';

import "../../ProductList/style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { renderFilterBox } from '../../../utils/utilsUI';

const filters = ['All'] // add more chips

export const FilterUI = ({
    optional = false,
    navigateToProducts = () => { }
}) => {
    const renderButton = optional && (
        <button className="addNewProductButton opacity-0" onClick={navigateToProducts}>
            <FontAwesomeIcon icon={faEdit} /> Add New Customer
        </button>
    )

    return (
        <div className="addNewProductButtonUI">
            <div className="scrollable-container">
                <div className="flex">
                    {filters.map(item => renderFilterBox(`${item} (193)`, true))}
                </div>
            </div>
            {renderButton}
        </div>
    );
};