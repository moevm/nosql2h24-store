import { User } from "../../serviceFiles/types"
import { useLocation } from "react-router-dom"

export default function UserPage() {
    const {state} = useLocation();
    return (<div>
        <h2>{state.NameSurnamePatronymic}</h2>
        <div>
            <p>Пользователь Ячейка.ру с {state.date}</p>
            <p>Роль: {state.role}</p>
            <p>Арендованные ячейки: {state.rentedCells.join(',')}</p>
            <p>Задолженность: {state.indebtedness > 0.00 ? state.indebtedness : "нет"}</p>
        </div>
    </div>)
}