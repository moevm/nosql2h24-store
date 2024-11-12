import { useLocation } from "react-router-dom"

export default function CellPage() {
    const {state} = useLocation();
    console.log(state)
    return (<div>
        <h2>Ячейка id {state._key}</h2>
        <div>
            <p>Номер {state.cellNum}</p>
            <p>Склад {state.warehouseId}</p>
            <p>Ряд {state.tierNum}</p>
            <p>Свободна {state.isFree}</p>
            <p>Конец аренды {state.endOfRent}</p>
            <p>Тариф {state.tariffPerDay}</p>
            <p>Размер {state.size}</p>
        </div>
    </div>)
}