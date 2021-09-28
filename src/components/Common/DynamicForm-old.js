import { Link } from "@reach/router";

export default function OldDynamicForm({
  model,
  item,
  setItem,
  handleSubmit,
  submitText
}) {
  const disableSubmit = Object.keys(model).reduce((res, p) => {
    return res || (model[p].required && !Boolean(item[p]));
  }, false);

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setItem({ ...item, [id]: value });
  };
  const onChangeCheckbox = (e) => {
    const { id, checked } = e.target;
    setItem({ ...item, [id]: checked });
  };

  const renderElements = (
    <>
      {Object.keys(model).map((p) => {
        if (Object.values(model[p]).length >= 1) {
          switch (model[p].type || "text") {
            case "checkbox":
              return (
                <div key={p} className="form-check mb-3">
                  <input
                    type="checkbox"
                    id={p}
                    className="form-check-input"
                    checked={item[p] || false}
                    onChange={onChangeCheckbox}
                  />
                  <label htmlFor={p}>{model[p].text}</label>
                </div>
              );
            default:
              return (
                <div key={p} className="form-group mb-3">
                  <label htmlFor={p}>{model[p].text}</label>
                  <input
                    type={model[p].type || "text"}
                    id={p}
                    className="form-control"
                    placeholder={model[p].value}
                    value={item[p] || ""}
                    onChange={onChangeInput}
                  />
                  <div>
                    {model[p].text}:{item[p]}
                  </div>
                </div>
              );
          }
        } else {
          return null;
        }
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
      <form onSubmit={handleSubmit}>
        {renderElements}

        <button
          className="btn btn-primary"
          type="submit"
          disabled={disableSubmit}
        >
          {submitText}
        </button>

        <Link className="btn btn-primary" to="../">
          Cancelar
        </Link>
      </form>
    </>
  );
}
