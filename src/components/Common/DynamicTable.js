import React, { useState, useRef } from "react";
import { Table, Input, Space } from "antd";
import Button from "antd-button-color";
import { Link } from "@reach/router";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";

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
  const searchInputRef = useRef();

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInputRef}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
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
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputRef.current.select(), 100);
      }
    }
  });

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

  //Set action column
  let customModel = [
    ...model,
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

  //Set search field
  customModel = customModel.map((i) => {
    if (i.searchable) {
      return { ...i, ...getColumnSearchProps(i.dataIndex) };
    }
    return i;
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

      <Link className="btn btn-primary" to=":new">
        New
      </Link>
      <button className="btn btn-primary" onClick={handleRemove}>
        Remove
      </button>
    </>
  );
}
