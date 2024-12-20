import { useEffect, useState } from "react";
import CellsTable from "../../components/CellsTable";
import { cellDefaultFilter, cellsInit, GET_FREE_CELLS_URL } from "../../serviceFiles/constants";
import axios from "axios";
import { Cell, cellFields, cellRentFields } from "../../serviceFiles/types";
import Filter from "../../components/Filter";
import "../../css/manyEntity/RentCellPage.css";
import { Pagination } from "react-bootstrap";

export default function RentCellPage() {
    const [cells, setCells] = useState(cellsInit);
    const [filters, setFilters] = useState(cellDefaultFilter);
    const [countPages, setCountPages] = useState(3);
    const [curPage, setCurPage] = useState(0);
    useEffect(() => {
        console.log("отправлен запрос на получение ячеек, с параметрами:", filters);
        axios
            .post(GET_FREE_CELLS_URL, {...filters, page: curPage})
            .then((response) => {
                console.log(response);
                setCells(response.data.cells);
                setCountPages(response.data.count);
            })
            .catch((error) => {
                console.error(
                    "Ошибка при получении свободных ячеек. Взяты дефолтные ячейки",
                    error
                );
                setCells(cellsInit);
            });
    }, [filters, curPage]);
    function handleSendFilters(obj: any) {
        console.log("Получен объект в RentCellPage (filters)", obj);
        obj.startcellNum = obj.startcellNum ? parseInt(obj.startcellNum) : cellDefaultFilter.startcellNum;
        obj.endcellNum = obj.endcellNum ? parseInt(obj.endcellNum) : cellDefaultFilter.endcellNum; // => < 20
        obj.starttierNum = obj.starttierNum ? parseInt(obj.starttierNum) : cellDefaultFilter.starttierNum;
        obj.endtierNum = obj.endtierNum ? parseInt(obj.endtierNum) : cellDefaultFilter.endtierNum;  // => < 6
        obj.isFree = true; //cellDefaultFilter.isFree;
        obj.needService = false; //cellDefaultFilter.needService;
        obj.startsize = obj.startsize ? parseFloat(obj.startsize) : cellDefaultFilter.startsize;
        obj.endsize = obj.endsize ? parseFloat(obj.endsize) : cellDefaultFilter.endsize;   // => < 2.1
        obj.starttariffPerDay = obj.starttariffPerDay ? parseInt(obj.starttariffPerDay) : cellDefaultFilter.starttariffPerDay;
        obj.endtariffPerDay = obj.endtariffPerDay ? parseInt(obj.endtariffPerDay) : cellDefaultFilter.endtariffPerDay;
        obj.startendOfRent = cellDefaultFilter.startendOfRent;
        obj.endendOfRent = cellDefaultFilter.endendOfRent;
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
        <div className="rencCellPageContainer">
            <Filter handleSend={handleSendFilters} obj={cellRentFields} default={cellDefaultFilter}></Filter>
            <CellsTable
                isForRent={true}
                isForAdmin={false}
                cells={cells}
            ></CellsTable>
            <Pagination>
                <Pagination.First onClick={() => { if (curPage > 0) setCurPage(curPage - 1) }} />
                {paginationList}
                <Pagination.Last onClick={() => { if (curPage < countPages - 1) setCurPage(curPage + 1) }} />
            </Pagination>
        </div>
    );
}
