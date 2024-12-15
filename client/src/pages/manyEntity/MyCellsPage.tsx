import { useEffect, useState } from "react";
import CellsTable from "../../components/CellsTable";
import { cellDefaultFilter, cellsInit, GET_MY_CELLS_URL } from "../../serviceFiles/constants";
import axios from "axios";
import "../../css/MyCellsPage.css";
import { Link } from "react-router-dom";
import { ReactComponent as CellIcon } from "../../css/cell-icon.svg";
import { Cell, cellFields } from "../../serviceFiles/types";
import Filter from "../../components/Filter";

export default function MyCellsPage() {
    const [cells, setCells] = useState(cellsInit);
    const [filters, setFilters] = useState(cellDefaultFilter);
    useEffect(() => {
        console.log("отправлен запрос на получение ячеек, с параметрами:", filters);
        axios
            .post(GET_MY_CELLS_URL, filters)
            .then((response) => {
                console.log(response);
                setCells(response.data);
            })
            .catch((error) => {
                console.error(
                    "Ошибка при получении ячеек пользователя. Взяты дефолтные ячейки",
                    error
                );
                setCells(cellsInit);
            });
    }, [filters]);

    function handleSendFilters(obj: any) {
        console.log("Получен объект в MyCellsPage (filters)", obj);
        obj.startcellNum = obj.startcellNum ? parseInt(obj.startcellNum) : cellDefaultFilter.startcellNum;
        obj.endcellNum = obj.endcellNum ? parseInt(obj.endcellNum) : cellDefaultFilter.endcellNum; // => < 20
        obj.starttierNum = obj.starttierNum ? parseInt(obj.starttierNum) : cellDefaultFilter.starttierNum;
        obj.endtierNum = obj.endtierNum ? parseInt(obj.endtierNum) : cellDefaultFilter.endtierNum;  // => < 6
        obj.isFree = obj.isFree ? true : false; //cellDefaultFilter.isFree;
        obj.needService = obj.needService ? true : false; //cellDefaultFilter.needService;
        obj.startsize = obj.startsize ? parseFloat(obj.startsize) : cellDefaultFilter.startsize;
        obj.endsize = obj.endsize ? parseFloat(obj.endsize) : cellDefaultFilter.endsize;   // => < 2.1
        obj.starttariffPerDay = obj.starttariffPerDay ? parseInt(obj.starttariffPerDay) : cellDefaultFilter.starttariffPerDay;
        obj.endtariffPerDay = obj.endtariffPerDay ? parseInt(obj.endtariffPerDay) : cellDefaultFilter.endtariffPerDay;
        obj.startendOfRent = obj.startendOfRent || cellDefaultFilter.startendOfRent;
        obj.endendOfRent = obj.endendOfRent || cellDefaultFilter.endendOfRent;
        console.log("Преобразовано (filters)", obj);
        setFilters(obj);
    }

    return (
        <div className="myCellsPageContainer">
            <h1 className="myCellsPageTitle">Мои ячейки</h1>

            <Filter handleSend={handleSendFilters} obj={cellFields}></Filter>

            <CellsTable
                isForRent={false}
                isForAdmin={false}
                cells={cells}
            ></CellsTable>

            <div className="myCellsPagePagination">
                <button className="paginationButton">Назад</button>
                <button className="paginationButton">1</button>
                <button className="paginationButton">2</button>
                <button className="paginationButton">3</button>
                <button className="paginationButton">Вперед</button>
            </div>
        </div>
    );
}
