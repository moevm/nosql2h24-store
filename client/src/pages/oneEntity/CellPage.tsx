import { useLocation } from "react-router-dom";
import "../../css/oneEntity/CellPage.css";

export default function CellPage() {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className="cellPageContainer">
      <div className="cellPageBody">
        <h2>Ячейка id &nbsp; {/*state._key*/}</h2>
        <div>
          <p>Номер &nbsp; {/*state.cellNum*/}</p>
          <p>Склад &nbsp; {/*state.warehouseId*/}</p>
          <p>Ряд &nbsp; {/*state.tierNum*/}</p>
          <p>Свободна &nbsp; {/*state.isFree*/}</p>
          <p>Конец аренды &nbsp; {/*state.endOfRent*/}</p>
          <p>Тариф &nbsp; {/*state.tariffPerDay*/}</p>
          <p>Размер &nbsp; {/*state.size*/}</p>
        </div>
      </div>
    </div>
  );
}
