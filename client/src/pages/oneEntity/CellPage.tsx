import { useLocation } from "react-router-dom";
import "../../css/oneEntity/CellPage.css";

export default function CellPage() {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className="cellPageContainer">
      <div className="cellPageBody">
        <h2>Ячейка _key: &nbsp; {state._key}</h2>
        <div>
          <p>Размер: &nbsp; {state.size} м.кв</p>
          <p>Тариф: &nbsp; {state.tariffPerDay} р/сут</p>
          <p>Номер: &nbsp; {state.cellNum}</p>
          <p>Ряд: &nbsp; {state.tierNum}</p>
          <p>Склад _key: &nbsp; {state.warehouseKey}</p>
          <p>Адрес склада: &nbsp; {state.warehouseAddress}</p>
          <p>Свободна: &nbsp; {state.isFree ? "да" : "нет"}</p>
          <p>Конец аренды: &nbsp; {state.endOfRent}</p>
          <p>Нуждается в обслуживании: &nbsp; {state.needService ? "да" : "нет"}</p>
        </div>
      </div>
    </div>
  );
}
