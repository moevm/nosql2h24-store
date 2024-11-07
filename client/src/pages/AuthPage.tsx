import React, { useState } from "react";
import { Button, Form } from "react-bootstrap"
import axios, { AxiosError } from "axios";
import { SIGN_IN_URL } from "../serviceFiles/constants";
import { useNavigate } from "react-router-dom";

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
    return (<div>
        <h2>Вход</h2>
        <Form onSubmit={handleEntry}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Логин</Form.Label>
                <Form.Control type="email" placeholder="Почта" onChange={handleEmailChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Пароль" onChange={handlePasswordChange}/>
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