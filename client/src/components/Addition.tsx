import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

export default function Addition(props: { handleSend: any, obj: any, listKeys: string[], default: any }) {
    const [state, setState] = useState(props.obj);
    const [show, setShow] = useState(false);

    function handleShow() {
        setShow(true);
    }

    function handleClose() {
        setShow(false);
    }

    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        props.handleSend(formDataObj);
        setShow(false);
    }
    const data = [];
    for (let key in props.obj) {
        if (!props.obj[key].noNeedAddition) {
            data.push(
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                        {props.obj[key].name}
                    </InputGroup.Text>
                    {props.obj[key].type == "b" && <InputGroup.Checkbox name={key} />}
                    {props.obj[key].type == "s" && (
                        <Form.Control placeholder={props.obj[key].name} name={key} />
                    )}
                    {props.obj[key].type == "d" && (
                        <Form.Control
                            type="date"
                            placeholder={props.obj[key].name}
                            name={key}
                        />
                    )}
                    {props.obj[key].type == "n" && (
                        <Form.Control
                            type="number"
                            placeholder={props.obj[key].name}
                            name={key}
                            min={props.default['start'+key]}
                            max={props.default['end'+key]}
                        />
                    )}
                    {props.obj[key].type == "nf" && (
                        <Form.Control
                            type="number"
                            step={0.1}
                            placeholder={props.obj[key].name}
                            name={key}
                            min={props.default['start'+key]}
                            max={props.default['end'+key]}
                        />
                    )}
                    {props.obj[key].type == "l" && (
                        <Form.Control
                            placeholder={props.obj[key].name}
                            name={key}
                            pattern="[0-9,]+"
                        />
                    )}
                    {props.obj[key].type == "select_const" && <Form.Select name={key}>{props.obj[key].options.map((role: string)=>{if (role[0]) return <option value={role[0]}>{role[1]}</option>})}</Form.Select>}
                    {props.obj[key].type == "select_dynamic" && <Form.Select name={key}>{props.listKeys.map((warehouseKey: string)=><option value={warehouseKey}>{warehouseKey}</option>)}</Form.Select>}
                </InputGroup>
            );
        }
    }
    return (
        <>
            <button className="button" onClick={handleShow}>
                Добавить элемент
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление нового элемента</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        {data}
                        <button className="button" type="submit">
                            Добавить
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

// {
//     data: "Дата",
//     FIO: "Фамилия Имя Отчество"
// }
