import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyCellsPage from './manyEntity/MyCellsPage';
import BookCellPage from './manyEntity/RentCellPage';
import HelpPage from './HelpPage';
import { ListGroup } from 'react-bootstrap';


export default function PersonalAccount() {
    return (<div>
        PersonalPage
        <ListGroup>
            <ListGroup.Item> 
                <Link to="/myCells">Мои ячейки</Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link to="/rentCell">Арендовать ячейку</Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link to="/help">Поддержка</Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link to="/allCells">Все ячейки</Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link to="/allEvents">Все события</Link>
            </ListGroup.Item>
            <ListGroup.Item>
            <Link to="/allUsers">Все пользователи</Link>
            </ListGroup.Item>
            <ListGroup.Item>
            <Link to="/allWarehouses">Все склады</Link>
            </ListGroup.Item>
        </ListGroup>
    </div>)
}