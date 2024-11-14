import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyCellsPage from './manyEntity/MyCellsPage';
import BookCellPage from './manyEntity/RentCellPage';
import HelpPage from './HelpPage';
import { ListGroup } from 'react-bootstrap';
import '../css/PersonalAccount.css'; 
import { ReactComponent as CellIcon } from '../css/cell-icon.svg';
import { ReactComponent as BackIcon } from '../css/back-icon.svg';

export default function PersonalAccount() {
    return (
        <div className="personal-account">

            <main className="main-content">
                <h1>Личный кабинет</h1>
                <ul className="menu-list">
                    <li><Link to="/myCells">Мои ячейки</Link></li>
                    <li><Link to="/rentCell">Арендовать ячейку</Link></li>
                    <li><Link to="/help">Служба поддержки</Link></li>
                    <li><Link to="/allCells">Все ячейки</Link></li>
                    <li><Link to="/allEvents">Все события</Link></li>
                    <li><Link to="/allUsers">Все пользователи</Link></li>
                    <li><Link to="/allWarehouses">Все склады</Link></li>
                    <li><Link to="/auth">Выход</Link></li>
                </ul>
            </main>
        </div>
    );
}
