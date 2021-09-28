import React, { useState } from "react";
import { Link } from "@reach/router";

export default function DynamicTable({ model, items, doRemove }) {
  const [itemsChecked, setItemsChecked] = useState({});

  const handleAllCheckboxes = (e) => {
    setItemsChecked(
      items.reduce((ret, i) => {
        return { ...ret, [i.id]: e.target.checked };
      }, {})
    );
  };

  const handleClick = (e, u) => {
    setItemsChecked({ ...itemsChecked, [u.id]: e.target.checked });
  };

  const handleRemove = () => {
    doRemove(
      Object.keys(itemsChecked).filter((i) => {
        return itemsChecked[i];
      })
    );
  };

  const renderHeaderColumns = (
    <>
      {Object.keys(model).map((p) => {
        if (Object.values(model[p]).length >= 1) {
          return <th key={p}>{model[p].text}</th>;
        }
        return null;
      })}
    </>
  );
  const renderRowColumns = (item) => {
    return (
      <>
        <td>
          <input
            type="checkbox"
            onChange={(e) => handleClick(e, item)}
            checked={itemsChecked[item.id] || false}
          />
        </td>
        {Object.keys(model).map((p) => {
          if (Object.values(model[p]).length >= 1) {
            return (
              <td key={p}>
                {item[p]} - {(itemsChecked[item.id] && "true") || "false"}
              </td>
            );
          }
          return null;
        })}
        <td>
          <Link className="bi bi-pencil-square" to={item.id} title="Editar" />
        </td>
      </>
    );
  };

  return (
    <>
      <Link className="btn btn-primary" to=":new">
        New
      </Link>
      <button className="btn btn-primary" onClick={handleRemove}>
        Remove
      </button>

      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>
              <input type="checkbox" onClick={handleAllCheckboxes} />
            </th>
            {renderHeaderColumns}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>{renderRowColumns(item)}</tr>
          ))}
        </tbody>
      </table>

      <Link className="btn btn-primary" to=":new">
        New
      </Link>
      <button className="btn btn-primary" onClick={handleRemove}>
        Remove
      </button>
    </>
  );
}
