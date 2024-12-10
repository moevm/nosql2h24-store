import { User } from "../../serviceFiles/types";
import { useLocation } from "react-router-dom";
import "../../css/oneEntity/UserPage.css";

export default function UserPage() {
  const { state } = useLocation();
  return (
    <div className="userPageContainer">
      <div className="userPageBody">
        <h2>{/*state.nameSurnamePatronymic*/}</h2>
        <div>
          <p>Пользователь Ячейка.ру: &nbsp; {/*state.regDate*/}</p>
          <p>Роль: &nbsp; {/*state.role*/}</p>
          {/* <p>Арендованные ячейки: &nbsp; {state.rentedCells.join(',')}</p> */}
          <p>
            Задолженность: &nbsp;
            {/*state.indebtedness > 0.00 ? state.indebtedness : "нет"*/}
          </p>
        </div>
      </div>
    </div>
  );
}
