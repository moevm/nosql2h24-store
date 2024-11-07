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

function App() {
    return (
        <BrowserRouter>
        <header>
            <Link to="/personalAccount">ЛК</Link>
        </header>
            <Routes>
            <Route path="/" element={<AuthPage />}></Route>
                <Route path="/personalAccount" element={<PersonalAccount />}></Route>
                <Route path="/myCells" element={<MyCellsPage />}></Route>
                <Route path="/rentCell" element={<RentCellPage />}></Route>
                <Route path="/help" element={<HelpPage />}></Route>
                <Route path="/allCells" element={<AllCellsPage />}></Route>
                <Route path="/allUsers" element={<AllUsersPage />}></Route>
                <Route path="/user" element={<UserPage />}></Route>
                <Route path="/allEvents" element={<AllEventsPage />}></Route>
                <Route path="/event" element={<EventPage />}></Route>
                <Route path="/paymentCell" element={<PaymentPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
