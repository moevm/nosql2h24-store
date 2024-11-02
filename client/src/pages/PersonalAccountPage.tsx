import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyCellsPage from './MyCellsPage';
import BookCellPage from './RentCellPage';
import HelpPage from './HelpPage';
import { List, ListItemButton } from '@mui/material';
import ListItem from '@mui/material';


export default function PersonalAccount() {
    return (<div>
        PersonalPage
        <nav>
            <ListItemButton>
                <Link to="/myCells">Мои ячейки</Link>
            </ListItemButton>
            <ListItemButton>
                <Link to="/bookCell">Арендовать ячейку</Link>
            </ListItemButton>
            <ListItemButton>
                <Link to="/help">Поддержка</Link>
            </ListItemButton>
        </nav>
    </div>)
}