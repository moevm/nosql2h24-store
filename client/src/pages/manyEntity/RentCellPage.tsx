import { useEffect, useState } from "react";
import CellsTable from "../../components/CellsTable";
import { cellsInit, GET_FREE_CELLS_URL } from "../../serviceFiles/constants";
import axios from "axios";

export default function RentCellPage(){
    const [cells, setCells] = useState(cellsInit);
    const [filters, setFilters] = useState({});
    useEffect(() => {
        axios.get(GET_FREE_CELLS_URL, {params: filters}).then(response => { setCells(response.data) }).catch(error => {
            console.error('Ошибка при получении свободных ячеек. Взяты дефолтные ячейки', error);
            setCells(cellsInit);
        });
    })
    return (<>
        <CellsTable isForRent={true} isForAdmin={false} cells={cells} ></CellsTable>
    </>)
}