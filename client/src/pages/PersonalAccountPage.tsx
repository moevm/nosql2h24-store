import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "../css/PersonalAccount.css";
import ImportExport from "../components/ImportExport";

export default function PersonalAccount() {
    let role = sessionStorage.getItem("role");
    return (
        <div className="personalAccountContainer">
            <div className="personalAccountBody">
                <h1 className="personalAccountTitle">Личный кабинет</h1>
                <ul className="personalAccountList">
                    <li className="personalAccountItem">
                        <a href="/myCells">Мои ячейки</a>
                    </li>
                    <li className="personalAccountItem">
                        <a href="/rentCell">Арендовать ячейку</a>
                    </li>
                    <li className="personalAccountItem">
                        <a href="/help">Служба поддержки</a>
                    </li>
                    {["administrator", "employee"].includes(role!) &&
                    <li className="personalAccountItem">
                        <a href="/allCells">Все ячейки</a>
                    </li>}
                    {["administrator"].includes(role!) &&
                    <li className="personalAccountItem">
                        <a href="/allEvents">Все события</a>
                    </li>}
                    {["administrator"].includes(role!) &&
                    <li className="personalAccountItem">
                        <a href="/allUsers">Все пользователи</a>
                    </li>}
                    {["administrator"].includes(role!) &&
                    <li className="personalAccountItem">
                        <a href="/allWarehouses">Все склады</a>
                    </li>}
                    {["administrator"].includes(role!) &&
                    <li className="personalAccountItem">
                        <ImportExport />
                    </li>}
                    {["administrator", "director", "lord"].includes(role!) &&
                    <li className="personalAccountItem">
                        <a href="/statistic">Статистика</a>
                    </li>}
                    <li className="personalAccountItem">
                        <a href="/auth">Выход</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
