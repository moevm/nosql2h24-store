import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Warehouse, warehouseFields } from "../../serviceFiles/types";
import { Button, Table } from "react-bootstrap";
import {
  GET_ALL_WAREHOUSES_URL,
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

  useEffect(() => {
    console.log("отправлен запрос на получение складов, с параметрами:", filters);
    axios
      .get(GET_ALL_WAREHOUSES_URL, { params: filters })
      .then((response) => {
        console.log(response);
        setWarehouses(response.data);
      })
      .catch((error) => {
        console.error(
          "Ошибка при получении складов. Взяты дефолтные склады",
          error
        );
        setWarehouses(warehousesInit);
      });
  }, [filters]);

  function handleSendFilters(obj: any) {
    console.log("Получен объект в AllWarehousesPage (filters)", obj);
    obj.startcapacity = obj.startcapacity ? parseFloat(obj.startcapacity) : warehouseDefaultFilter.startcapacity;
    obj.endcapacity = obj.endcapacity ? parseFloat(obj.endcapacity) : warehouseDefaultFilter.endcapacity;
    setFilters(obj);
  }

  function handleSendNewData(newObj: Warehouse) {
    console.log("Получен объект в AllUsersPage", newObj);
    axios
      .post(POST_NEW_WAREHOUSE_URL, newObj)
      .then(() => {
        axios
          .get(GET_ALL_WAREHOUSES_URL, { params: filters })
          .then((response) => {
            console.log("get all warehouses, response: ", response);
            setWarehouses(response.data);
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
          .get(GET_ALL_WAREHOUSES_URL, { params: filters })
          .then((response) => {
            console.log("get all warehouses, response: ", response);
            setWarehouses(response.data);
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
  return (
    <div className="allWarehousesPageContainer">
      {/* <Filter handleSend={handleSendFilters} obj={warehouseFields}></Filter> */}
      <Addition handleSend={handleSendNewData} obj={warehouseFields} listKeys={[]}></Addition>
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
    </div>
  );
}
