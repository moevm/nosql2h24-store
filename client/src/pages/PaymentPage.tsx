import { useState } from "react";
import { Cell } from "../serviceFiles/types";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { POST_RENT_CELL_URL } from "../serviceFiles/constants";

export default function PaymentPage() {
    const { state } = useLocation();
    let navigate = useNavigate();
    function handleClick() {
        navigate("/rentCell")
    }
    function handlePayment() {
        let key = sessionStorage.getItem("key");
        console.log("обслуживание ячейки с данными:", { userKey: key, cell: state });
        axios.post(POST_RENT_CELL_URL, { userKey: key, cell: state }).catch(error => {
            console.error('Ошибка при бронировании Ячейки', error);
        });
    }
    return (<>
        {console.log("in payment", state)}
        <h2>Оплата аренды ячейки</h2>
        <div>
            <p>Ячейка номер {state.cellId}</p>
            <p>Размер {state.size}</p>
            <Button onClick={handlePayment}> Оплата по карте </Button>
            <Button onClick={handlePayment}> Оплата по СБП </Button>
            <Button onClick={handleClick}>Отмена</Button>

        </div>
    </>)
}
