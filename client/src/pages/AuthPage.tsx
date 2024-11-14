import React, { useState } from "react";
import { Button, Form } from "react-bootstrap"
import axios, { AxiosError } from "axios";
import { SIGN_IN_URL } from "../serviceFiles/constants";
import { useNavigate, Link } from "react-router-dom";
import '../css/AuthPage.css';
import { ReactComponent as CellIcon } from '../css/cell-icon.svg';
import { ReactComponent as PhoneIcon } from '../css/phone-icon.svg';

export default function AuthPage() {
    const [formData, setFormData] = useState({email: '', password: ''});
    let navigate = useNavigate();
    
    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>){
        setFormData(prevData => ({...prevData, "email": e.target.value}))
    }
    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>){
        setFormData(prevData => ({...prevData, "password": e.target.value}))
    }
    async function handleEntry(e: React.ChangeEvent<HTMLFormElement>) {
        console.log(formData);
        e.preventDefault();
        try {
            const response = await axios.post(SIGN_IN_URL, formData);
            console.log('Вход в систему выполнен успешно!', response.data);
            const userName = `${response.data.name} ${response.data.surname}`;
            sessionStorage.setItem("name", userName);
            sessionStorage.setItem("position", response.data.position);
            navigate("/personalAccount");
          } catch (error) {
            if(axios.isAxiosError(error)){
                const errorCode = error.message;
                const errorDetail = error.response?.data.detail || error.response?.data.message;
                const errorAlert = `${errorCode}. ${errorDetail}`
                alert(errorAlert);
                console.error('Ошибка при входе в систему.', error);
                navigate("/personalAccount");
            }
          }
    }
    return (
      <div className="auth-page">

          <div className="auth-content">
              <div className="auth-form-container">
                  <h2>Вход</h2>
                  <p>Для входа введите почтовый адрес и пароль.</p>
                  <Form onSubmit={handleEntry}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Логин</Form.Label>
                          <Form.Control type="email" placeholder="Почта" onChange={handleEmailChange}/>
                      </Form.Group>
                      
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Пароль</Form.Label>
                          <Form.Control type="password" placeholder="Пароль" onChange={handlePasswordChange}/>
                      </Form.Group>
                      
                      <div className="auth-options">
                          <Link to="/help" className="forgot-password">Забыли пароль?</Link>
                      </div>

                      <Button variant="primary" type="submit">
                          Вход
                      </Button>

                      <div className="register-link">
                          <Link to="/register">Зарегистрироваться</Link>
                      </div>

                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          <Form.Check type="checkbox" label="Запомнить меня" />
                      </Form.Group>
                  </Form>
              </div>

              <div className="image">
                  <div className="phone-mockup">
                      <PhoneIcon className="phone-icon" />
                      <CellIcon className="cell-icon2" />
                  </div>
              </div>
          </div>

          <footer className="footer">
              <address>
                  Улица Торжковская 15, Санкт-Петербург, Россия<br />
                  © 2024 Ячейка.ру
              </address>
          </footer>
      </div>
  );
}
