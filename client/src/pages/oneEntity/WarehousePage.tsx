import { Warehouse } from "../../serviceFiles/types"
import { useLocation } from "react-router-dom"

export default function WarehousePage() {
    const {state} = useLocation();
    console.log(state)
    return (<div>
        <h2>Склад id: {state.id}</h2>
        <div>
            <p>Адрес: {state.adress}</p>
            <p>Вместимость: {state.capacity}</p>
            <p>Ответственный: {state.chiefId}</p>
        </div>
    </div>)
}