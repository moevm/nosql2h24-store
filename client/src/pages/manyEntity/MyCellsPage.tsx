import { useEffect, useState } from "react";
import CellsTable from "../../components/CellsTable";
import { cellsInit, GET_MY_CELLS_URL } from "../../serviceFiles/constants";
import axios from "axios";
import "../../css/MyCellsPage.css";
import { Link } from "react-router-dom";
import { ReactComponent as CellIcon } from '../../css/cell-icon.svg';
import { Cell, cellFields } from "../../serviceFiles/types";
import Filter from "../../components/Filter";

export default function MyCellsPage() {
    const [cells, setCells] = useState(cellsInit);
    const [filters, setFilters] = useState({});
    useEffect(() => {
        axios.get(GET_MY_CELLS_URL, {params: filters}).then(response => { console.log(response); setCells(response.data); }).catch(error => {
            console.error('Ошибка при получении ячеек пользователя. Взяты дефолтные ячейки', error);
            setCells(cellsInit);
        });
    }, [])
    function handleSendFilters(obj: Cell){
        console.log("Получен объект в MyCellsPage (filters)", obj);
        setFilters(obj)
    }

    return (
        <div className="my-cells-page">

            <main className="main">
                <h1 className="page-title">Мои ячейки</h1>
                
                <Filter handleSend={handleSendFilters} obj={cellFields}></Filter>

                <CellsTable isForRent={false} isForAdmin={false} cells={cells} ></CellsTable>

                <div className="pagination">
                    <button className="pagination-button">Назад</button>
                    <button className="pagination-button">1</button>
                    <button className="pagination-button">2</button>
                    <button className="pagination-button">3</button>
                    <button className="pagination-button">Вперед</button>
                </div>
            </main>
        </div>
    );
}
