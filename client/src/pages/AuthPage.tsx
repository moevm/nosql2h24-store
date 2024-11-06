import { Button, Form } from "react-bootstrap"

export default function AuthPage() {
    return (<div>
        <h2>Вход</h2>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Логин</Form.Label>
        <Form.Control type="email" placeholder="Логин" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Пароль" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Запомнить меня" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Вход
      </Button>
    </Form>
    </div>)
}