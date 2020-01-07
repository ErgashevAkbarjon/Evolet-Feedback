import React, { useState, useEffect } from "react";
import withStyles from "react-jss";

const styles = {
    selectWrapper: {
        overflowY: "auto",
        height: "5rem"
    }
};

function MultipleSelect({
    classes,
    label,
    items,
    itemValue,
    itemText,
    name,
    value,
    onChange
}) {
    const [localValue, setLocalValue] = useState([]);

    useEffect(() => {
        setLocalValue(value);
    }, []);

    useEffect(() => {
        onChange({ target: { name, value: localValue } });
    }, [localValue]);

    const onCheckboxChange = ({ target }) => {
        if (target.checked) {
            const newValue = [...localValue];
            newValue.push(target.value);
            setLocalValue(newValue);
        } else {
            setLocalValue(localValue.filter(v => v != target.value));
        }
    };

    const arrayIncludes = (array, needle) => {
        for (const item of array) {
            if (item == needle) {
                return true;
            }
        }
        return false;
    };

    return (
        <div className="form-group">
            <label>{label}</label>
            <div className={classes.selectWrapper + " form-control"}>
                {items.map((item, i) => (
                    <div className="form-check" key={i}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={i}
                            value={item[itemValue]}
                            checked={arrayIncludes(localValue, item[itemValue])}
                            onChange={onCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor={i}>
                            {item[itemText]}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default withStyles(styles)(MultipleSelect);
