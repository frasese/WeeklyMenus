import React, { useState, useEffect } from "react";

import { Form, Input, InputNumber, Space, Tooltip } from "antd";
import Button from "antd-button-color";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function DynamicList({
  model
}) {
    return (
        <Form.List name={model.dataIndex}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                        <Space key={key} style={{ display: 'flex' }} className={model.dataIndex} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'name']}
                                fieldKey={[fieldKey, 'name']}
                            >
                                <Input placeholder={model.text.placeholder[0] || ""} />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'value']}
                                fieldKey={[fieldKey, 'value']}
                            >
                                <InputNumber min={0} placeholder={model.text.placeholder[1] || ""} />
                            </Form.Item>
                            <Tooltip title={model.text.remove}>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Tooltip>
                        </Space>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            {model.text.add}
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
}