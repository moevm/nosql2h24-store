import { Event } from "../../serviceFiles/types";
import { useLocation } from "react-router-dom";
import "../../css/oneEntity/EventPage.css";

export default function EventPage() {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className="eventPageContainer">
      <div className="eventPageBody">
        <h2>Событие id &nbsp; {state._key}</h2>
        <div>
          <p>Ячейка &nbsp; {state.cellKey}</p>
          <p>Пользователь &nbsp; {state.userKey}</p>
          <p>Действие &nbsp; {state.action}</p>
          <p>Время &nbsp; {state.dateAndTime}</p>
          <p>Описание &nbsp; {state.description}</p>
        </div>
      </div>
    </div>
  );
}
