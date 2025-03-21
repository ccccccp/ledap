import React, { useContext, useEffect, useState } from "react";
import FormContext from "../../contexts/FormContext";
import { Form as AntForm, FormProps as AntFormProps } from "antd";
import { _form } from "./form.module.less";
import classnames from "classnames";

export interface FormProps extends AntFormProps {
  model: any;
  children?: any;
  className?: string;
  inline?: boolean;
  onSubmit?: (data: any, json: any) => void;
  onSetValue?: Function;
  enctype?: string;
}

export default function Form(props: FormProps) {
  const {
    model,
    className,
    inline,
    onSubmit,
    onSetValue,
    enctype = "application/json",
    ...reset
  } = props;
  const [bool, setBool] = useState(false);
  function getValue(attr) {
    return model[attr];
  }
  function setValue(attr, val) {
    model[attr] = val;
    setBool((bool) => !bool);
    onSetValue?.();
  }
  function updateView() {
    setBool((bool) => !bool);
  }
  function _onFinish(e) {
    const json = { ...model };
    let data = json;
    switch (enctype.toLocaleLowerCase()) {
      case "multipart/form-data": {
        var formData = new FormData();
        Object.keys(json).forEach((key) => {
          if (json[key] === null) {
            return;
          }
          formData.append(key, json[key]);
        });
        data = formData;
        break;
      }
      default: {
        break;
      }
    }
    // console.log("form on filish json:", data, json);
    let firstErr = "";
    try {
      model?.validate?.();
      firstErr = model.getFirstError();
    } catch (e) {
      console.error(e);
    }

    onSubmit?.(data, firstErr);
    updateView();
  }
  return (
    <FormContext.Provider value={{ getValue, setValue, updateView, model }}>
      <AntForm
        className={classnames(_form, className, inline && "inline")}
        onFinish={_onFinish}
        {...reset}
      >
        {props.children}
      </AntForm>
    </FormContext.Provider>
  );
}
