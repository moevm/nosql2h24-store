import { useNavigate } from "react-router-dom"
import Payment from "../pages/PaymentPage";
import { useState } from "react";
import { Cell } from "../serviceFiles/types";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import axios from "axios";
import { POST_SERVICE_CELL_URL } from "../serviceFiles/constants";

export default function CellsTable(props: { isForRent: boolean, isForAdmin: boolean, cells: Cell[] }) {
    let navigate = useNavigate();
    const [showPayment, setShowPayment] = useState(false);
    const [cellForRent, setCellForRent] = useState(props.cells[0]);
    // let cellForRent: Cell|null = null;
    function handleRent(cell: Cell) {
        navigate("/paymentCell", { state: cell })
        // setCellForRent(cell);
        // console.log(cellForRent);
        // setShowPayment(!showPayment);
        // console.log("again", cellForRent);
    }
    function handleService(cell: Cell) {
        let key = sessionStorage.getItem("key");
        console.log("обслуживание ячейки с данными:", { userKey: key, cell });
        axios.post(POST_SERVICE_CELL_URL, { userKey: key, cell }).catch (error => {
        console.error('Ошибка при обслуживании Ячейки', error);
    });
}
function CloseRent() {
    setShowPayment(!showPayment);
}

function handleCellClick(cell: Cell) {
    navigate("/cell", { state: cell })
}

const listCells = props.cells.map((cell: Cell, index) =>
    <tr key={cell._key}>
        <td>
            {cell._key}
        </td>
        <td>
            {cell.isFree ? "Свободна" : "Занята"}
        </td>
        <td>
            {cell.endOfRent}
        </td>
        <td>
            {cell.warehouseId}
        </td>
        {props.isForRent && <td> <Button type="button" className="btn" onClick={() => handleRent(cell)}> Арендовать </Button></td>}
        {props.isForAdmin && <td> {cell.needService ? "Требует" : "Не требует"}</td>}
        {props.isForAdmin && <td> <Button type="button" className="btn" onClick={() => handleService(cell)}> Обслужить </Button> </td>}
        <td> <Button type="button" className="btn" onClick={() => handleCellClick(cell)}> Подробнее </Button></td>
    </tr>
)
return (<>
    {/* {showPayment && <Payment cell={cellForRent} handleClick={CloseRent} isOpen={showPayment} />} */}
    <Table striped bordered hover>
        <thead>
            <tr>
                <th scope="col">
                    Номер
                </th>
                <th scope="col">
                    Статус
                </th>
                <th scope="col">
                    Дата окончания аренды
                </th>
                <th scope="col">
                    Склад
                </th>
                {props.isForAdmin && <th scope="col"> Тех.обслуживание </th>}
            </tr>
        </thead>
        <tbody>
            {listCells}
        </tbody>
    </Table>
</>)
}