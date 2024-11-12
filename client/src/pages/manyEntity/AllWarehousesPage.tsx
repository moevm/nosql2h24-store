import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Warehouse, warehouseFields } from "../../serviceFiles/types";
import { Button, Table } from "react-bootstrap";
import {GET_ALL_WAREHOUSES_URL, POST_NEW_WAREHOUSE_URL, warehousesInit } from "../../serviceFiles/constants";
import Addition from "../../components/Addition";
import axios from "axios";

export default function AllWarehousesPage() {
    let navigate = useNavigate();

    const [warehouses, setWarehouses] = useState(warehousesInit);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        axios.get(GET_ALL_WAREHOUSES_URL, {params: filters}).then(response => { setWarehouses(response.data) }).catch(error => {
            console.error('Ошибка при получении складов. Взяты дефолтные склады', error);
            setWarehouses(warehousesInit);
        });
    })
    function handleSendNewData(newObj: Warehouse) {
        console.log("Получен объект в AllUsersPage", newObj);
        axios.post(POST_NEW_WAREHOUSE_URL, newObj).then(response => { setWarehouses(response.data) }).catch(error => {
            console.error('Ошибка при получении складов. Взяты дефолтные склады', error);
            setWarehouses(warehousesInit);
        });
    }
    function handleWerehouseClick(warehouse: Warehouse){
        navigate("/warehouse", {state: warehouse})
    }
    const listWerehouses = warehouses.map((warehouse: Warehouse, index) =>
        <tr key={warehouse._key} >
            <td>
                {warehouse._key}
            </td>
            <td>
                {warehouse.address}
            </td>
            <td>
                {warehouse.capacity}
            </td>
            <td>
                {warehouse.chiefId}
            </td>
            <td> <Button type="button" className="btn" onClick={() => handleWerehouseClick(warehouse)}> Подробнее </Button></td>
        </tr>
    )
    return (<>
    <Addition handleSend={handleSendNewData} obj={warehouseFields}></Addition>
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