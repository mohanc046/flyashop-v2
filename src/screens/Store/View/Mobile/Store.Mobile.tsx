import _ from "lodash";
import React from 'react'
import { CImage } from "@coreui/react";
import { config } from "../../../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { renderFilterBox } from "../../../../utils/utilsUI";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";;
import { HorizontalProductView } from "../../../../components/HorizontalProductView";
import './Store.Mobile.css'

const StoreMobileView = ({
    isPreviewEnabled,
    cancelAddCart,
    updateState,
    sidebarShow,
    addToCart,
    storeName,
    BottomNav,
    searchTerm,
    setSearchTerm,
    categoryList,
    updateChosenCategory,
    selectedFilterOptions,
}) => {
    return <div>
        <StoreProductPreviewHeader
            isPreviewEnabled={isPreviewEnabled}
            cancelAddCart={cancelAddCart}
            updateState={updateState}
            sidebarShow={sidebarShow}
        />
        <hr></hr>
        <div className="shop-mob-layout">
            <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Filters options={categoryList} selectedFilterOptions={selectedFilterOptions} onSelect={updateChosenCategory} />
            <hr></hr>
            <ProductsListings storeName={storeName} addToCart={addToCart} searchTerm={searchTerm} selectedFilterOptions={selectedFilterOptions} />
        </div>
        <BottomNav storeName={storeName} />
    </div>
}

export default StoreMobileView;

export const StoreProductPreviewHeader = ({
    isPreviewEnabled,
    cancelAddCart,
    updateState,
    sidebarShow
}) => (
    <div className="header-mob-layout">
        <div className="flex2 d-flex p-2">
            <span>
                {
                    isPreviewEnabled ? <FontAwesomeIcon icon={faAngleLeft} onClick={cancelAddCart} /> :
                        <img className="header-user-image" onClick={() => updateState({ sidebarShow: !sidebarShow })} src={config.USER_LOGO} />
                }
            </span>
            {
                isPreviewEnabled ?
                    <div className="orderTitle">Order</div> :
                    <span className="BOLD FONT18">My Shop</span>
            }
        </div>
        <div className="notification-container"><FontAwesomeIcon icon={faBell} /></div>
    </div>
)

const SearchInput = ({ searchTerm, setSearchTerm }) => (
    <div className='margin-bot-8 flex'>
        <span className='width90'>
            <Input
                className='ant-input-affix-wrapper products-search'
                placeholder='Search...'
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                prefix={<SearchOutlined className="site-form-item-icon" />}
                suffix={<button className="btn btn-primary primary-color button arrow-right"><FontAwesomeIcon icon={faAngleRight} /></button>}
            />
        </span>
        <span className='products-filter-container d-flex align-items-center'>
            <CImage align="center" src={config.FILTER_ICON} />
        </span>
    </div>
)

const Filters = ({ options = [], selectedFilterOptions = [], onSelect }) => (
    <div className="addNewProductButtonUI">
        <div className="scrollable-container">
            <div className='flex '>
                {options.map(item => renderFilterBox(_.get(item, 'key'), selectedFilterOptions.includes(_.get(item, 'value', '')), () => onSelect(_.get(item, 'value'))))}
            </div>
        </div>
    </div>
)

const ProductsListings = ({ storeName, addToCart, searchTerm, selectedFilterOptions }) => (
    <div>
        <HorizontalProductView
            storeName={storeName}
            category={'RECENTLY ADDED VIDEOS'}
            scrollId={'scrollableDiv1'}
            addToCart={addToCart}
            searchTerm={searchTerm}
            selectedFilterOptions={selectedFilterOptions}
        />
        <HorizontalProductView
            storeName={storeName}
            category={'MOST VIEWED VIDEOS'}
            scrollId={`scrollableDiv2`}
            addToCart={addToCart}
            searchTerm={searchTerm}
            selectedFilterOptions={selectedFilterOptions}
        />
    </div>
)