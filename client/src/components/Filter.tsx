import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

export default function Filter<Type>(props: { handleSend: any, obj: any }) {
    const [state, setState] = useState(props.obj);
    const filters = []
    for (let key in props.obj) {
        filters.push(
            <>
                <InputGroup.Text id="basic-addon1">{props.obj[key].name}</InputGroup.Text>
                {props.obj[key].type == "b" && <InputGroup.Checkbox/>}
                {props.obj[key].type == "s" && <Form.Control
                    placeholder={props.obj[key].name}
                />}
                {props.obj[key].type == "d" && <Form.Control
                    placeholder={props.obj[key].name}
                />}

            </>
        )

    }
    return (<>
        <InputGroup className="mb-3">
            {filters}
        </InputGroup>

    </>)

}

// {
//     data: "Дата",
//     FIO: "Фамилия Имя Отчество"
// }