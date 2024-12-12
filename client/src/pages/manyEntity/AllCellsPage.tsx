import { useEffect, useState } from "react";
import CellsTable from "../../components/CellsTable";
import {
  cellsInit,
  GET_ALL_CELLS_URL,
  POST_NEW_CELL_URL,
} from "../../serviceFiles/constants";
import { Cell, cellFields } from "../../serviceFiles/types";
import Filter from "../../components/Filter";
import Addition from "../../components/Addition";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/manyEntity/AllCellsPage.css";

export default function AllCellsPage() {
  const [cells, setCells] = useState(cellsInit);
  const [filters, setFilters] = useState({_key: "",
    warehouseKey: "",
    startcellNum: 0,
    endcellNum: 21, // => < 20
    starttierNum: 0,
    endtierNum: 6,  // => < 6
    isFree: true,
    needService: false,
    startsize: 0,
    endsize: 2.1,   // => < 2.1
    starttariffPerDay: 0,
    endtariffPerDay: 5001,     // => < 5001});
  });
  let navigate = useNavigate();
  function handleSendFilters(obj: any) {
    console.log("Получен объект в AllCellsPage (filters)", obj);
    setFilters(obj);
  }
  function handleSendNewData(newObj: Cell) {
    console.log("Получен объект в AllCellsPage", newObj);
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
  }, []);
  return (
    <div className="allCellsPageContainer">
      <Filter handleSend={handleSendFilters} obj={cellFields}></Filter>
      <Addition handleSend={handleSendNewData} obj={cellFields}></Addition>
      <CellsTable
        isForRent={false}
        isForAdmin={true}
        cells={cells}
      ></CellsTable>
    </div>
  );
}
