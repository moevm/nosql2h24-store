import { Warehouse } from "../../serviceFiles/types";
import { useLocation } from "react-router-dom";
import "../../css/oneEntity/WarehousePage.css";

export default function WarehousePage() {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className="warehousePageContainer">
      <div className="warehousePageBody">
        <h2>Склад id:&nbsp; {state._key}</h2>
        <div>
          <p>Адрес:&nbsp; {state.address}</p>
          <p>Вместимость:&nbsp; {state.capacity}</p>
          <p>Ответственный:&nbsp; {state.chiefId}</p>
        </div>
      </div>
    </div>
  );
}
