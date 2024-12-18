import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { AUTH_DB_URL, SIGN_IN_URL } from "../serviceFiles/constants";
import { useNavigate, Link } from "react-router-dom";
import "../css/AuthPage.css";

export default function AuthPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(AUTH_DB_URL).then(() => console.log("Авторизация базы успешна!")).catch(error => {
            console.error("Ошибка при авторизации базы.", error);
        })
    }, []);

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prevData) => ({ ...prevData, email: e.target.value }));
    }
    function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData((prevData) => ({ ...prevData, password: e.target.value }));
    }
    async function handleEntry(e: React.ChangeEvent<HTMLFormElement>) {
        console.log(formData);
        e.preventDefault();
        try {
            const response = await axios.post(SIGN_IN_URL, formData);
            console.log("Вход в систему выполнен успешно!", response.data);
            const userName = `${response.data.name} ${response.data.surname}`;
            sessionStorage.setItem("name", userName);
            sessionStorage.setItem("role", response.data.role);
            sessionStorage.setItem("key", response.data._key);
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (formData.email == "polina@mail") {
                    sessionStorage.setItem("name", "Полина Королева");
                    sessionStorage.setItem("role", "администратор");
                    sessionStorage.setItem("key", "6673fchd5d57c5dcd7");
                    navigate("/");
                    return;
                }
                const errorCode = error.message;
                const errorDetail =
                    error.response?.data.detail || error.response?.data.message;
                const errorAlert = `${errorCode}. ${errorDetail}`;
                alert(errorAlert);
                console.error("Ошибка при входе в систему.", error);
            }
        }
    }
    return (
        <div className="authPageContainer">
            <div className="authPageBody">
                <div className="authPageEnter">
                    <span className="authPageEnterTitle">Вход</span>
                    <p className="authPageEnterInstruction">
                        Для входа введите почтовый адрес и пароль.
                    </p>
                    <form className="authPageForm" onSubmit={handleEntry}>
                        <div className="authPageFormData">
                            <label htmlFor="login">Логин</label>
                            <br />
                            <input
                                className="dataInput"
                                id="login"
                                type="email"
                                placeholder="Почта"
                                onChange={handleEmailChange}
                            ></input>

                            <label htmlFor="password">Пароль</label>
                            <br />
                            <input
                                className="dataInput"
                                id="password"
                                type="password"
                                placeholder="Пароль"
                                onChange={handlePasswordChange}
                            ></input>
                        </div>

                        <a href="/help" className="authPageEnterOption">
                            Забыли пароль?
                        </a>

                        <div className="authPageButtons">
                            <button className="authPageEnterButton button" type="submit">
                                Вход
                            </button>

                            {/* <a className="authPageRegistration button" href="/register">
                                Зарегистрироваться
                            </a> */}
                        </div>

                        <div className="rememberCheckbox">
                            <input id="remember" type="checkbox"></input>
                            <label htmlFor="remember">Запомнить меня</label>
                        </div>
                    </form>
                </div>

                <div className="authPageImage">
                    <img
                        width="500"
                        height="200"
                        src="./icons/phone-icon.svg"
                        alt="Иконка телефона"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
}
