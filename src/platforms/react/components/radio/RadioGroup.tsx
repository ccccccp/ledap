import React from "react";
import useInputGroup from "../../hooks/useInputGroup";
import classnames from "classnames";
import { Radio as AntRadio } from "antd";

interface RadioGroupProps {
  model: any;
  attr: string;
  className?: string;
  onSetValue?: Function;
  value?: any;
}
export default function RadioGroup(props: RadioGroupProps) {
  const { model, attr, value: propValue, onSetValue, ...resetProps } = props;
  const { value, getValue, itemList, getItemOpen, open, close } = useInputGroup(
    model,
    attr
  );
  const _onChangeRadio = (checked, value) => {
    if (checked) {
      open?.(value);
    } else {
      close?.(value);
    }
    const newVal = getValue();
    onSetValue?.(newVal);
  };
  const _onChangeGroup = (e) => {
    const { checked, value } = e.target;
    _onChangeRadio(checked, value);
  };
  const targetValue =
    typeof propValue == "string" || typeof propValue == "number"
      ? `${propValue}`
      : Array.isArray(propValue)
      ? propValue[0]
      : propValue;
  return (
    <AntRadio.Group
      defaultValue={targetValue}
      value={targetValue}
      options={itemList}
      onChange={_onChangeGroup}
      {...resetProps}
    ></AntRadio.Group>
  );
}
