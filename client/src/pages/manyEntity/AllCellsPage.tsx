import { useState } from "react";
import CellsTable from "../../components/CellsTable";
import { cellsInit } from "../../serviceFiles/constants";

export default function AllCellsPage() {
    const [cells, setCells] = useState(cellsInit);
    return (<>
        <CellsTable isForRent={false} isForAdmin={true} cells={cells} ></CellsTable>
    </>
    )
}