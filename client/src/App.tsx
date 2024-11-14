import React from 'react';
import logo from './logo.svg';
import './App.css';
import PersonalAccount from './pages/PersonalAccountPage';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyCellsPage from './pages/manyEntity/MyCellsPage';
import RentCellPage from './pages/manyEntity/RentCellPage';
import HelpPage from './pages/HelpPage';
import AllCellsPage from './pages/manyEntity/AllCellsPage';
import AllUsersPage from './pages/manyEntity/AllUsersPage';
import UserPage from './pages/oneEntity/UserPage';
import AllEventsPage from './pages/manyEntity/AllEventsPage';
import EventPage from './pages/oneEntity/EventPage';
import PaymentPage from './pages/PaymentPage';
import AuthPage from './pages/AuthPage';
import AllWarehousesPage from './pages/manyEntity/AllWarehousesPage';
import WarehousePage from './pages/oneEntity/WarehousePage';
import CellPage from './pages/oneEntity/CellPage';
import { ReactComponent as CellIcon } from './css/cell-icon.svg';

function App() {
    return (
        <BrowserRouter>
        <header className="header">
              <div className="logo-container">
                  <CellIcon className="cell-icon" />
                  <span className="logo-text">Ячейка.ру</span>
              </div>
              <nav className="header-nav">
                  <Link to="/help">Контакты</Link>
              </nav>
              <nav className="header-nav">
                    <Link to="/personalAccount">Личный кабинет</Link>
                </nav>
          </header>
            <Routes>
            <Route path="/" element={<AuthPage />}></Route>
                <Route path="/personalAccount" element={<PersonalAccount />}></Route>
                <Route path="/myCells" element={<MyCellsPage />}></Route>
                <Route path="/rentCell" element={<RentCellPage />}></Route>
                <Route path="/help" element={<HelpPage />}></Route>
                <Route path="/allCells" element={<AllCellsPage />}></Route>
                <Route path="/cell" element={<CellPage />}></Route>
                <Route path="/allUsers" element={<AllUsersPage />}></Route>
                <Route path="/user" element={<UserPage />}></Route>
                <Route path="/allEvents" element={<AllEventsPage />}></Route>
                <Route path="/event" element={<EventPage />}></Route>
                <Route path="/paymentCell" element={<PaymentPage />}></Route>
                <Route path="/allWarehouses" element={<AllWarehousesPage />}></Route>
                <Route path="/warehouse" element={<WarehousePage/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
