import React from 'react';
import SearchBox from '../../../components/SearchBox/SearchBox';
import { CImage } from '@coreui/react';
import { config } from '../../../config';

const CustomerListSearch = ({handleSearchFilter}) => (
    <div className='margin-bot-8 flex'>
        <span className='width85'>
            <SearchBox handleSearchFilter={handleSearchFilter}/>
        </span>
        <span className='filterIconContainer'>
            <CImage align="center" src={config.FILTER_ICON} />
        </span>
    </div>
);

export default CustomerListSearch;
