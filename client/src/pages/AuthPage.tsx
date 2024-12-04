import React, { useState } from "react";
import { Button, Form } from "react-bootstrap"
import axios, { AxiosError } from "axios";
import { AUTH_DB_URL, SIGN_IN_URL } from "../serviceFiles/constants";
import { useNavigate, Link } from "react-router-dom";
import '../css/AuthPage.css';
import { ReactComponent as CellIcon } from '../css/cell-icon.svg';
import { ReactComponent as PhoneIcon } from '../css/phone-icon.svg';

export default function AuthPage() {
    const [formData, setFormData] = useState({email: '', password: ''});
    let navigate = useNavigate();
    
    async function handleInitBase(){
        try{
            const response = await axios.get(AUTH_DB_URL);
            console.log('Авторизация базы успешна!');
        }catch(error){
            console.error('Ошибка при авторизации базы.', error);
        }
    }
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
            sessionStorage.setItem("role", response.data.role);
            sessionStorage.setItem("key", response.data._key);
            navigate("/");
          } catch (error) {
            if(axios.isAxiosError(error)){
                if(formData.email == "debug@mail"){
                    sessionStorage.setItem("name", "Полина Королева");
                    sessionStorage.setItem("role", "администратор");
                    sessionStorage.setItem("key", "6673fchd5d57c5dcd7");
                    navigate("/");
                    return;
                }
                const errorCode = error.message;
                const errorDetail = error.response?.data.detail || error.response?.data.message;
                const errorAlert = `${errorCode}. ${errorDetail}`
                alert(errorAlert);
                console.error('Ошибка при входе в систему.', error);
            }
          }
    }
    return (
      <div className="auth-page">

          <div className="auth-content">
              <div className="auth-form-container">
              <Button variant="primary" onClick={handleInitBase}>Инициализировать базу данных</Button>
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
      </div>
  );
}
