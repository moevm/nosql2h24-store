import { Warehouse } from "../../serviceFiles/types";
import { useLocation } from "react-router-dom";
import "../../css/oneEntity/WarehousePage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_FREE_CELLS_FOR_WAREHOUSE } from "../../serviceFiles/constants";

export default function WarehousePage() {
  const { state } = useLocation();
  const [countFree, setCountFree] = useState(0);

useEffect(()=>{
    console.log(state)
    axios.get(GET_FREE_CELLS_FOR_WAREHOUSE, {params: {warehouseKey: state._key}}).then((response)=>{
        setCountFree(response.data);
    })
}, [])

  console.log(state);
  return (
    <div className="warehousePageContainer">
      <div className="warehousePageBody">
        <h2>Склад id:&nbsp; {state._key}</h2>
        <div>
          <p>Адрес:&nbsp; {state.address}</p>
          <p>Вместимость:&nbsp; {state.capacity}</p>
          <p>Ответственный:&nbsp; {state.chiefKey}</p>
          <p> Свободных ячеек: {countFree}</p>
        </div>
      </div>
    </div>
  );
}
