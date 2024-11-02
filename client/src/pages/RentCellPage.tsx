import { useState } from "react";
import CellsTable from "../components/CellsTable";
import { cellsInit } from "../serviceFiles/constants";

export default function RentCellPage(){
    const [cells, setCells] = useState(cellsInit);
    return (<>
        <CellsTable isForRent={true} isForAdmin={false} cells={cells} ></CellsTable>
    </>)
}