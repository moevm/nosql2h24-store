import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

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
    <>
      <form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">{filters}</InputGroup>
        <Button type="submit">Поиск</Button>
      </form>
    </>
  );
}

// {
//     data: "Дата",
//     FIO: "Фамилия Имя Отчество"
// }
