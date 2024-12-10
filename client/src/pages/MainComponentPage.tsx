import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { ReactComponent as CellIcon } from "../css/cell-icon.svg";
import PersonalAccount from "./PersonalAccountPage";
import MyCellsPage from "./manyEntity/MyCellsPage";
import RentCellPage from "./manyEntity/RentCellPage";
import HelpPage from "./HelpPage";
import AllCellsPage from "./manyEntity/AllCellsPage";
import AllUsersPage from "./manyEntity/AllUsersPage";
import UserPage from "./oneEntity/UserPage";
import AllEventsPage from "./manyEntity/AllEventsPage";
import EventPage from "./oneEntity/EventPage";
import PaymentPage from "./PaymentPage";
import AllWarehousesPage from "./manyEntity/AllWarehousesPage";
import WarehousePage from "./oneEntity/WarehousePage";
import CellPage from "./oneEntity/CellPage";
import Header from "./Header";

export default function MainComponentPage() {
  const [{ name, role }, setUser] = useState({ name: "", role: "" });
  let navigate = useNavigate();

  useEffect(() => {
    let name = sessionStorage.getItem("name");
    if (name) {
      const role_string: string = sessionStorage.getItem("role") ?? "unknown";
      setUser({ name, role: role_string });
    } else {
      // const error = 'Request failed with status code 401. You are not sign in!'
      // alert(error)
      console.log("Не авторизован");
      // setUser({ name: "гость", position: "" });
      navigate("/auth");
    }
  }, []);
  return (
    <>
      <Header name={name} role={role} />
      <body>
        <div className="content">
          <Routes>
            <Route path="/" element={<PersonalAccount />}></Route>
            <Route path="/myCells" element={<MyCellsPage />}></Route>
            <Route path="/rentCell" element={<RentCellPage />}></Route>
            <Route path="/help" element={<HelpPage />}></Route>
            <Route path="/allCells" element={<AllCellsPage />}></Route>
            <Route path="/cell" element={<CellPage />}></Route>
            <Route path="/allUsers" element={<AllUsersPage />}></Route>
            <Route path="/user" element={<UserPage />}></Route>
            <Route path="/allEvents" element={<AllEventsPage />}></Route>
            <Route path="/event" element={<EventPage />}></Route>
            <Route path="/paymentCell" element={<PaymentPage />}></Route>
            <Route
              path="/allWarehouses"
              element={<AllWarehousesPage />}
            ></Route>
            <Route path="/warehouse" element={<WarehousePage />}></Route>
          </Routes>
          <address>
            Улица Торжковская 1Б, Санкт-Петербург, Россия
            <br />© 2024 Ячейка.ру
          </address>
        </div>
      </body>
    </>
  );
}
