import _ from 'lodash';

import * as validator from 'validator';

import { FIELD_NAME } from './inputFieldLabel';

import moment from 'moment';

import { getCurrentDate } from '..';

export const isValid = (type, data) => {

  if (_.isUndefined(data))
    return false;

  let value = _.trim(`${data}`);

  let result;

  switch (type) {

    case FIELD_NAME.PASSWORD: result = validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    }) && validator.isLength(value, { min: 8, max: 15 });
      break;

    case FIELD_NAME.USER_NAME: result = validator.isAlphanumeric(value) && validator.isLength(value, { min: 4, max: 50 });
      break;

    case FIELD_NAME.IS_NOT_EMPTY: result = !_.isEmpty(value)
      break;

    case FIELD_NAME.MOBILE_NUMBER: result = validator.isMobilePhone(value, ['en-IN'], false);
      break

    case FIELD_NAME.EMAIL: result = validator.isEmail(value)
      break

    case FIELD_NAME.ALPHA_NUMERIC: result = validator.isAscii(value) && validator.isLength(value, { min: 3, max: 50 })
      break

    case FIELD_NAME.ADDRESS: result = validator.isAscii(value) && validator.isLength(value, { min: 3, max: 150 })
      break

    case FIELD_NAME.NUMERIC: result = validator.isNumeric(value) && validator.isLength(value, { min: 1, max: 30 })
      break

    case FIELD_NAME.STATUS: result = validator.isAscii(value) && validator.isLength(value, { min: 1, max: 2 })
      break

    case FIELD_NAME.DECIMAL: result = validator.isDecimal(value) && validator.isLength(value, { min: 1, max: 100 })
      break

    case FIELD_NAME.COLOR: result = validator.isHexColor(value)
      break

    case FIELD_NAME.LANDLINE: result = validator.matches(value, /\d{4,5}([- ]*)\d{6}/gm) && validator.isLength(value, { min: 11, max: 12 })
      break

    case FIELD_NAME.DATE: result = validator.isDate(value,
      {
        'format': 'YYYY-MM-DD',
        'strictMode': true,
        'delimiters': ['-'],
      }) && moment(value).isSameOrBefore(getCurrentDate())
      break

    case FIELD_NAME.OTP: result = validator.isNumeric(value) && validator.isLength(value, { min: 4, max: 4 })
      break

    case FIELD_NAME.STATE: result = validator.isAscii(value) && validator.isLength(value, { min: 3, max: 50 })
      break

    case FIELD_NAME.STREET: result = validator.isAscii(value) && validator.isLength(value, { min: 3, max: 50 })
      break

    case FIELD_NAME.DOOR_NO: result = validator.isAscii(value) && validator.isLength(value, { min: 1, max: 50 })
      break

    case FIELD_NAME.PIN_CODE: result = validator.isNumeric(value) && validator.isLength(value, { min: 6, max: 6 })
      break

    default: result = false;

  }

  return result

}