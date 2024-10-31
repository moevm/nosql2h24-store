import { useState } from "react";
import CellsTable from "../components/CellsTable";

export default function RentCellPage(){
    const [cells, setCells] = useState([
        { cellId: 5, isFree: true, endOfRent: "2025-02-02", warehouse: "Комендантский проспект" },
        { cellId: 9, isFree: true, endOfRent: "2025-01-02", warehouse: "Большевиков" },
        { cellId: 4, isFree: true, endOfRent: "2026-02-01", warehouse: "Электросила" }]);
    return (<>
        <CellsTable isForRent={true} cells={cells} ></CellsTable>
    </>)
}