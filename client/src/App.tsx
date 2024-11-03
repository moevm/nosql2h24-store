import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShowDialog from './components/showDialog';
import PersonalAccount from './pages/PersonalAccountPage';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyCellsPage from './pages/MyCellsPage';
import RentCellPage from './pages/RentCellPage';
import HelpPage from './pages/HelpPage';
import AllCellsPage from './pages/AllCellsPage';
import AllUsersPage from './pages/AllUsersPage';
import UserPage from './pages/UserPage';
import AllEventsPage from './pages/AllEventsPage';
import EventPage from './pages/EventPage';

function App() {
    return (
        <BrowserRouter>
        <header>
            <Link to="/personalAccount">ЛК</Link>
            <Link to="/allUsers">Страница пользователей</Link>
        </header>
            <Routes>
                <Route path="/personalAccount" element={<PersonalAccount />}></Route>
                <Route path="/myCells" element={<MyCellsPage />}></Route>
                <Route path="/bookCell" element={<RentCellPage />}></Route>
                <Route path="/help" element={<HelpPage />}></Route>
                <Route path="/allCells" element={<AllCellsPage />}></Route>
                <Route path="/allUsers" element={<AllUsersPage />}></Route>
                <Route path="/user" element={<UserPage />}></Route>
                <Route path="/allEvents" element={<AllEventsPage />}></Route>
                <Route path="/event" element={<EventPage />}></Route>
            </Routes>
        </BrowserRouter>

    );
}

export default App;
