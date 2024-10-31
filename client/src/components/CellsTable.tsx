import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function CellsTable(props: { isForRent: boolean, cells: { cellId: number, isFree: boolean, endOfRent: string, warehouse: string }[] }) {
    
    const navigate = useNavigate();
    function handleRent(){
        navigate('/payment');
    }
    
    const listCells = props.cells.map((cell: { cellId: number, isFree: boolean, endOfRent: string, warehouse: string }, index) =>
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
            {props.isForRent && <TableCell> <Button variant="contained" onClick={handleRent}> Арендовать </Button></TableCell>}
        </TableRow>
    )
    return (<>
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