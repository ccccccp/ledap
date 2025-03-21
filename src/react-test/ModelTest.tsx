import React, { useState, useEffect, useRef } from "react";
import * as ledap from "./lib/ledap";
import {
  Form,
  FormItem,
  Button,
  FormValidateEvent,
  RadioGroup,
  Segmented,
  CheckboxGroup,
  Select,
  SearchInput,
  DatePicker,
  Table,
  Dropdown,
  Uploader,
  Detail,
  ColorPicker,
  RangeDatePicker,
  TagList,
} from "@/platforms/react";
import { message } from "antd";

export default function ModelTestComponent() {
  const model1 = ledap.App.useModel({
    url: "/data/model.json",
  });
  const [, updateView] = useState(false);
  const fileModelRef = useRef(new ledap.Model({ file1: null, files2: [] }));
  const fileModel = fileModelRef.current;
  const search1Dp = ledap.App.useWebDp({
    httpOptions: {
      url: "/data/dp_1.json",
      params: {
        "per-page": 10,
      },
    },
  });
  const search2Dp = ledap.App.useWebDp({
    httpOptions: {
      url: "/data/dp_2.json",
      params: {
        "per-page": 10,
      },
    },
  });

  function _onFilish(data, json) {
    message.error({ content: "错误提示" });
    console.log("_onFilish data,json:", data, json);
  }

  if (!model1) {
    return "loading...";
  }
  console.log({ fileModel });
  return (
    <div>
      <Form
        model={model1}
        layout="horizontal"
        onSubmit={_onFilish}
        onSetValue={() => {
          updateView({});
        }}
      >
        {/*使用默认input*/}
        <FormItem attr="name" />
        <FormItem attr="age" FormComponentProps={{ type: "number" }} />
        <FormItem attr="password" FormComponentProps={{ type: "password" }} />
        <FormItem attr="introduce" FormComponentProps={{ type: "textarea" }} />
        <FormItem attr="phone" FormComponentProps={{ addonBefore: "+86" }} />
        <FormItem
          tooltip="实时校验"
          attr="phone"
          validate={[FormValidateEvent.input]}
          FormComponentProps={{ addonBefore: "+86", style: { width: 200 } }}
        ></FormItem>
        <FormItem attr="email" />
        <FormItem attr="sex" FormComponent={RadioGroup} />
        <FormItem
          attr="sex"
          FormComponent={RadioGroup}
          FormComponentProps={{ optionType: "button" }}
        />
        <FormItem attr="sex" FormComponent={Segmented} />
        <FormItem attr="batch_id" FormComponent={Select} />
        <FormItem attr="city" FormComponent={CheckboxGroup} />
        <FormItem
          show={model1?.sex == "2"}
          attr="stayCity"
          FormComponent={CheckboxGroup}
          onChanged={(v) => {
            console.log("onChanged:", v);
          }}
        />
        <FormItem attr="city" FormComponent={Select} />
        <FormItem attr="city" FormComponent={Dropdown} />
        <FormItem
          attr="city"
          inline
          showError={false}
          showLabel={false}
          FormComponent={Dropdown}
        />
        <FormItem
          attr="stayCity"
          onChanged={(v) => {
            console.log("onChanged:", v);
          }}
          FormComponent={Select}
        />
        <FormItem
          attr="search1"
          FormComponent={SearchInput}
          dp={search1Dp}
          FormComponentProps={{
            fieldNames: { label: "name", value: "id" },
          }}
        />
        <FormItem
          attr="search2"
          FormComponent={SearchInput}
          dp={search2Dp}
          FormComponentProps={{
            mode: "multiple",
            fieldNames: { label: "name", value: "id" },
          }}
        />
        <FormItem attr="birthDate" FormComponent={DatePicker} />
        <FormItem
          attr="rangeDate"
          FormComponent={RangeDatePicker}
          onChanged={(v) => {
            console.log("onChanged:", v);
          }}
        />
        <FormItem
          attr="rangeDate1"
          FormComponent={RangeDatePicker}
          onChanged={(v) => {
            console.log("onChanged:", v);
          }}
        />
        <FormItem
          attr="rangeDate2"
          FormComponent={RangeDatePicker}
          onChanged={(v) => {
            console.log("onChanged:", v);
          }}
        />
        <FormItem
          attr="rangeDate3"
          FormComponent={RangeDatePicker}
          onChanged={(v) => {
            console.log("onChanged:", v);
          }}
        />
        <FormItem
          attr="rangeDate4"
          FormComponentProps={{ showTime: true, format: "YYYY-MM-DD HH:mm:ss" }}
          FormComponent={RangeDatePicker}
          onChanged={(v) => {
            console.log("onChanged:", v);
          }}
        />
        <FormItem attr="color" FormComponent={ColorPicker} />
        <FormItem attr="color1" FormComponent={ColorPicker} />
        <FormItem attr="numberTag" FormComponent={TagList} />
        <FormItem
          attr="textTag"
          FormComponentProps={{ inputType: "text" }}
          FormComponent={TagList}
        />

        <FormItem
          attr="icon"
          FormComponent={Uploader}
          FormComponentProps={{
            multiple: false,
            upload: true,
            data: {},
            actionHeaders: {},
            urlPath: "data.url[0]",
            children: <Button>点击上传图标1</Button>,
            mimeTypes: ["image/png", "image/webp", "image/jpg", "image/jpeg"],
          }}
        />

        <FormItem
          attr="upload"
          FormComponent={Uploader}
          FormComponentProps={{
            multiple: true,
            upload: true,
            data: {},
            actionHeaders: {},
            urlPath: "data.url[0]",
            children: <Button>点击上传多文件</Button>,
            mimeTypes: ["image/png"],
          }}
        />
        <FormItem
          attr="upload2"
          FormComponent={Uploader}
          FormComponentProps={{
            multiple: true,
            upload: true,
            data: {},
            actionHeaders: {},
            urlPath: "data.url[0]",
            children: <Button>点击上传多文件</Button>,
            mimeTypes: ["image/png"],
          }}
        />
        <FormItem
          attr="upload3"
          FormComponent={Uploader}
          FormComponentProps={{
            multiple: false,
            upload: true,
            data: {},
            actionHeaders: {},
            urlPath: "data.url[0]",
            children: <Button>点击上传文件</Button>,
            mimeTypes: ["image/png"],
          }}
        />
        <Button type="primary" htmlType="submit">
          提交JSON表单
        </Button>
      </Form>
      <br />
      <Form
        model={fileModel}
        enctype="multipart/form-data"
        onSubmit={_onFilish}
      >
        <FormItem
          attr="file1"
          FormComponent={Uploader}
          FormComponentProps={{
            multiple: false,
            dragger: true,
            hint: "PNG格式 512x512 不超过1M",
            text: "点击或拖拽到此处上传file1",
            mimeTypes: ["image/png"],
            maxFileKBSize: 1024,
            maxPxSize: { width: 512, height: 512 },
          }}
        />
        <Button type="primary" htmlType="submit">
          提交formData表单
        </Button>
      </Form>
      <Detail
        columns={["name", "sex", { attribute: "upload" }]}
        model={model1}
      />
    </div>
  );
}
