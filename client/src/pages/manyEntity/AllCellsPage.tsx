import { useEffect, useState } from "react";
import CellsTable from "../../components/CellsTable";
import { cellsInit, GET_ALL_CELLS_URL } from "../../serviceFiles/constants";
import { Cell, cellFields } from "../../serviceFiles/types";
import Filter from "../../components/Filter";
import Addition from "../../components/Addition";
import axios from "axios";

export default function AllCellsPage() {
    const [cells, setCells] = useState(cellsInit);
    const [filters, setFilters] = useState({});
    function handleSendFilters(obj: Cell){
        setFilters(obj)
    }
    function handleSendNewData(newObj: Cell){
        console.log("Получен объект в AllCellsPage", newObj);
        axios.post(GET_ALL_CELLS_URL, newObj).then(response => { setCells(response.data) }).catch(error => {
            console.error('Ошибка при получении ячеек. Взяты дефолтные ячейки', error);
            setCells(cellsInit);
        });
    }
    useEffect(() => {
        axios.post(GET_ALL_CELLS_URL, filters).then(response => { setCells(response.data) }).catch(error => {
            console.error('Ошибка при получении ячеек. Взяты дефолтные ячейки', error);
            setCells(cellsInit);
        });
    })
    return (<>
        {/* <Filter handleSend={handleSendFilters} obj={cellFields}></Filter> */}
        <Addition handleSend={handleSendNewData} obj={cellFields}></Addition>
        <CellsTable isForRent={false} isForAdmin={true} cells={cells} ></CellsTable>
    </>
    )
}