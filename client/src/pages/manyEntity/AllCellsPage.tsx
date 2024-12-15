import { useEffect, useState } from "react";
import CellsTable from "../../components/CellsTable";
import {
    cellDefaultFilter,
    cellsInit,
    GET_ALL_CELLS_URL,
    GET_UNIQUE_WAREHOUSES_KEYS_URL,
    POST_NEW_CELL_URL,
} from "../../serviceFiles/constants";
import { Cell, cellFields, cellFilters } from "../../serviceFiles/types";
import Filter from "../../components/Filter";
import Addition from "../../components/Addition";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/manyEntity/AllCellsPage.css";

export default function AllCellsPage() {
    const [cells, setCells] = useState(cellsInit);
    const [filters, setFilters] = useState(cellDefaultFilter);
    const [listWareousesKeys, setListWareousesKeys] = useState(['id1', 'id2']);
    let navigate = useNavigate();
    function handleSendFilters(obj: any) {
        console.log("Получен объект в AllCellsPage (filters)", obj);
        obj.startcellNum = parseInt(obj.startcellNum);
        obj.endcellNum = parseInt(obj.endcellNum); // => < 20
        obj.starttierNum = parseInt(obj.starttierNum);
        obj.endtierNum = parseInt(obj.endtierNum);  // => < 6
        obj.isFree = obj.isFree ? true : false; //cellDefaultFilter.isFree;
        obj.needService = obj.needService ? true : false; //cellDefaultFilter.needService;
        obj.startsize = parseFloat(obj.startsize);
        obj.endsize = parseFloat(obj.endsize);   // => < 2.1
        obj.starttariffPerDay = parseInt(obj.starttariffPerDay);
        obj.endtariffPerDay = parseInt(obj.endtariffPerDay);
        console.log("Преобразовано (filters)", obj);
        setFilters(obj);
    }
    function handleSendNewData(newObj: Cell) {
        console.log("Получен объект в AllCellsPage", newObj);
        newObj.cellNum = Number(newObj.cellNum);
        newObj.tierNum = Number(newObj.tierNum);
        newObj.size = Number(newObj.size);
        newObj.tariffPerDay = Number(newObj.tariffPerDay);
        newObj.warehouseAddress = '';
        console.log("После преобразования типов объект в AllCellsPage", newObj);
        axios
            .post(POST_NEW_CELL_URL, newObj)
            .then(() => {
                axios
                    .post(GET_ALL_CELLS_URL, filters)
                    .then((response) => {
                        setCells(response.data);
                    })
                    .catch((error) => {
                        console.error(
                            "Ошибка при получении ячеек. Взяты дефолтные ячейки",
                            error
                        );
                        setCells(cellsInit);
                    });
            })
            .catch((error) => {
                axios
                    .post(GET_ALL_CELLS_URL, filters)
                    .then((response) => {
                        setCells(response.data);
                    })
                    .catch((error) => {
                        console.error(
                            "Ошибка при получении ячеек. Взяты дефолтные ячейки",
                            error
                        );
                        setCells(cellsInit);
                    });
                console.error("Ошибка при создании Ячейки", error);
            });
    }
    useEffect(() => {
        console.log("отправлен запрос на получение ячеек, с параметрами:", filters);
        axios
            .post(GET_ALL_CELLS_URL, filters)
            .then((response) => {
                console.log(response);
                setCells(response.data);
            })
            .catch((error) => {
                console.error(
                    "Ошибка при получении ячеек. Взяты дефолтные ячейки",
                    error
                );
                setCells(cellsInit);
            });
    }, [filters]);

    useEffect(() => {
        console.log("отправлен запрос на получение ключей складов");
        axios
            .get(GET_UNIQUE_WAREHOUSES_KEYS_URL)
            .then((response) => {
                console.log(response);
                setListWareousesKeys(response.data);
            })
            .catch((error) => {
                console.error(
                    "Ошибка при получении ключей складов. Взяты дефолтные значения",
                    error
                );
                setListWareousesKeys(['id1', 'id2']);
            });
    }, [])
    return (
        <div className="allCellsPageContainer">
            <Filter handleSend={handleSendFilters} obj={cellFields} default={cellDefaultFilter}></Filter>
            <Addition handleSend={handleSendNewData} obj={cellFields} listKeys={listWareousesKeys} default={cellDefaultFilter}></Addition>
            <CellsTable
                isForRent={false}
                isForAdmin={true}
                cells={cells}
            ></CellsTable>
        </div>
    );
}
