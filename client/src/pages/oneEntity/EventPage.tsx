import { Event } from "../../serviceFiles/types"
import { useLocation } from "react-router-dom"

export default function EventPage() {
    const {state} = useLocation();
    console.log(state)
    return (<div>
        <h2>Событие id {state.eventId}</h2>
        <div>
            <p>Ячейка {state.cellId}</p>
            <p>Пользователь {state.userId}</p>
            <p>Действие {state.action}</p>
            <p>Время {state.dateAndTime}</p>
            <p>Описание {state.description}</p>
        </div>
    </div>)
}