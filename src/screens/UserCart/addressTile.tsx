import { useState, useEffect } from 'react';

import { isValid } from '../../utils/validation';

import _ from 'lodash';

export default function Address(props) {

    const { shippingAddress = {} } = props;

    const [shippingInfo, setShippingInfo] = useState({
        doorNo: "",
        state: "",
        street: "",
        pinCode: ""
    })

    useEffect(() => {

        setShippingInfo(shippingAddress);

        const { doorNo, state, street, pinCode } = shippingAddress || {};

        let validationResult = {
            doorNo: false,
            state: false,
            street: false,
            pinCode: false,
        }

        _.forEach({ doorNo, state, street, pinCode }, (value, key) => {

            _.update(validationResult, key, () => isValid(key, value))

        });

        setShippingErrorStatus(validationResult)

        setShippingAddress(shippingAddress)

        setIsValidShippingAddressInfo(_.every(validationResult, item => item === true))

    }, [!_.isEmpty(shippingAddress)])

 
    const [shippingErrorStatus, setShippingErrorStatus] = useState({
        doorNo: false,
        state: false,
        street: false,
        pinCode: false,
    })

    const { setShippingAddress, setIsValidShippingAddressInfo } = props;

    const getShippingAddressFormRenderPayload = () => [
        {
            label: "Door No",
            name: 'doorNo',
            errorStatus: _.get(shippingErrorStatus, 'doorNo', false),
            value: _.get(shippingInfo, 'doorNo', ''),
            errorMessage: "Enter valid Door No."
        },
        {
            label: "Address 1 (street)",
            name: 'street',
            errorStatus: _.get(shippingErrorStatus, 'street', false),
            errorMessage: "Enter valid street name",
            value: _.get(shippingInfo, 'street', ''),
        },
        {
            label: "Address 2 (city and state)",
            name: 'state',
            errorStatus: _.get(shippingErrorStatus, 'state', false),
            errorMessage: "Enter valid state name",
            value: _.get(shippingInfo, 'state', ''),
        },
        {
            label: "Pin code",
            name: 'pinCode',
            errorStatus: _.get(shippingErrorStatus, 'pinCode', false),
            errorMessage: "Enter valid pin code",
            value: _.get(shippingInfo, 'pinCode', ''),
        }
    ]

    const onEditShippingAddressDetails = (event) => {

        const { name, value: currentValue } = event.target;

        const validationResult = isValid(name, currentValue);

        setShippingInfo({ ...shippingInfo, [name]: currentValue })

        setShippingErrorStatus({ ...shippingErrorStatus, [name]: validationResult })

        setShippingAddress({ ...shippingInfo, [name]: currentValue })

        const validationError = _.values({ ...shippingErrorStatus, [name]: validationResult })

        setIsValidShippingAddressInfo(_.every(validationError, item => (item && !_.isEmpty(currentValue))))

    }

    return (
        <div className="orderSummary">
            <div className="shippingLabelContainer">Shipping Address</div>
            {
                getShippingAddressFormRenderPayload().map(item => {
                    return <div className="shippingAddressInputOutContainer">
                        <input
                            key={item.label}
                            className="shippingAddressInputContainer"
                            name={item.name}
                            value={item.value}
                            placeholder={item.label}
                            onChange={(event) => onEditShippingAddressDetails(event)}
                        />
                        {!item.errorStatus && <label className="validationErrorTextLabelContainer">{item.errorMessage}</label>}
                    </div>
                })
            }
        </div>
    )

}


