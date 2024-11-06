import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyCellsPage from './manyEntity/MyCellsPage';
import BookCellPage from './manyEntity/RentCellPage';
import HelpPage from './HelpPage';


export default function PersonalAccount() {
    return (<div>
        PersonalPage
        <ul className="list-group">
            <li className="list-group-item"> 
                {/* сам линк сделать элементом списка, а не вложенным */}
                <Link to="/myCells">Мои ячейки</Link>
            </li>
            <li className="list-group-item">
                <Link to="/rentCell">Арендовать ячейку</Link>
            </li>
            <li className="list-group-item">
                <Link to="/help">Поддержка</Link>
            </li>
            <li className="list-group-item">
                <Link to="/allCells">Все ячейки</Link>
            </li>
            <li className="list-group-item">
                <Link to="/allEvents">Все события</Link>
            </li>
        </ul>
    </div>)
}