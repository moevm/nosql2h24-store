import { useEffect, useState } from "react";
import CellsTable from "../../components/CellsTable";
import { cellsInit, GET_MY_CELLS_URL } from "../../serviceFiles/constants";
import axios from "axios";
import "../../css/MyCellsPage.css";
import { Link } from "react-router-dom";
import { ReactComponent as CellIcon } from '../../css/cell-icon.svg';

export default function MyCellsPage() {
    const [cells, setCells] = useState(cellsInit);
    const [filters, setFilters] = useState({});
    useEffect(() => {
        axios.get(GET_MY_CELLS_URL, {params: filters}).then(response => { setCells(response.data) }).catch(error => {
            console.error('Ошибка при получении ячеек пользователя. Взяты дефолтные ячейки', error);
            setCells(cellsInit);
        });
    })

    return (
        <div className="my-cells-page">
            <header className="header">
                <div className="logo-container">
                    <CellIcon className="cell-icon" />
                    <span className="logo-text">Ячейка.ру</span>
                </div>
                <nav className="header-nav">
                    <Link to="/personalAccount">Личный кабинет</Link>
                </nav>
            </header>

            <main className="main">
                <h1 className="page-title">Мои ячейки</h1>
                
                <div className="filter-section">
                    <input type="text" placeholder="Search..." className="search-input" />
                    <button className="filter-button">Фильтр</button>
                </div>

                <CellsTable isForRent={false} isForAdmin={false} cells={cells} ></CellsTable>

                <div className="pagination">
                    <button className="pagination-button">Назад</button>
                    <button className="pagination-button">1</button>
                    <button className="pagination-button">2</button>
                    <button className="pagination-button">3</button>
                    <button className="pagination-button">Вперед</button>
                </div>
            </main>

            <footer className="footer">
                <p>Улица Торжковская 15, Санкт-Петербург, Россия</p>
                <p>© 2024 Ячейка.ру.</p>
            </footer>
        </div>
    );
}
