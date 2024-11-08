import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Warehouse } from "../../serviceFiles/types";
import { Table } from "react-bootstrap";
import {warehousesInit } from "../../serviceFiles/constants";

export default function AllWarehousesPage() {
    let navigate = useNavigate();

    const [warehouses, setWarehouses] = useState(warehousesInit);
    function handleWerehouseClick(warehouse: Warehouse){
        navigate("/warehouse", {state: warehouse})
    }
    const listWerehouses = warehouses.map((warehouse: Warehouse, index) =>
        <tr key={warehouse.id} onClick={()=>handleWerehouseClick(warehouse)}>
            <td>
                {warehouse.id}
            </td>
            <td>
                {warehouse.adress}
            </td>
            <td>
                {warehouse.capacity}
            </td>
            <td>
                {warehouse.chiefId}
            </td>
        </tr>
    )
    return (<>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>
                    id
                </th>
                <th>
                    Адресс
                </th>
                <th>
                    Вместимость
                </th>
                <th>
                    Ответственный
                </th>
                </tr>
            </thead>
            <tbody>
                {listWerehouses}
            </tbody>
        </Table>
    </>)
}