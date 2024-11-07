import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyCellsPage from './manyEntity/MyCellsPage';
import BookCellPage from './manyEntity/RentCellPage';
import HelpPage from './HelpPage';
import { ListGroup } from 'react-bootstrap';
import '../css/PersonalAccount.css'; 
import { ReactComponent as CellIcon } from '../css/cell-icon.svg';

export default function PersonalAccount() {
    return (
        <div className="personal-account">
            <header className="header">
                <div className="logo-container">
                    <CellIcon className="cell-icon" />
                    <span className="logo-text">Ячейка.ру</span>
                </div>
                <nav className="header-nav">
                    <Link to="/personalAccount">Личный кабинет</Link>
                    <span className="divider">|</span>  
                    <Link to="/help">Контакты</Link>
                </nav>
            </header>

            <main className="main-content">
                <h1>Личный кабинет</h1>
                <ul className="menu-list">
                    <li><Link to="/myCells">Мои ячейки</Link></li>
                    <li><Link to="/rentCell">Арендовать ячейку</Link></li>
                    <li><Link to="/help">Служба поддержки</Link></li>
                    <li><Link to="/">Выход</Link></li>
                </ul>
            </main>

            <footer className="footer">
                <address>
                    Улица Торжковская 1Б, Санкт-Петербург, Россия<br />
                    © 2024 Ячейка.ру
                </address>
            </footer>
        </div>
    );
}
