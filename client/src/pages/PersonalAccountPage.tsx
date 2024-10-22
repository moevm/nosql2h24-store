import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


export default function PersonalAccount() {
    return (<>
        PersonalPage
        <BrowserRouter>
            <Link to="/myCells">Мои ячейки</Link>
            <Link to="/bookCell">Арендовать ячейку</Link>
            <Link to="/help">Темы</Link>
            <Routes>
                <Route path="/myCells" element={<MyCellsPage/>}></Route>
                <Route path="/bookCell" element={<BookCellPage/>}></Route>
                <Route exact path="/help" element={<HelpPage />}></Route>
            </Routes>
        </BrowserRouter>
    </>)
}