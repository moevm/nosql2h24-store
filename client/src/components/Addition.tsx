import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

export default function Addition<Type>(props: { handleSend: any, obj: any }) {
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
    const data = []
    for (let key in props.obj) {
        data.push(
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">{props.obj[key].name}</InputGroup.Text>
                {props.obj[key].type == "b" && <InputGroup.Checkbox name={key} />}
                {
                    props.obj[key].type == "s" && <Form.Control
                        placeholder={props.obj[key].name} name={key}
                    />
                }
                {
                    props.obj[key].type == "d" && <Form.Control
                        placeholder={props.obj[key].name} name={key}
                    />
                }

            </InputGroup>
        )

    }
    return (
        <>
            <Button onClick={handleShow}>Добавить элемент</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление нового элемента</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {data}
                        <Button type="submit">
                            Добавить
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )

}

// {
//     data: "Дата",
//     FIO: "Фамилия Имя Отчество"
// }