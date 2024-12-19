import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { AUTH_DB_URL, POST_NEW_USER_URL, SIGN_IN_URL } from "../serviceFiles/constants";
import { useNavigate, Link } from "react-router-dom";
import "../css/AuthPage.css";

export default function RegistrationPage() {
    let navigate = useNavigate();

    async function handleReg(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = Object.fromEntries(formData.entries());
        formDataObj.role = "client";
        console.log(formDataObj);
        const response = await axios.post(POST_NEW_USER_URL, formDataObj);
        console.log("Авторизация в системе выполнена успешно!", response.data);
        sessionStorage.setItem("name", response.data.nameSurnamePatronymic);
        sessionStorage.setItem("role", response.data.role);
        sessionStorage.setItem("key", response.data._key);
        navigate("/");
    }

    return (<div className="authPageContainer">
        <div className="authPageBody">
            <div className="authPageEnter">
                <span className="authPageEnterTitle">Регистрация</span>
                <p className="authPageEnterInstruction">
                    Для регистрации введите почтовый адрес, дату рождения и пароль.
                </p>
                <form className="authPageForm" onSubmit={handleReg}>
                    <div className="authPageFormData">

                        <label htmlFor="login">ФИО</label>
                        <br />
                        <input
                            className="dataInput"
                            placeholder="Фамилия Имя Отчество"
                            name="nameSurnamePatronymic"
                        ></input>
                        <label htmlFor="login">Почта</label>
                        <br />
                        <input
                            className="dataInput"
                            id="login"
                            type="email"
                            placeholder="Почта"
                            name="login"
                        ></input>
                        <label htmlFor="date">День рождения</label>
                        <br />
                        <input
                            className="dataInput"
                            id="date"
                            type="date"
                            placeholder="Пароль"
                            name="birthday"
                        ></input>
                        <label htmlFor="password">Пароль</label>
                        <br />
                        <input
                            className="dataInput"
                            id="password"
                            type="password"
                            placeholder="Пароль"
                            name="password"
                        ></input>
                    </div>

                    <div className="authPageButtons">
                        <button className="authPageEnterButton button" type="submit">
                            Зарегистрироваться
                        </button>
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
    )
}