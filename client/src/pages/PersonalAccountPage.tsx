import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyCellsPage from './MyCellsPage';
import BookCellPage from './BookCellPage';
import HelpPage from './HelpPage';


export default function PersonalAccount() {
    return (<div>
        PersonalPage
        <nav>
        <Link to="/myCells">Мои ячейки</Link>
        <Link to="/bookCell">Арендовать ячейку</Link>
        <Link to="/help">Поддержка</Link>
        </nav>
    </div>)
}