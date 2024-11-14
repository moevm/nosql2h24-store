import React, { useEffect } from 'react';
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
import MainComponentPage from './pages/MainComponentPage';
import { ReactComponent as CellIcon } from './css/cell-icon.svg';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthPage />}></Route>
                <Route path="/*" element={<MainComponentPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
