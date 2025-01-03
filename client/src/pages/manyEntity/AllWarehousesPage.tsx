import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Warehouse, warehouseFields } from "../../serviceFiles/types";
import { Button, Pagination, Table } from "react-bootstrap";
import {
    GET_ALL_WAREHOUSES_URL,
    GET_UNIQUE_DIRECTORS_KEYS_URL,
    POST_NEW_WAREHOUSE_URL,
    warehouseDefaultFilter,
    warehousesInit,
} from "../../serviceFiles/constants";
import Addition from "../../components/Addition";
import axios from "axios";
import Filter from "../../components/Filter";
import "../../css/manyEntity/AllWarehousesPage.css";

export default function AllWarehousesPage() {
    let navigate = useNavigate();

    const [warehouses, setWarehouses] = useState(warehousesInit);
    const [filters, setFilters] = useState(warehouseDefaultFilter);
    const [directorsKeys, setListDirectorsKeys] = useState(['id1', 'id2']);
    const [countPages, setCountPages] = useState(3);
    const [curPage, setCurPage] = useState(0);

    useEffect(() => {
        console.log("отправлен запрос на получение складов, с параметрами:", filters);
        axios
            .post(GET_ALL_WAREHOUSES_URL, { ...filters, page: curPage })
            .then((response) => {
                console.log(response);
                setWarehouses(response.data.warehouses);
                setCountPages(response.data.count);
            })
            .catch((error) => {
                console.error(
                    "Ошибка при получении складов. Взяты дефолтные склады",
                    error
                );
                setWarehouses(warehousesInit);
            });
    }, [filters, curPage]);

    useEffect(() => {
        console.log("отправлен запрос на получение ключей директоров");
        axios
            .get(GET_UNIQUE_DIRECTORS_KEYS_URL)
            .then((response) => {
                console.log(response);
                setListDirectorsKeys(response.data);
            })
            .catch((error) => {
                console.error(
                    "Ошибка при получении ключей складов. Взяты дефолтные значения",
                    error
                );
                setListDirectorsKeys(['id1', 'id2']);
            });
    }, [])

    function handleSendFilters(obj: any) {
        console.log("Получен объект в AllWarehousesPage (filters)", obj);
        obj.startcapacity = parseFloat(obj.startcapacity);
        obj.endcapacity = parseFloat(obj.endcapacity);
        setFilters(obj);
    }

    function handleSendNewData(newObj: Warehouse) {
        newObj.capacity = Number(newObj.capacity);
        console.log("Получен объект в AllUsersPage", newObj);
        axios
            .post(POST_NEW_WAREHOUSE_URL, newObj)
            .then(() => {
                axios
                    .post(GET_ALL_WAREHOUSES_URL, { ...filters, page: curPage })
                    .then((response) => {
                        console.log("get all warehouses, response: ", response);
                        setWarehouses(response.data.warehouses);
                        setCountPages(response.data.count);
                    })
                    .catch((error) => {
                        console.error(
                            "Ошибка при получении складов. Взяты дефолтные склады",
                            error
                        );
                        setWarehouses(warehousesInit);
                    });
            })
            .catch((error) => {
                axios
                    .post(GET_ALL_WAREHOUSES_URL, { ...filters, page: curPage })
                    .then((response) => {
                        console.log("get all warehouses, response: ", response);
                        setWarehouses(response.data.warehouses);
                        setCountPages(response.data.count);
                    })
                    .catch((error) => {
                        console.error(
                            "Ошибка при получении складов. Взяты дефолтные склады",
                            error
                        );
                        setWarehouses(warehousesInit);
                    });
                console.error("Ошибка при создании склада.", error);
            });
    }
    function handleWerehouseClick(warehouse: Warehouse) {
        navigate("/warehouse", { state: warehouse });
    }
    const listWerehouses = warehouses.map((warehouse: Warehouse, index) => (
        <tr key={warehouse._key}>
            <td>{warehouse._key}</td>
            <td>{warehouse.address}</td>
            <td>{warehouse.capacity}</td>
            <td>{warehouse.chiefKey}</td>
            <td>
                <button
                    type="button"
                    className="button"
                    onClick={() => handleWerehouseClick(warehouse)}
                >
                    Подробнее
                </button>
            </td>
        </tr>
    ));
    function handlePageChange(i: number) {
        setCurPage(i)
    }
    const paginationList = []
    for (let i = 0; i < countPages; i++) {
        paginationList.push(<Pagination.Item key={i} active={i === curPage} onClick={() => handlePageChange(i)}>{i + 1}</Pagination.Item>)
    }
    return (
        <div className="allWarehousesPageContainer">
            <Filter handleSend={handleSendFilters} obj={warehouseFields} default={warehouseDefaultFilter}></Filter>
            <Addition handleSend={handleSendNewData} obj={warehouseFields} listKeys={directorsKeys} default={warehouseDefaultFilter}></Addition>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>_key</th>
                        <th>Адресс</th>
                        <th>Вместимость</th>
                        <th>Ответственный</th>
                    </tr>
                </thead>
                <tbody>{listWerehouses}</tbody>
            </Table>
            <Pagination>
                <Pagination.First onClick={() => { if (curPage > 0) setCurPage(curPage - 1) }} />
                {paginationList}
                <Pagination.Last onClick={() => { if (curPage < countPages - 1) setCurPage(curPage + 1) }} />
            </Pagination>
        </div>
    );
}
