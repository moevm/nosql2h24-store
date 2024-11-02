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
import EventsPage from './pages/EventsPage';

function App() {
    return (
        <BrowserRouter>
            <Link to="/personalAccount">ЛК</Link>
            <Link to="/allUsers">Страница пользователей</Link>
            <Routes>
                <Route path="/personalAccount" element={<PersonalAccount />}></Route>
                <Route path="/myCells" element={<MyCellsPage />}></Route>
                <Route path="/bookCell" element={<RentCellPage />}></Route>
                <Route path="/help" element={<HelpPage />}></Route>
                <Route path="/allCells" element={<AllCellsPage />}></Route>
                <Route path="/allUsers" element={<AllUsersPage />}></Route>
                <Route path="/user" element={<UserPage />}></Route>
                <Route path="/events" element={<EventsPage />}></Route>
            </Routes>
        </BrowserRouter>

    );
}

export default App;
