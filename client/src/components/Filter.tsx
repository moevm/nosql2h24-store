import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./Filter.css";

export default function Filter(props: { handleSend: any; obj: any }) {
  const [state, setState] = useState(props.obj);

  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    props.handleSend(formDataObj);
  }
  const filters = [];
  for (let key in props.obj) {
    filters.push(
      <>
        <InputGroup.Text id="basic-addon1">
          {props.obj[key].name}
        </InputGroup.Text>
        {props.obj[key].type == "b" && <InputGroup.Checkbox name={key} />}
        {props.obj[key].type == "s" && (
          <Form.Control placeholder={props.obj[key].name} name={key} />
        )}
        {props.obj[key].type == "d" && (
          <Form.Control
            type="datet"
            placeholder={props.obj[key].name}
            name={key}
          />
        )}
        {props.obj[key].type == "dt" && (
          <Form.Control
            type="datetime-local"
            placeholder={props.obj[key].name}
            name={key}
          />
        )}
        {props.obj[key].type == "n" && (
          <Form.Control
            type="number"
            placeholder={props.obj[key].name}
            name={key}
          />
        )}
        {props.obj[key].type == "nf" && (
          <Form.Control
            type="number"
            step={0.1}
            placeholder={props.obj[key].name}
            name={key}
          />
        )}
        {props.obj[key].type == "l" && (
          <Form.Control
            placeholder={props.obj[key].name}
            name={key}
            pattern="[0-9,]+"
          />
        )}
      </>
    );
  }
  return (
    <div className="filterContainer">
      <form className="filterContainer" onSubmit={handleSubmit}>
        <InputGroup className="filterInput">{filters}</InputGroup>
        <button className="button" type="submit">
          Поиск
        </button>
      </form>
    </div>
  );
}

// {
//     data: "Дата",
//     FIO: "Фамилия Имя Отчество"
// }
