import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

/**
 * Parses an array of objects according to the component requirements. If an element of the array is a @String or @Number , then value and label will be the same.
 * @param {Object[]} data Array with data to be parsed
 * @param {Function} labelCallback Callback that receives each entry of the array and returns the apropriate label. If no function is supplied, the first 3 indexes returned by Object.keys( @data ) are used
 *
 * @returns an array of {label, value} objects.
 */
export const optionsParser = (data, labelCallback) => {
    const invalid_data_err = Error(
        "Could not parse data for Select component options. Must receive an Array of Objects"
    );

    const parsed = [];

    const defaultLabel = (entry) => {
        return Object.values(entry).slice(0, 3).join(", ");
    };

    if (Array.isArray(data)) {
        for (const key in data) {
            parsed.push({
                value: data[key],
                label: labelCallback
                    ? labelCallback(data[key])
                    : defaultLabel(data[key]),
            });
        }
        return { options: parsed };
    }
    throw new invalid_data_err();
};

function Select({
    fetchData = () => {},
    onChange = () => {},
    placeholder,
    loadingText,
    ...props
}) {
    const [value, setValue] = useState("");

    const onChangeHandler = (params) => {
        console.log("onChange", params);
        setValue(params);
        onChange(params);
    };

    const onLoadOptions = async (inputVal) => {
        //fetch data
        const data = await fetchData(inputVal);
        // console.log("Fetched Data ", data);

        //Should check if data is valid?
        //data can be undefined

        //parse
        return data;
    };

    return (
        <AsyncPaginate
            placeholder={placeholder}
            debounceTimeout={600}
            blurInputOnSelect
            value={value}
            onChange={onChangeHandler}
            loadOptions={onLoadOptions}
            className={props.className}
        ></AsyncPaginate>
    );
}
export default Select;
