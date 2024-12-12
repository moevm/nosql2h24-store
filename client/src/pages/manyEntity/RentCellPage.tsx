import { useEffect, useState } from "react";
import CellsTable from "../../components/CellsTable";
import { cellDefaultFilter, cellsInit, GET_FREE_CELLS_URL } from "../../serviceFiles/constants";
import axios from "axios";
import { Cell, cellFields } from "../../serviceFiles/types";
import Filter from "../../components/Filter";
import "../../css/manyEntity/RentCellPage.css";

export default function RentCellPage() {
    const [cells, setCells] = useState(cellsInit);
    const [filters, setFilters] = useState(cellDefaultFilter);
    useEffect(() => {
        console.log("отправлен запрос на получение ячеек, с параметрами:", filters);
        axios
            .get(GET_FREE_CELLS_URL, { params: filters })
            .then((response) => {
                console.log(response);
                setCells(response.data);
            })
            .catch((error) => {
                console.error(
                    "Ошибка при получении свободных ячеек. Взяты дефолтные ячейки",
                    error
                );
                setCells(cellsInit);
            });
    }, [filters]);
    function handleSendFilters(obj: any) {
        console.log("Получен объект в RentCellPage (filters)", obj);
        obj.startcellNum = obj.startcellNum ? parseInt(obj.startcellNum) : cellDefaultFilter.startcellNum;
        obj.endcellNum = obj.endcellNum ? parseInt(obj.endcellNum) : cellDefaultFilter.endcellNum; // => < 20
        obj.starttierNum = obj.starttierNum ? parseInt(obj.starttierNum) : cellDefaultFilter.starttierNum;
        obj.endtierNum = obj.endtierNum ? parseInt(obj.endtierNum) : cellDefaultFilter.endtierNum;  // => < 6
        obj.isFree = obj.isFree ? true : cellDefaultFilter.isFree;
        obj.needService = obj.needService ? true : cellDefaultFilter.needService;
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
        <div className="rencCellPageContainer">
            <Filter handleSend={handleSendFilters} obj={cellFields}></Filter>
            <CellsTable
                isForRent={true}
                isForAdmin={false}
                cells={cells}
            ></CellsTable>
        </div>
    );
}
