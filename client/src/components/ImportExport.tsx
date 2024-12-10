import axios from "axios";
import { useState } from "react";
import { Button, Form, InputGroup, Modal, Tab, Tabs } from "react-bootstrap";
import { EXPORT_URL, IMPORT_URL } from "../serviceFiles/constants";
import "../index.css";

export default function ImportExport() {
  const [state, setState] = useState();
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function handleImport(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    axios
      .post(IMPORT_URL, formDataObj)
      .then(() => {
        alert("Импорт успешен");
      })
      .catch((error) => {
        alert("Ошибка при импорте");
        console.error("Ошибка при импорте", error);
      });
    setShow(false);
  }

  function handleExport() {
    axios
      .get(EXPORT_URL)
      .then((response) => {
        const blob = new Blob([JSON.stringify(response.data)], {
          type: "text/json",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `dataStore.json`;
        link.click();
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        alert("Ошибка при экспорте'");
        console.error("Ошибка при экспорте", error);
      });
    setShow(false);
  }

  return (
    <>
      <button className="button" onClick={handleShow}>
        Импорт/Экспорт данных
      </button>
      <Modal show={show} onHide={handleClose}>
        <Tabs
          defaultActiveKey="import"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="import" title="Импорт">
            <Modal.Header closeButton>
              <Modal.Title>Импорт данных</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleImport}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>
                    Выберите файл, содержащий данные для всего приложения.
                  </Form.Label>
                  <Form.Control name="file" type="file" />
                </Form.Group>
                <Button type="submit">Импортировать</Button>
              </Form>
            </Modal.Body>
          </Tab>
          <Tab eventKey="export" title="Экспорт">
            <Modal.Header closeButton>
              <Modal.Title>Экспорт данных</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p> Будут скачены все данные приложения.</p>
              <Button onClick={handleExport}>Скачать</Button>
            </Modal.Body>
          </Tab>
        </Tabs>
      </Modal>
    </>
  );
}
