import React from 'react';

import "../../ProductList/style.css"

import _ from 'lodash';
import { FilterUI } from '../Components/FilterUI';
export const CustomerListDesktop = ({ renderTableView }) => {
    return (
        <div className="layout-alignment" id="dataTable">
            <FilterUI optional />
            {renderTableView()}
        </div>
    )
}