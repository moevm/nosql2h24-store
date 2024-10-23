import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShowDialog from './components/showDialog';
import PersonalAccount from './pages/PersonalAccountPage';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyCellsPage from './pages/MyCellsPage';
import BookCellPage from './pages/BookCellPage';
import HelpPage from './pages/HelpPage';

function App() {
    return (
                <BrowserRouter>
                <Link to="/personalAccount">ЛК</Link>
                    <Routes>
                        <Route path="/personalAccount" element={<PersonalAccount />}></Route>
                        <Route path="/myCells" element={<MyCellsPage />}></Route>
                        <Route path="/bookCell" element={<BookCellPage />}></Route>
                        <Route path="/help" element={<HelpPage />}></Route>
                    </Routes>
                </BrowserRouter>
    );
}

export default App;
