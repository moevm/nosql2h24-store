import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Payment from "./Payment";
import { useState } from "react";
import { Cell } from "../types/types";

export default function CellsTable(props: { isForRent: boolean, cells: Cell[] }) {
    
    const [showPayment, setShowPayment] = useState(false);
    const [cellForRent, setCellForRent] = useState(props.cells[0]);
    // let cellForRent: Cell|null = null;
    function handleRent(cell: Cell){
        setCellForRent(cell);
        console.log(cellForRent);
        setShowPayment(!showPayment);
        console.log("again", cellForRent);
    }
    function CloseRent(){
        setShowPayment(!showPayment);
    }
    
    const listCells = props.cells.map((cell: Cell, index) =>
        <TableRow key={cell.cellId}>
            <TableCell>
                {cell.cellId}
            </TableCell>
            <TableCell>
                {cell.isFree ? "Свободна" : "Занята"}
            </TableCell>
            <TableCell>
                {cell.endOfRent}
            </TableCell>
            <TableCell>
                {cell.warehouse}
            </TableCell>
            {props.isForRent && <TableCell> <Button variant="contained" onClick={()=>handleRent(cell)}> Арендовать </Button></TableCell>}
        </TableRow>
    )
    return (<>
        {console.log("before dilog render", cellForRent)}
        {showPayment && <Payment cell={cellForRent} handleClick={CloseRent} isOpen={showPayment}/>}
        <Table>
            <TableHead>
                <TableCell>
                    Номер
                </TableCell>
                <TableCell>
                    Статус
                </TableCell>
                <TableCell>
                    Дата окончания аренды
                </TableCell>
                <TableCell>
                    Склад
                </TableCell>
            </TableHead>
            <TableBody>
                {listCells}
            </TableBody>
        </Table>
    </>)
}