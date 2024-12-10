import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "../css/PersonalAccount.css";

export default function PersonalAccount() {
  return (
    <div className="personalAccountContainer">
      <div className="personalAccountBody">
        <h1 className="personalAccountTitle">Личный кабинет</h1>
        <ul className="personalAccountList">
          <li>
            <a className="personalAccountItem" href="/myCells">
              Мои ячейки
            </a>
          </li>
          <li>
            <a className="personalAccountItem" href="/rentCell">
              Арендовать ячейку
            </a>
          </li>
          <li>
            <a className="personalAccountItem" href="/help">
              Служба поддержки
            </a>
          </li>
          <li>
            <a className="personalAccountItem" href="/allCells">
              Все ячейки
            </a>
          </li>
          <li>
            <a className="personalAccountItem" href="/allEvents">
              Все события
            </a>
          </li>
          <li>
            <a className="personalAccountItem" href="/allUsers">
              Все пользователи
            </a>
          </li>
          <li>
            <a className="personalAccountItem" href="/allWarehouses">
              Все склады
            </a>
          </li>
          <li>
            <a className="personalAccountItem" href="/auth">
              Выход
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
