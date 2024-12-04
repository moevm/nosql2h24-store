import { useEffect, useState } from "react";
import CellsTable from "../../components/CellsTable";
import { cellsInit, GET_FREE_CELLS_URL } from "../../serviceFiles/constants";
import axios from "axios";
import { Cell, cellFields } from "../../serviceFiles/types";
import Filter from "../../components/Filter";

export default function RentCellPage(){
    const [cells, setCells] = useState(cellsInit);
    const [filters, setFilters] = useState({});
    useEffect(() => {
        axios.get(GET_FREE_CELLS_URL, {params: filters}).then(response => { console.log(response); setCells(response.data); }).catch(error => {
            console.error('Ошибка при получении свободных ячеек. Взяты дефолтные ячейки', error);
            setCells(cellsInit);
        });
    }, [])
    function handleSendFilters(obj: Cell){
        console.log("Получен объект в RentCellPage (filters)", obj);
        setFilters(obj)
    }
    
    return (<>
    <Filter handleSend={handleSendFilters} obj={cellFields}></Filter>
        <CellsTable isForRent={true} isForAdmin={false} cells={cells} ></CellsTable>
    </>)
}