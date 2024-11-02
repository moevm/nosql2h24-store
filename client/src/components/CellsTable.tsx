import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Payment from "./Payment";
import { useState } from "react";
import { Cell } from "../serviceFiles/types";

export default function CellsTable(props: { isForRent: boolean, isForAdmin: boolean, cells: Cell[] }) {

    const [showPayment, setShowPayment] = useState(false);
    const [cellForRent, setCellForRent] = useState(props.cells[0]);
    // let cellForRent: Cell|null = null;
    function handleRent(cell: Cell) {
        setCellForRent(cell);
        console.log(cellForRent);
        setShowPayment(!showPayment);
        console.log("again", cellForRent);
    }
    function CloseRent() {
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
            {props.isForRent && <TableCell> <Button variant="contained" onClick={() => handleRent(cell)}> Арендовать </Button></TableCell>}
            {props.isForAdmin && <TableCell> {cell.needService ? "Требует" : "Не требует"}</TableCell>}
            {props.isForAdmin && <TableCell> <Button variant="contained" > Обслужить </Button> </TableCell>}
        </TableRow>
    )
    return (<>
        {showPayment && <Payment cell={cellForRent} handleClick={CloseRent} isOpen={showPayment} />}
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
                {props.isForAdmin && <TableCell> Тех.обслуживание </TableCell>}
            </TableHead>
            <TableBody>
                {listCells}
            </TableBody>
        </Table>
    </>)
}