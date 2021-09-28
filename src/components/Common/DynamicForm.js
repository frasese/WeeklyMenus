import React, { useState, useEffect } from "react";

import { Link } from "@reach/router";
import { Form, Input, Checkbox } from "antd";
import Button from "antd-button-color";

export default function DynamicForm({
  model,
  item,
  setItem,
  handleSubmit,
  submitText
}) {
  const [form] = Form.useForm();

  const getProperties = (p) => {
    let ret = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };
    switch (p.type) {
      case "checkbox":
      case "radio":
        ret["valuePropName"] = "checked";
        break;
      default:
    }
    return ret;
  };

  const buttonItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 4
    }
  };

  useEffect(() => {
    if (Object.keys(item).length !== 0) {
      //Necesario para ant::Form
      //No se pueden establecer los valores iniciales a través de un estado dinámico
      //Form::initialValues y Form.Item::initialValue solo sirven para valores estáticos
      //No sería necesario, pero NO establecemos el valor en los input tipo checkbox (se gestionan a través del checked)
      form.setFieldsValue(
        model.reduce((res, p) => {
          //console.log("[" + p.dataIndex + "]:", item[p.dataIndex]);
          //if (p.type === "checkbox") {
          //  return { ...res };
          //}
          return { ...res, [p.dataIndex]: item[p.dataIndex] || "" };
        }, {})
      );
    }
  }, [item]);

  //Cuando cambia un valor del Form, modificamos dicho campo en "item"
  //Esto lanzará un re-render, entrará por useEffect, y hará un setFieldsValue
  const handleValuesChange = (changedValues, allValues) => {
    //console.log("item:", item);
    //console.log("changedValues:", changedValues);
    setItem({ ...item, ...changedValues });
  };

  //En el caso de los checkboxes, queremos guardar el atributo "checked" y no "value" en el "item"
  //Sabemos que esta función se llama después de "handleValuesChange", por lo que machacará el valor establecido por la misma
  /*const onChangeCheckbox = (e) => {
    const { id, checked } = e.target;
    //console.log("changed: " + id + "->" + checked);
    setItem({ ...item, [id]: checked });
  };*/

  const disableSubmit = model.reduce((res, p) => {
    return res || (p.required && !Boolean(item[p.dataIndex]));
  }, false);

  const renderElements = (
    <>
      {model.map((p) => {
        let inputItem = null;
        switch (p.type || "text") {
          case "checkbox":
            inputItem = (
              <Checkbox
              //checked={item[p.dataIndex] || false}
              //onChange={onChangeCheckbox}
              />
              //  {p.title}
              //</Checkbox>
            );
            break;
          default:
            inputItem = <Input type={p.type || "text"} placeholder={p.text} />;
        }
        return (
          <Form.Item
            name={p.dataIndex}
            key={p.dataIndex}
            label={p.title}
            required={p.required || false}
            tooltip={p.help || false}
            {...getProperties(p)}
          >
            {inputItem}
          </Form.Item>
        );
      })}
    </>
  );

  return (
    <>
      <div>User {JSON.stringify(item, null, 2)}</div>

      <div className="alert alert-danger alert-dismissible fade show">
        <strong>Error!</strong> A problem has been occurred while submitting
        your data.
        <button type="button" className="close" data-dismiss="alert">
          &times;
        </button>
      </div>

      <Form
        form={form}
        layout="horizontal"
        onValuesChange={handleValuesChange}
        onFinish={handleSubmit}
      >
        {renderElements}

        <Form.Item {...buttonItemLayout}>
          <Button type="success" htmlType="submit" disabled={disableSubmit}>
            {submitText}
          </Button>
          <Link to="../">
            <Button
              type="primary"
              style={{
                margin: "0 8px"
              }}
            >
              Cancelar
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  );
}
