import { useEffect, useState } from "react";
import CellsTable from "../../components/CellsTable";
import { cellDefaultFilter, cellsInit, GET_MY_CELLS_URL } from "../../serviceFiles/constants";
import axios from "axios";
import "../../css/MyCellsPage.css";
import { Link } from "react-router-dom";
import { ReactComponent as CellIcon } from "../../css/cell-icon.svg";
import { Cell, cellFields, cellMyFields } from "../../serviceFiles/types";
import Filter from "../../components/Filter";
import { Pagination } from "react-bootstrap";

export default function MyCellsPage() {
    const [cells, setCells] = useState(cellsInit);
    const [filters, setFilters] = useState(cellDefaultFilter);
    const [countPages, setCountPages] =  useState(3);
    const [curPage, setCurPage] =  useState(0);
    useEffect(() => {
        let key = sessionStorage.getItem("key");
        console.log("отправлен запрос на получение ячеек, с параметрами:", filters);
        axios
            .post(GET_MY_CELLS_URL, {...filters, userKey: key, page: curPage})
            .then((response) => {
                console.log(response);
                setCells(response.data.cells);
                setCountPages(response.data.count);
            })
            .catch((error) => {
                console.error(
                    "Ошибка при получении ячеек пользователя. Взяты дефолтные ячейки",
                    error
                );
                setCells(cellsInit);
            });
    }, [filters, curPage]);

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

    function handlePageChange(i: number){
        setCurPage(i)
    }
    const paginationList = []
    for(let i = 0; i<countPages; i++){
        paginationList.push(<Pagination.Item key={i} active={i===curPage} onClick={()=>handlePageChange(i)}>{i+1}</Pagination.Item>)
    }
    return (
        <div className="myCellsPageContainer">
            <h1 className="myCellsPageTitle">Мои ячейки</h1>

            <Filter handleSend={handleSendFilters} obj={cellMyFields} default={cellDefaultFilter}></Filter>

            <CellsTable
                isForRent={false}
                isForAdmin={false}
                cells={cells}
            ></CellsTable>

            <Pagination>
                <Pagination.First/>
                {paginationList}
                <Pagination.Last/>
            </Pagination>
        </div>
    );
}
