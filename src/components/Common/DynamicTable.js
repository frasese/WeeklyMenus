import React, { useState, useRef, useEffect } from "react";
import { Table, Input, Space } from "antd";
import Button from "antd-button-color";
import { Link } from "@reach/router";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";

import Semaphore from "./Semaphore";

export default function DynamicTable({
  model,
  items,
  doRemove,
  rowSelectionType = "checkbox"
}) {
  //Checkbox keys
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  //Ajax loading state
  const [loading, setLoading] = useState(false);
  //Search input
  //const searchInputRef = useRef();

  const getColumnSearchProps = (model) => {
    //Search input
    const searchInputRef = useRef();

    const renderSearchButtons = (confirm, clearFilters) => {
      return (
        <>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters()}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </>
      );
    }

    const renderSearchInputByType = (value, setSelectedKeys, confirm, clearFilters) => {
      let ret = null;
      switch(model.type){
        case 'semaphore':
          ret = (
            <Space>
              <Semaphore value={value} onChange={(value) => setSelectedKeys([value])} isInput={true} />
              { renderSearchButtons(confirm, clearFilters) }
            </Space>
          );
        break;
        default:
          ret = (
            <>
              <Input
                ref={searchInputRef}
                placeholder={`Search ${model.dataIndex}`}
                value={value}
                onChange={(e) =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={() => confirm()}
                style={{ marginBottom: 8, display: "block" }}
              />
              <Space>
                { renderSearchButtons(confirm, clearFilters) }
              </Space>
            </>
          );
      }
      return ret;
    }

    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => (
        <div style={{ padding: 8 }}>
          { renderSearchInputByType(selectedKeys[0], setSelectedKeys, confirm, clearFilters) }
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) => {
        return (record[model.dataIndex] !== undefined)
          ? record[model.dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toString().toLowerCase())
          : false;
      },
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInputRef.current?.select(), 100);
        }
      }
    }
  };

  //On remove button click
  const handleRemove = async () => {
    setLoading(true);
    await doRemove(selectedRowKeys);
    setLoading(false);
  };

  //Checkbox/Radio colum config
  const rowSelection = {
    type: rowSelectionType,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    }
  };

  //filter columns with showInTable property
  let customModel = model.filter(elem => elem.showInTable);

  //Set "edit" action column
  customModel = [
    ...customModel,
    {
      //andt::Table::Column
      title: "",
      key: "action",
      render: (text, record) => (
        <Link to={record.key} title="Editar">
          <EditOutlined />
        </Link>
      )
    }
  ];

  //Add custom properties
  customModel = customModel.map((i) => {
    let ret = i;
    //Set search field
    if (i.searchable) {
      ret = { ...i, ...getColumnSearchProps(i) };
    }
    //Set custom renders by type
    switch(i.type){
      case 'semaphore':
        ret = { 
          ...ret,
          render: (text, row, index) => (
            <Semaphore value={text} />
          )
        };
      break;
    }
    return ret;
  });

  return (
    <>
      <Link to=":new">
        <Button type="success">New</Button>
      </Link>
      <Button type="primary" danger onClick={handleRemove} loading={loading}>
        Remove
      </Button>

      <Table
        columns={customModel}
        dataSource={items}
        rowSelection={rowSelection}
      />

<     Link to=":new">
        <Button type="success">New</Button>
      </Link>
      <Button type="primary" danger onClick={handleRemove} loading={loading}>
        Remove
      </Button>
    </>
  );
}
