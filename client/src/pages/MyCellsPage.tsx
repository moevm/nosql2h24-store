import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useState } from "react";
import CellsTable from "../components/CellsTable";

export default function MyCellsPage() {
    const [cells, setCells] = useState([
        { cellId: 1, isFree: false, endOfRent: "2025-02-02", warehouse: "Мурино" },
        { cellId: 2, isFree: true, endOfRent: "2025-01-02", warehouse: "Петроградская" },
        { cellId: 3, isFree: false, endOfRent: "2026-02-01", warehouse: "Купчино" }]);
    return (<>
        <CellsTable isForRent={false} cells={cells} ></CellsTable>
    </>)
}