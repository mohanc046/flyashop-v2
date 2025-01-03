import dayjs from "dayjs";
import { DatePicker } from "antd";
import CustomSelect from "./Select/select";
import CustomTextInput from "./TextInput/textInput";
import CustomDropDown from "./DropDown";
import DynamicCustomSelect from "./Select/dynamicSelect";
import CustomList from "./List/list";
import CustomSearchTextInput from "./SearchInput";
import moment from "moment";

const CustomInput = (props) => {

    const { isHidden = false } = props;

    if (isHidden) return <></>

    switch (props.type) {
        case 'multi-select':
            return <CustomDropDown {...props} />;
        case 'select':
            return <CustomSelect {...props} />;
        case 'dynamic-select':
            return <DynamicCustomSelect {...props} />;
        case 'dynamic-list':
            return <CustomList {...props} />
        case 'search-text-input':
            return <CustomSearchTextInput {...props} />
        case 'datePicker':
            return <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                onChange={(entireDate, dateString) => props.onChange(dateString)}
                showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                value={moment(props.value, 'YYYY-MM-DD HH:mm:ss')}
            />
        default:
            return <CustomTextInput {...props} />;
    }
}

export default CustomInput;