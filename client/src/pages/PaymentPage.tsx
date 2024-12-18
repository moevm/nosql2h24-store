import { useState } from "react";
import { Cell } from "../serviceFiles/types";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { POST_RENT_CELL_URL } from "../serviceFiles/constants";
import "../css/PaymentPage.css";

export default function PaymentPage() {
  const { state } = useLocation();
  let navigate = useNavigate();
  function handleClick() {
    navigate("/rentCell");
  }
  function handlePayment() {
    let key = sessionStorage.getItem("key");
    console.log("обслуживание ячейки с данными:", {
      userKey: key,
      cell: state,
    });
    axios
      .post(POST_RENT_CELL_URL, { userKey: key, cell: state })
      .catch((error) => {
        console.error("Ошибка при бронировании Ячейки", error);
      });
  }
  return (
    <>
      {console.log("in payment", state)}
      <div className="paymentPageContainer">
        <div className="paymentPageInfo">
          <h1 className="paymentPageTitle">Оплатить ячейку</h1>

          <div className="paymentPageInfoBody">
            <p className="paymentPageCellName">
              <img
                width="50"
                height="50"
                src="./icons/store-icon.png"
                alt="Ячейка"
              />
              Ячейка номер &nbsp; {state.cellId}
            </p>
            <p className="paymentPageCellSize">Размер &nbsp; {state.size}</p>
            <p className="paymentPageCellDate">
              Срок аренды до &nbsp;{}
              <label className="visually-hidden" htmlFor="rentDate">
                Срок аренды
              </label>
              <input
                className="paymentPageCellDateInput"
                type="date"
                id="rentDate"
                placeholder="2024-12-10"
              />
            </p>
          </div>

          <button className="paymentPageButton button" onClick={handleClick}>
            Отмена
          </button>
        </div>

        <div className="paymentPageOptions">
          <button className="paymentOptionsItem" onClick={handlePayment}>
            Оплата по карте
          </button>
          <button className="paymentOptionsItem" onClick={handlePayment}>
            Оплата по СБП
          </button>
        </div>
      </div>
    </>
  );
}
